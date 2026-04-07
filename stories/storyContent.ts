import { BlockRegistry, createBlock } from "@/core/BlockRegistry.js";
import { BlockStore } from "@/core/BlockStore.js";
import {
  Block,
  Card,
  CardType,
  type Code,
  CodeType,
  type Paragraph,
  ParagraphType,
  type Section,
  SectionType,
  Span,
  SpanType,
} from "@/types/blocks/index.js";
import { LabelType } from "@/types/blocks/Label.js";
import {
  type List,
  ListItem,
  ListItemType,
  ListType,
  type Table,
  type TableCell,
  TableCellType,
  TableRow,
  TableRowType,
  TableType,
  type Tree,
  TreeType,
} from "@/types/layouts/index.js";
import { SymbolCodepoints } from "react-material-symbols";

export const PlainParagraph = (
  registry: BlockRegistry,
  store: BlockStore,
  text = "Test Span",
  parent?: Block,
): Paragraph => {
  const paragraph: Paragraph = createBlock(registry, ParagraphType);
  const span = createBlock(registry, SpanType, { content: text });

  console.log("Creating paragraph", paragraph, span);

  if (parent) {
    store.addChildBlock(paragraph, parent.uuid);
  } else {
    store.addBlock(paragraph);
  }

  store.addChildBlock(span, paragraph.uuid);

  return paragraph;
};

export const PlainSection = (
  registry: BlockRegistry,
  store: BlockStore,
  text = "Test Span",
  parent?: Block,
): Section => {
  const section: Section = createBlock(registry, SectionType);

  if (parent) {
    store.addChildBlock(section, parent.uuid);
  } else {
    store.addBlock(section);
  }

  PlainParagraph(registry, store, text, section);
  return section;
};

export const NamedSectionsContent = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
  highlighted?: boolean,
  theme?: string,
): Section => {
  const section: Section = createBlock(registry, SectionType, {
    collapsible: false,
    highlighted,
    theme,
  });

  if (parent) {
    store.addChildBlock(section, parent.uuid);
  } else {
    store.addBlock(section);
  }

  const paragraph1 = createBlock(registry, ParagraphType);
  store.addChildBlock(paragraph1, section.uuid);

  const label1 = createBlock(registry, LabelType, {
    content: "Test Section: ",
  });
  store.addChildBlock(label1, paragraph1.uuid);

  const span1 = createBlock(registry, SpanType, {
    content: "Test Span",
    highlighted: true,
  });
  store.addChildBlock(span1, paragraph1.uuid);

  const paragraph2 = createBlock(registry, ParagraphType, {
    highlighted: true,
  });
  store.addChildBlock(paragraph2, section.uuid);

  const label2 = createBlock(registry, LabelType, {
    content: "Test Section: ",
  });
  store.addChildBlock(label2, paragraph2.uuid);

  const span2 = createBlock(registry, SpanType, {
    content: "Test Span",
  });
  store.addChildBlock(span2, paragraph2.uuid);

  return section;
};

export const CollapsibleSection = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
): Section => {
  const section: Section = createBlock(registry, SectionType, {
    summary: "Test Section",
    collapsible: true,
  });

  if (parent) {
    store.addChildBlock(section, parent.uuid);
  } else {
    store.addBlock(section);
  }

  PlainParagraph(registry, store, "Test Span", section);
  return section;
};

export const PlainListItem = (
  registry: BlockRegistry,
  store: BlockStore,
  list: List,
  name: string,
  icon?: string,
): ListItem => {
  const item: ListItem = createBlock(registry, ListItemType, {
    summary: name,
    icon,
    collapsed: true,
  });

  store.addChildBlock(item, list.uuid);

  PlainParagraph(registry, store, "Test Span", item);
  return item;
};

export const SimpleList = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
): List => {
  const list = createBlock(registry, ListType);

  if (parent) {
    store.addChildBlock(list, parent.uuid);
  } else {
    store.addBlock(list);
  }

  PlainListItem(registry, store, list, "First Item");
  PlainListItem(registry, store, list, "Second Item");
  PlainListItem(registry, store, list, "Third Item");
  return list;
};

export const IconList = (registry: BlockRegistry, store: BlockStore): List => {
  const list = createBlock(registry, ListType);
  store.addBlock(list);

  PlainListItem(registry, store, list, "First Item", "search");
  PlainListItem(registry, store, list, "Second Item", "search");
  PlainListItem(registry, store, list, "Third Item", "search");
  return list;
};

export const ListInSection = (
  registry: BlockRegistry,
  store: BlockStore,
): Section => {
  const section: Section = createBlock(registry, SectionType);
  store.addBlock(section);

  SimpleList(registry, store, section);
  return section;
};

export const SingleItemList = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
): List => {
  const list = createBlock(registry, ListType);

  if (parent) {
    store.addChildBlock(list, parent.uuid);
  } else {
    store.addBlock(list);
  }

  PlainListItem(registry, store, list, "Collapsible Item");
  return list;
};

export const highlightedList = (
  registry: BlockRegistry,
  store: BlockStore,
): List => {
  const list = createBlock(registry, ListType);
  store.addBlock(list);

  PlainListItem(registry, store, list, "First Item", undefined);
  const item2 = PlainListItem(registry, store, list, "Second Item");

  item2.highlighted = true;
  item2.collapsed = false;

  PlainParagraph(registry, store, undefined, item2);
  PlainListItem(registry, store, list, "Third Item");
  return list;
};

export const NestedList = (
  registry: BlockRegistry,
  store: BlockStore,
): List => {
  const list = createBlock(registry, ListType);
  store.addBlock(list);

  PlainListItem(registry, store, list, "First Item");
  const item2 = PlainListItem(registry, store, list, "Second Item");

  item2.highlighted = true;
  item2.collapsed = false;

  SimpleList(registry, store, item2);
  PlainListItem(registry, store, list, "Third Item");
  return list;
};

export const PlainTree = (registry: BlockRegistry, store: BlockStore): Tree => {
  const tree: Tree = createBlock(registry, TreeType, {
    name: "Tree",
  });
  store.addBlock(tree);

  PlainSection(registry, store, "Test Span", tree);
  SingleItemList(registry, store, tree);
  SimpleList(registry, store, tree);
  return tree;
};

export const PaginatedTree = (
  registry: BlockRegistry,
  store: BlockStore,
): Tree => {
  const tree: Tree = createBlock(registry, TreeType, {
    name: "Paginated Tree",
    numPages: 3,
  });
  store.addBlock(tree);

  for (let i = 1; i <= tree.numPages; i++) {
    const section = createBlock(registry, SectionType, {
      iteration: i,
    });
    store.addChildBlock(section, tree.uuid);

    PlainParagraph(registry, store, "Test Span " + i, section);
  }
  return tree;
};

export const IconTree = (registry: BlockRegistry, store: BlockStore): Tree => {
  const tree = PaginatedTree(registry, store);

  tree.icon = "search";

  return tree;
};

export const NestedTree = (
  registry: BlockRegistry,
  store: BlockStore,
): Tree => {
  const outerNode: Tree = createBlock(registry, TreeType, {
    name: "Root Node",
    numPages: 3,
  });
  store.addBlock(outerNode);

  for (let i = 1; i <= outerNode.numPages; i++) {
    const b1 = PlainSection(
      registry,
      store,
      "First outer node " + i,
      outerNode,
    );

    b1.iteration = i;

    const innerNode: Tree = createBlock(registry, TreeType, {
      name: `Inner Node ${i}`,
      numPages: 3,
      iteration: i,
    });
    store.addChildBlock(innerNode, outerNode.uuid);

    for (let j = 1; j <= innerNode.numPages; j++) {
      const bi1 = PlainSection(
        registry,
        store,
        "Root node " + i + "<br/>Inner node " + j,
        innerNode,
      );

      bi1.iteration = j;

      const section: Section = createBlock(registry, SectionType, {
        iteration: j,
      });
      store.addChildBlock(section, innerNode.uuid);

      if (i === 1 && j === 1) {
        section.highlighted = true;
      }

      PlainParagraph(
        registry,
        store,
        "Root node " + i + "<br/>Inner node " + j,
        section,
      );

      const bi2 = PlainSection(
        registry,
        store,
        "Last outer node " + i,
        innerNode,
      );

      bi2.iteration = j;
    }

    const b2 = PlainSection(registry, store, "Last outer node " + i, outerNode);

    b2.iteration = i;
  }
  return outerNode;
};

export const SimplePythonCode = (
  registry: BlockRegistry,
  store: BlockStore,
): Code => {
  const code: Code = createBlock(registry, CodeType, {
    language: "python",
  });
  store.addBlock(code);

  const span: Span = createBlock(registry, SpanType);
  store.addChildBlock(span, code.uuid);

  span.content = `import datetime
  def parse_expenses(expenses_string):
      """Parse the list of expenses and return the list of triples (date, value, currency).
      Ignore lines starting with #.
      Parse the date using datetime.
      Example expenses_string:
          2016-01-02 -34.01 USD
          2016-01-03 2.59 DKK
          2016-01-03 -2.72 EUR
      """
      expenses = []
      for line in expenses_string.splitlines():
          if line.startswith("#"):
              continue
          date, value, currency = line.split(" ")
          expenses.append((datetime.datetime.strptime(date, "%Y-%m-%d"),
                          float(value),
                          currency))
      return expenses`;

  return code;
};

const TableHeader = (
  registry: BlockRegistry,
  store: BlockStore,
  row: TableRow,
  name: string,
  datatype?: string,
): TableCell => {
  let icon: SymbolCodepoints | undefined = undefined;
  if (datatype === "date") {
    icon = "calendar_today";
  } else if (datatype === "number") {
    icon = "numbers";
  } else if (datatype === "text") {
    icon = "notes";
  }

  const header: TableCell = createBlock(registry, TableCellType, {
    header: true,
    icon,
  });
  store.addChildBlock(header, row.uuid);

  const span = createBlock(registry, SpanType, {
    content: name,
    datatype,
  });
  store.addChildBlock(span, header.uuid);

  span.classNames.add("aics-table-header");
  return header;
};

const TableCell = (
  registry: BlockRegistry,
  store: BlockStore,
  row: TableRow,
  value: string,
  datatype?: string,
): TableCell => {
  const cell: TableCell = createBlock(registry, TableCellType);
  store.addChildBlock(cell, row.uuid);

  const span = createBlock(registry, SpanType, {
    content: value,
    datatype,
  });
  store.addChildBlock(span, cell.uuid);

  return cell;
};

export const SimpleTable = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
): Table => {
  const table: Table = createBlock(registry, TableType);

  if (parent) {
    store.addChildBlock(table, parent.uuid);
  } else {
    store.addBlock(table);
  }

  const row1 = createBlock<TableRow>(registry, TableRowType);
  store.addChildBlock(row1, table.uuid);

  TableHeader(registry, store, row1, "Text Property", "text");
  TableCell(registry, store, row1, "Hello World", "text");

  const row2 = createBlock<TableRow>(registry, TableRowType);
  store.addChildBlock(row2, table.uuid);

  TableHeader(registry, store, row2, "Numeric Property", "number");
  TableCell(registry, store, row2, "123.0", "number");

  const row3 = createBlock<TableRow>(registry, TableRowType);
  store.addChildBlock(row3, table.uuid);

  TableHeader(registry, store, row3, "Date Property", "date");
  TableCell(registry, store, row3, "2020-01-01", "date");

  return table;
};

export const CollapsibleTable = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
): Section => {
  const section: Section = createBlock(registry, SectionType, {
    summary: "Test Section",
    collapsible: true,
  });

  if (parent) {
    store.addChildBlock(section, parent.uuid);
  } else {
    store.addBlock(section);
  }

  SimpleTable(registry, store, section);
  return section;
};

type Builder = (
  registry: BlockRegistry,
  store: BlockStore,
  parent?: Block,
) => Block;

export const WrapInCard = (
  builder: (
    registry: BlockRegistry,
    store: BlockStore,
    parent?: Block,
  ) => Block,
  highlighted?: boolean,
  theme?: string,
): ((registry: BlockRegistry, store: BlockStore, parent?: Block) => Card) => {
  return (registry: BlockRegistry, store: BlockStore, parent?: Block): Card => {
    const card: Card = createBlock(registry, CardType, {
      highlighted,
      theme,
    });

    if (parent) {
      store.addChildBlock(card, parent.uuid);
    } else {
      store.addBlock(card);
    }

    builder(registry, store, card);
    return card;
  };
};

export const WrapInTheme = (
  builder: (
    registry: BlockRegistry,
    store: BlockStore,
    parent?: Block,
  ) => Block,
  theme: string,
): ((registry: BlockRegistry, store: BlockStore, parent?: Block) => Block) => {
  return (
    registry: BlockRegistry,
    store: BlockStore,
    parent?: Block,
  ): Block => {
    const block = builder(registry, store, parent);

    block.theme = theme;

    return block;
  };
};
