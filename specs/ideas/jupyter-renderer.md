# Jupyter Renderer for AICS Blocks

## Problem

Custom data visualizations require too much upfront work:
- Writing matplotlib/plotly boilerplate
- Styling and layout debugging
- Making visualizations interactive
- Code that doesn't carry forward to production

This friction prevents exploratory visualization during domain modeling and prototyping phases.

## Solution Concept

Make AICS blocks renderable in Jupyter notebooks, creating a "Gradio/Streamlit for structured data visualization":

1. **AICS blocks as the schema** — declarative JSON describing what to visualize
2. **Jupyter widget** — receives blocks, bootstraps React client-side
3. **Same components everywhere** — identical rendering in notebooks and React apps
4. **LLM-friendly** — blocks are easy for LLMs to generate from domain descriptions

### Architecture

```
AICS Blocks (JSON)
       ↓
  Jupyter Widget
       ↓
  React (client-side)
       ↓
      DOM
```

### API

```typescript
// In Jupyter notebook (Deno)
import { blockWidget } from "@narphorium/aics/jupyter";

const blocks = [
  { type: "aics:card", uuid: "1", children: ["2", "3"] },
  { type: "aics:table", uuid: "2", /* table data */ },
  { type: "aics:tree", uuid: "3", /* tree data */ }
];

blockWidget(blocks);  // → Jupyter displays interactive React UI
```

### Jupyter Widget Implementation

```typescript
// widget that bootstraps React with AICS blocks
export function blockWidget(blocks: Block[], document?: Document): WidgetDisplay {
  const data = {
    blocks: blocks,
    document: document ?? { uuid: "root", blocks: blocks.map(b => b.uuid) }
  };
  
  return widget(
    data,
    "@narphorium/aics/dist/jupyter-renderer.js",  // Bundled React + AICS
    ["@narphorium/aics/dist/styles.css"],
    'aics'
  );
}
```

### Client-Side Renderer

```typescript
// jupyter-renderer.js (bundled with React + AICS components)
import { createRoot } from 'react-dom/client';
import { BlockStoreProvider, BlockRenderer, createBlockStore } from '@narphorium/aics';

export function renderWidget(element: HTMLElement, data: { blocks: Block[], document: Document }) {
  const store = createBlockStore();
  
  // Hydrate store with blocks
  data.blocks.forEach(block => store.addBlock(block));
  store.addDocument(data.document);
  
  // Render React
  const root = createRoot(element);
  root.render(
    <BlockStoreProvider store={store}>
      <BlockRenderer document={data.document.uuid} />
    </BlockStoreProvider>
  );
}
```

## Integration with TipTap Visualizations

The existing TipTap visualizations (from `@groundrules/visualizations`) become AICS block types:

| TipTap Visualization | AICS Block Type |
|---------------------|-----------------|
| Document | `aics:document` |
| BlockDiff | `aics:block-diff` |
| TextDiff | `aics:text-diff` |
| SideBySide | `aics:side-by-side` |
| SemanticLinks | `aics:semantic-links` |

This unifies the two visualization systems under a single schema.

## Integration with Domain Modeling

The `domain-modeling` skill can offer automatic visualization:

```
1. Socratic Dialog
   "What entities do you need? How do they relate?"
        ↓
2. Domain Model Documentation
   Entities, relationships, constraints
        ↓
3. LLM → AICS Blocks
   Automatic translation to visualization blocks
        ↓
4. blockWidget() in Jupyter
   Interactive exploration
        ↓
5. Iterate
   Refine model, see changes instantly
        ↓
6. Production
   Same blocks render in React app
```

## Success Criteria

- **10X faster** than writing custom visualization code
- **Zero React knowledge required** for notebook users
- **LLM can generate** block structures from natural language
- **Interactive by default** — collapsible, highlightable, paginated
- **Production-ready** — same blocks work in React apps

## Uncertainties

- Bundle size for Jupyter widget (React + all AICS components)
- Performance with large block trees in notebooks
- How to handle block updates/streaming in notebook context
- Whether to support server-side rendering as alternative

## Inspiration

- **Gradio** — declarative Python → instant ML demo UIs
- **Streamlit** — Python scripts → interactive web apps
- **Observable** — reactive notebooks with rich visualizations
- **Jupyter Widgets** — ipywidgets pattern for custom visualizations

## Next Steps

1. Create `jupyter-renderer.js` bundle entry point
2. Add Jupyter-compatible `widget()` function to AICS
3. Add TipTap visualization block types (Document, Diff, etc.)
4. Test in Deno Jupyter notebook
5. Create helper functions for common patterns (entity visualization, etc.)

