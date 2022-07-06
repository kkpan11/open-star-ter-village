import { State } from 'boardgame.io';
import { INVALID_MOVE } from 'boardgame.io/core';
import { Deck } from '../deck';
import { Cards } from '../cards';
import { OpenStarTerVillageType as type } from '../types';
import { isInRange } from '../utils';
import { ActiveProject, ActiveProjects } from '../activeProjects';

type WithGameState<G extends any, F extends (...args: any) => void> = (G: State<G>['G'], ctx: State<G>['ctx'], ...args: Parameters<F>) => any;

export const createProject: WithGameState<type.State.Root, type.Move.CreateProject> = (G, ctx, projectCardIndex, jobCardIndex) => {
  if (!G.table.activeMoves.createProject) {
    return INVALID_MOVE;
  }

  const currentPlayer = ctx.playerID!;
  const currentPlayerToken = G.players[currentPlayer].token;
  // TODO: replace hardcoded number with dynamic rules
  const createProjectActionCosts = 2;
  if (currentPlayerToken.actions < createProjectActionCosts) {
    return INVALID_MOVE;
  }
  const createProjectWorkerCosts = 1;
  if (currentPlayerToken.workers < createProjectWorkerCosts) {
    return INVALID_MOVE;
  }

  // check project card in in hand
  const currentHandProjects = G.players[currentPlayer].hand.projects;
  if (!isInRange(projectCardIndex, currentHandProjects.length)) {
    return INVALID_MOVE;
  }

  // check job card is on the table
  const currentJobs = G.table.activeJobs;
  if (!isInRange(jobCardIndex, currentJobs.length)) {
    return INVALID_MOVE;
  }

  // check job card is required in project
  const projectCard = Cards.GetById(currentHandProjects, projectCardIndex);
  const jobCard = Cards.GetById(currentJobs, jobCardIndex);
  if (!Object.keys(projectCard.requirements).includes(jobCard.name)) {
    return INVALID_MOVE;
  }

  // reduce action tokens
  currentPlayerToken.actions -= createProjectActionCosts;
  Cards.RemoveOne(currentHandProjects, projectCard);
  Cards.RemoveOne(currentJobs, jobCard);

  // initial active project
  const activeProjectIndex = ActiveProjects.Add(G.table.activeProjects, projectCard, currentPlayer);
  const activeProject = ActiveProjects.GetById(G.table.activeProjects, activeProjectIndex);

  // reduce worker token
  currentPlayerToken.workers -= createProjectWorkerCosts;
  // assign worker token
  const jobInitPoints = 1;
  ActiveProject.AssignWorker(activeProject, jobCard.name, currentPlayer, jobInitPoints);
  // score victory points
  const createProjectVictoryPoints = 1;
  G.players[currentPlayer].victoryPoints += createProjectVictoryPoints;

  // discard job card
  Deck.Discard(G.decks.jobs, [jobCard]);

  G.table.activeMoves.createProject = false;
}
