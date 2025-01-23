import { LabelType } from "@/types/blocks/Label";
import { SymbolCodepoints } from "react-material-symbols";
import { BlockRegistry } from "../src/core/BlockRegistry";
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
} from "../src/types/blocks";
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
} from "../src/types/layouts";

export const PlainParagraph = (
  registry: BlockRegistry,
  text = "Test Span",
  parent?: Block,
): Paragraph => {
  const paragraph: Paragraph = registry.createBlock(ParagraphType, parent);
  registry.createBlock(SpanType, paragraph, { content: text });
  return paragraph;
};

export const PlainSection = (
  registry: BlockRegistry,
  text = "Test Span",
  parent?: Block,
): Section => {
  const section: Section = registry.createBlock(SectionType, parent);
  PlainParagraph(registry, text, section);
  return section;
};

export const NamedSectionsContent = (
  registry: BlockRegistry,
  parent?: Block,
  highlighted?: boolean,
  theme?: string,
): Section => {
  const section: Section = registry.createBlock(SectionType, parent, {
    collapsible: false,
    highlighted,
    theme,
  });
  const paragraph1 = registry.createBlock(ParagraphType, section);
  registry.createBlock(LabelType, paragraph1, { content: "Test Section: " });
  registry.createBlock(SpanType, paragraph1, {
    content: "Test Span",
    highlighted: true,
  });

  const paragraph2 = registry.createBlock(ParagraphType, section, {
    highlighted: true,
  });
  registry.createBlock(LabelType, paragraph2, { content: "Test Section: " });
  registry.createBlock(SpanType, paragraph2, { content: "Test Span" });

  return section;
};

export const CollapsibleSection = (
  registry: BlockRegistry,
  parent?: Block,
): Section => {
  const section: Section = registry.createBlock(SectionType, parent, {
    summary: "Test Section",
    collapsible: true,
  });
  PlainParagraph(registry, "Test Span", section);
  return section;
};

export const PlainListItem = (
  registry: BlockRegistry,
  list: List,
  name: string,
  icon?: string,
): ListItem => {
  const item: ListItem = registry.createBlock(ListItemType, list, {
    summary: name,
    icon,
    collapsed: true,
  });
  PlainParagraph(registry, "Test Span", item);
  return item;
};

export const SimpleList = (registry: BlockRegistry, parent?: Block): List => {
  const list = registry.createBlock(ListType, parent);
  PlainListItem(registry, list, "First Item");
  PlainListItem(registry, list, "Second Item");
  PlainListItem(registry, list, "Third Item");
  return list;
};

export const IconList = (registry: BlockRegistry): List => {
  const list = registry.createBlock(ListType);
  PlainListItem(registry, list, "First Item", "search");
  PlainListItem(registry, list, "Second Item", "search");
  PlainListItem(registry, list, "Third Item", "search");
  return list;
};

export const ListInSection = (registry: BlockRegistry): Section => {
  const section: Section = registry.createBlock(SectionType);
  SimpleList(registry, section);
  return section;
};

export const SingleItemList = (
  registry: BlockRegistry,
  parent?: Block,
): List => {
  // FIXME: This should just be a Section with a name now.
  const list = registry.createBlock(ListType, parent);
  PlainListItem(registry, list, "Collapsible Item");
  return list;
};

export const highlightedList = (registry: BlockRegistry): List => {
  const list = registry.createBlock(ListType);
  PlainListItem(registry, list, "First Item", undefined);
  const item2 = PlainListItem(registry, list, "Second Item");
  item2.highlighted = true;
  item2.collapsed = false;
  PlainParagraph(registry, undefined, item2);
  PlainListItem(registry, list, "Third Item");
  return list;
};

export const NestedList = (registry: BlockRegistry): List => {
  const list = registry.createBlock(ListType);
  PlainListItem(registry, list, "First Item");
  const item2 = PlainListItem(registry, list, "Second Item");
  item2.highlighted = true;
  item2.collapsed = false;
  SimpleList(registry, item2);
  PlainListItem(registry, list, "Third Item");
  return list;
};

export const PlainTree = (registry: BlockRegistry): Tree => {
  const tree: Tree = registry.createBlock(TreeType, undefined, {
    name: "Tree",
  });
  PlainSection(registry, undefined, tree);
  SingleItemList(registry, tree);
  SimpleList(registry, tree);
  return tree;
};

export const PaginatedTree = (registry: BlockRegistry): Tree => {
  const tree: Tree = registry.createBlock(TreeType, undefined, {
    name: "Paginated Tree",
    numPages: 3,
  });
  for (let i = 1; i <= tree.numPages; i++) {
    const section = registry.createBlock(SectionType, tree, {
      iteration: i,
    });
    PlainParagraph(registry, "Test Span " + i, section);
  }
  return tree;
};

export const IconTree = (registry: BlockRegistry): Tree => {
  const tree = PaginatedTree(registry);
  tree.icon = "search";
  return tree;
};

export const NestedTree = (registry: BlockRegistry): Tree => {
  const outerNode: Tree = registry.createBlock(TreeType, undefined, {
    name: "Root Node",
    numPages: 3,
  });
  for (let i = 1; i <= outerNode.numPages; i++) {
    const b1 = PlainSection(registry, `First outer node ${i}`, outerNode);
    b1.iteration = i;
    const innerNode: Tree = registry.createBlock(TreeType, outerNode, {
      name: `Inner Node ${i}`,
      numPages: 3,
      iteration: i,
    });
    for (let j = 1; j <= innerNode.numPages; j++) {
      const bi1 = PlainSection(registry, undefined, innerNode);
      bi1.iteration = j;
      const section: Section = registry.createBlock(SectionType, innerNode, {
        iteration: j,
      });
      if (i === 1 && j === 1) {
        section.highlighted = true;
      }
      PlainParagraph(registry, `Root node ${i}<br/>Inner node ${j}`, section);
      const bi2 = PlainSection(registry, undefined, innerNode);
      bi2.iteration = j;
    }
    const b2 = PlainSection(registry, `Last outer node ${i}`, outerNode);
    b2.iteration = i;
  }
  return outerNode;
};

export const SimplePythonCode = (registry: BlockRegistry): Code => {
  const code: Code = registry.createBlock(CodeType, undefined, {
    language: "python",
  });
  const span: Span = registry.createBlock(SpanType, code);
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
  const header: TableCell = registry.createBlock(TableCellType, row, {
    header: true,
    icon,
  });
  const span = registry.createBlock(SpanType, header, {
    content: name,
    datatype,
  });
  span.classNames.add("aics-table-header");
  return header;
};

const TableCell = (
  registry: BlockRegistry,
  row: TableRow,
  value: string,
  datatype?: string,
): TableCell => {
  const cell: TableCell = registry.createBlock(TableCellType, row);
  registry.createBlock(SpanType, cell, { content: value, datatype });
  return cell;
};

export const SimpleTable = (registry: BlockRegistry, parent?: Block): Table => {
  const table: Table = registry.createBlock(TableType, parent);
  const row1 = registry.createBlock<TableRow>(TableRowType, table);
  TableHeader(registry, row1, "Text Property", "text");
  TableCell(registry, row1, "Hello World", "text");

  const row2 = registry.createBlock<TableRow>(TableRowType, table);
  TableHeader(registry, row2, "Numeric Property", "number");
  TableCell(registry, row2, "123.0", "number");

  const row3 = registry.createBlock<TableRow>(TableRowType, table);
  TableHeader(registry, row3, "Date Property", "date");
  TableCell(registry, row3, "2020-01-01", "date");

  return table;
};

export const CollapsibleTable = (
  registry: BlockRegistry,
  parent?: Block,
): Section => {
  const section: Section = registry.createBlock(SectionType, parent, {
    summary: "Test Section",
    collapsible: true,
  });
  SimpleTable(registry, section);
  return section;
};

type Builder = (registry: BlockRegistry, parent?: Block) => Block;

export const WrapInCard = (
  builder: Builder,
  highlighted?: boolean,
  theme?: string,
): Builder => {
  return (registry: BlockRegistry, parent?: Block): Card => {
    const card: Card = registry.createBlock(CardType, parent, {
      highlighted,
      theme,
    });
    builder(registry, card);
    return card;
  };
};

export const WrapInTheme = (builder: Builder, theme: string): Builder => {
  return (registry: BlockRegistry, parent?: Block): Block => {
    const block = builder(registry, parent);
    block.theme = theme;
    return block;
  };
};
