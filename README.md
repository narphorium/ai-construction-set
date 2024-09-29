# AI Construction Set

A collection of UI components for building tools for thought powered by AI.

Inspired by the story of the [Calculator Construction Set](https://www.folklore.org/StoryView.py?story=Calculator_Construction_Set.txt)

## Installation

```bash
npm install ai-construction-set
```

## Concepts

Here's a high-level overview of the core concepts in AICS.

### Blocks

Blocks can be composed together to build any kind of app. Everything in AICS is made up of blocks. Blocks can be created programmatically or streamed from an AI agent.

Blocks can be created using the `BlockRegistry`. You can register your own custom blocks or use one of the built-in ones.

A collection of blocks is stored in a `Document`.

Once you have a `Document` containing a set of `Block`s, you can render it to the page using a `BlockRenderer`.

The components used to render blocks are configured in the `BlockRenderer`. You can customize the behavior of the renderer to use your own components if you like.

### Layouts

Layouts are special types of blocks which provide useful abstractions for grouping together sets of blocks. Layouts are used to create the overall structure of the app.

### Behaviors

Behaviors add cross-cutting concerns like selectable blocks or collapsible blocks. By layering behaviors on top of blocks, we can create complex interactions with minimal effort.

You can create your own behaviors and layer them onto existing block types by registering them using the `BlockRegistry`.

### Mutations

Mutations are declarative changes to blocks which can be chained together into transactions. This makes them useful for things like undo/redo functionality.

Mutations are applied to the `BlockStore` which is responsible for maintaining the state of the app.

### Selectors

Selectors form a declarative query language for blocks. This allows us search for blocks using a set of constraints.

### Themes

Themes allow you to customize the look of existing and new block types. AICS has built-in support for light and dark themes. You can create your own themes or extend existing ones.
