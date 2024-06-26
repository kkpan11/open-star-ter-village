import React from 'react';
import { Button, Toolbar } from "@mui/material";
import { Dispatch, createSelector } from "@reduxjs/toolkit";
import { Page, hasNextPage, isPageCancellable, wizardActions } from '@/lib/reducers/wizard';
import { connect } from 'react-redux';
import { selectWizard } from '@/lib/selector';

enum ActionName {
  CREATE_PROJECT = 'CREATE_PROJECT',
  RECRUIT = 'RECRUIT',
  CONTRIBUTE_JOINED_PROJECTS = 'CONTRIBUTE_JOINED_PROJECTS',
  CONTRIBUTE_OWNED_PROJECTS = 'CONTRIBUTE_OWNED_PROJECTS',
  REMOVE_AND_REFILL_JOBS = 'REMOVE_AND_REFILL_JOBS',
  MIRROR = 'MIRROR',
}

const getPagesByActionName = (name: ActionName): Page[] => {
  switch (name) {
    case ActionName.CREATE_PROJECT:
    return [
      {
        isCancellable: true,
        requiredSteps: {
          'player--hand--project': {
            type: 'player--hand--project',
            limit: 1,
          }
        },
        toggledSteps: [],
      },
      {
        isCancellable: true,
        requiredSteps: {
          'table--active-job': {
            type: 'table--active-job',
            limit: 1,
          }
        },
        toggledSteps: [],
      },
    ];
    default:
      return [];
  }
}

interface StateProps {
  showCancelBtn: boolean;
  showConfirmBtn: boolean;
  showSubmitBtn: boolean;
}

interface DispatchProps {
  onCreateProjectActionClick: () => void;
  onConfirmBtnClick: () => void;
  onCancelBtnClick: () => void;
  onSubmitBtnClick: () => void;
}

type Props = StateProps & DispatchProps;

const ActionBoard: React.FC<Props> = ({ showCancelBtn, showConfirmBtn, showSubmitBtn, onCancelBtnClick, onConfirmBtnClick, onSubmitBtnClick }) => {
  return (
    <Toolbar>
      {showCancelBtn && <Button onClick={onCancelBtnClick}> Cancel </Button>}
      {showConfirmBtn && <Button onClick={onConfirmBtnClick}>Confirm</Button>}
      {showSubmitBtn && <Button onClick={onSubmitBtnClick}>Submit</Button>}
    </Toolbar>
  )
}

const mapStateToProps = createSelector(
  selectWizard, (wizard): StateProps => {
  const showCancelBtn = isPageCancellable(wizard);
  const showConfirmBtn = hasNextPage(wizard);
  const showSubmitBtn = !hasNextPage(wizard);
  return {
    showCancelBtn,
    showConfirmBtn,
    showSubmitBtn,
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => {
  const onCreateProjectActionClick = () => {
  dispatch(wizardActions.init(getPagesByActionName(ActionName.CREATE_PROJECT)));
}
const onConfirmBtnClick = () => {
  dispatch(wizardActions.nextPage());
}
const onCancelBtnClick = () => {
  dispatch(wizardActions.prevPage());
}
const onSubmitBtnClick = () => {
  dispatch(wizardActions.clear());
}
  return {
    onCreateProjectActionClick,
    onConfirmBtnClick,
    onCancelBtnClick,
    onSubmitBtnClick,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActionBoard);
