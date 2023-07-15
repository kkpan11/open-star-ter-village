# Roadmap

## CMS integration

### Stage 1

1. Integrate Netlify CMS (inprogress)
2. Writers are able to add/update/delete project cards and their details in Mandarin
3. Writers are able to add/update/delete project cards and their details in English

#### Editor flow

```mermaid
graph LR
    E[Editor] -->|Decaf CMS UI| ANC[Add new card] --> |Save| G[Git repo]
```

Finished by Netlify CMS integration.

#### Website genration flow

```mermaid
graph LR
    G[Git repo] --> |Read file| P[Card Parser] --> |Generate Props| CP[Card Page]
```

##### TODO

1. Create Card parser to parse Markdown file to props for Card Page.

- team will propose at least two solutions
- Discuss and choose one

2. Design Card Page and scratch wireframe. As a reference, see the original [google site](https://sites.google.com/ocf.tw/openstarter/Game-Cards/)
3. Create Card Page and reuse most of the Component from the project.

### Stage 2

1. Writers are able to add/update/delete job cards in Mandarin & English
2. Writers are able to add/update/delete event cards in Mandarin & English
3. Writers are able to update/delete home page in Mandarin
4. Writers are able to update/delete home page in English

### Stage 3

1. Writers are able to add/update/delete posts in Mandarin & English
2. Writers are able to add/update Campaign page in Mandarin & English

## Download materials

### Stage 1

As a creator, I would like to notice downloaders how to use/fork the game materials so that our copyright will be persisted.
As a creator, I would like to announce how to use/fork the game materials so that our copyright will be persisted.
As a player, I would like to download the boardgames materials so that I can print out and play.

### Stage 2

As a educator, I would like share my boardgame use cases to other educators in the community.
As a open source interested ppl, I would like to find a mentor so that I can join the OOS community easily.
(form -> claire rearrange -> forward to mentor)

### Stage 3

As a fork game designer, I would like to fork my rule and share to the community.