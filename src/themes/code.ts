import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { type Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { getColor } from './colors'

const unknown = '#cccccc'
const invalid = '#ffffff'

const yellow = getColor('yellow-500') ?? unknown
const orange = getColor('orange-400') ?? unknown
const blue = getColor('blue-600') ?? unknown
const green = getColor('green-300') ?? unknown
const purple = getColor('purple-500') ?? unknown
const darkBackground = getColor('gray-300') ?? unknown
const highlightBackground = '#2c313a'
const background = getColor('slate-200') ?? unknown
const tooltipBackground = '#353a42'
const selection = '#3E4451'
const cursor = '#528bff'

export const darkTheme = EditorView.theme({
  '&': {
    color: blue,
    backgroundColor: background
  },

  '.cm-content': {
    caretColor: cursor
  },

  '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: selection },

  '.cm-panels': { backgroundColor: darkBackground, color: blue },
  '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
  '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

  '.cm-searchMatch': {
    backgroundColor: '#72a1ff59',
    outline: '1px solid #457dff'
  },
  '.cm-searchMatch.cm-searchMatch-selected': {
    backgroundColor: '#6199ff2f'
  },

  '.cm-activeLine': { backgroundColor: '#6699ff0b' },
  '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

  '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
    backgroundColor: '#bad0f847'
  },

  '.cm-gutters': {
    backgroundColor: background,
    color: blue,
    border: 'none'
  },

  '.cm-activeLineGutter': {
    backgroundColor: highlightBackground
  },

  '.cm-foldPlaceholder': {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#ddd'
  },

  '.cm-tooltip': {
    border: 'none',
    backgroundColor: tooltipBackground
  },
  '.cm-tooltip .cm-tooltip-arrow:before': {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent'
  },
  '.cm-tooltip .cm-tooltip-arrow:after': {
    borderTopColor: tooltipBackground,
    borderBottomColor: tooltipBackground
  },
  '.cm-tooltip-autocomplete': {
    '& > ul > li[aria-selected]': {
      backgroundColor: highlightBackground,
      color: blue
    }
  }
}, { dark: true })

export const darkHighlightStyle = HighlightStyle.define([
  {
    tag: t.keyword,
    color: purple
  },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: blue
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: yellow
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: green
  },
  {
    tag: [t.definition(t.name), t.separator],
    color: blue
  },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: green
  },
  {
    tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
    color: blue
  },
  {
    tag: [t.meta, t.comment],
    color: blue
  },
  {
    tag: t.strong,
    fontWeight: 'bold'
  },
  {
    tag: t.emphasis,
    fontStyle: 'italic'
  },
  {
    tag: t.strikethrough,
    textDecoration: 'line-through'
  },
  {
    tag: t.link,
    color: blue,
    textDecoration: 'underline'
  },
  {
    tag: t.heading,
    fontWeight: 'bold',
    color: orange
  },
  {
    tag: [t.atom, t.bool, t.special(t.variableName)],
    color: green
  },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: orange
  },
  {
    tag: t.invalid,
    color: invalid
  }
])

export const codeTheme: Extension = [darkTheme, syntaxHighlighting(darkHighlightStyle)]

export const codeColorTheme = (color: string): Extension => {
  const background = getColor(`${color}-900`) ?? unknown
  const darkShade = getColor(`${color}-300`) ?? unknown
  const lightShade = getColor(`${color}-600`) ?? unknown

  const colorTheme = EditorView.theme({
    '&': {
      color: darkShade,
      backgroundColor: background
    },

    '.cm-content': {
      caretColor: cursor
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: selection },

    '.cm-panels': { backgroundColor: darkBackground, color: darkShade },
    '.cm-panels.cm-panels-top': { borderBottom: '2px solid black' },
    '.cm-panels.cm-panels-bottom': { borderTop: '2px solid black' },

    '.cm-searchMatch': {
      backgroundColor: '#72a1ff59',
      outline: '1px solid #457dff'
    },
    '.cm-searchMatch.cm-searchMatch-selected': {
      backgroundColor: '#6199ff2f'
    },

    '.cm-activeLine': { backgroundColor: '#6699ff0b' },
    '.cm-selectionMatch': { backgroundColor: '#aafe661a' },

    '&.cm-focused .cm-matchingBracket, &.cm-focused .cm-nonmatchingBracket': {
      backgroundColor: '#bad0f847'
    },

    '.cm-gutters': {
      backgroundColor: background,
      color: blue,
      border: 'none'
    },

    '.cm-activeLineGutter': {
      backgroundColor: highlightBackground
    },

    '.cm-foldPlaceholder': {
      backgroundColor: 'transparent',
      border: 'none',
      color: '#ddd'
    },

    '.cm-tooltip': {
      border: 'none',
      backgroundColor: tooltipBackground
    },
    '.cm-tooltip .cm-tooltip-arrow:before': {
      borderTopColor: 'transparent',
      borderBottomColor: 'transparent'
    },
    '.cm-tooltip .cm-tooltip-arrow:after': {
      borderTopColor: tooltipBackground,
      borderBottomColor: tooltipBackground
    },
    '.cm-tooltip-autocomplete': {
      '& > ul > li[aria-selected]': {
        backgroundColor: highlightBackground,
        color: darkShade
      }
    }
  }, { dark: false })

  const colorHighlighting = HighlightStyle.define([
    {
      tag: t.keyword,
      color: darkShade,
      fontWeight: 'bold'
    },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: darkShade
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: darkShade
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: darkShade
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: darkShade
    },
    {
      tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: darkShade
    },
    {
      tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
      color: darkShade
    },
    {
      tag: [t.meta, t.comment],
      color: lightShade
    },
    {
      tag: t.strong,
      fontWeight: 'bold'
    },
    {
      tag: t.emphasis,
      fontStyle: 'italic'
    },
    {
      tag: t.strikethrough,
      textDecoration: 'line-through'
    },
    {
      tag: t.link,
      color: lightShade,
      textDecoration: 'underline'
    },
    {
      tag: t.heading,
      fontWeight: 'bold',
      color: darkShade
    },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: darkShade
    },
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: lightShade
    },
    {
      tag: t.invalid,
      color: lightShade
    }
  ])
  return [colorTheme, syntaxHighlighting(colorHighlighting)]
}
