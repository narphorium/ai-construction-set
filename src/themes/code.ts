import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { type Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { getColor } from './colors'

const chalky = getColor('yellow-600') // '#e5c07b'
const coral = getColor('orange-500') // '#e06c75'
const cyan = '#56b6c2'
const invalid = '#ffffff'
const ivory = getColor('gray-700') // '#abb2bf'
const stone = '#7d8799'
const malibu = getColor('blue-500') // '#61afef'
const sage = getColor('green-500') // '#98c379'
const whiskey = '#d19a66'
const violet = getColor('purple-600') // '#c678dd'
const darkBackground = getColor('gray-300') // '#21252b'
const highlightBackground = '#2c313a'
const background = getColor('slate-200') // '#282c34'
const tooltipBackground = '#353a42'
const selection = '#3E4451'
const cursor = '#528bff'

/// The colors used in the theme, as CSS color strings.
export const color = {
  chalky,
  coral,
  cyan,
  invalid,
  ivory,
  stone,
  malibu,
  sage,
  whiskey,
  violet,
  darkBackground,
  highlightBackground,
  background,
  tooltipBackground,
  selection,
  cursor
}

export const darkTheme = EditorView.theme({
  '&': {
    color: ivory,
    backgroundColor: background
  },

  '.cm-content': {
    caretColor: cursor
  },

  '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
  '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: selection },

  '.cm-panels': { backgroundColor: darkBackground, color: ivory },
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
    color: stone,
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
      color: ivory
    }
  }
}, { dark: true })

export const darkHighlightStyle = HighlightStyle.define([
  {
    tag: t.keyword,
    color: violet
  },
  {
    tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
    color: ivory
  },
  {
    tag: [t.function(t.variableName), t.labelName],
    color: chalky
  },
  {
    tag: [t.color, t.constant(t.name), t.standard(t.name)],
    color: whiskey
  },
  {
    tag: [t.definition(t.name), t.separator],
    color: ivory
  },
  {
    tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
    color: chalky
  },
  {
    tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
    color: ivory
  },
  {
    tag: [t.meta, t.comment],
    color: stone
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
    color: stone,
    textDecoration: 'underline'
  },
  {
    tag: t.heading,
    fontWeight: 'bold',
    color: coral
  },
  {
    tag: [t.atom, t.bool, t.special(t.variableName)],
    color: whiskey
  },
  {
    tag: [t.processingInstruction, t.string, t.inserted],
    color: sage
  },
  {
    tag: t.invalid,
    color: invalid
  }
])

export const codeTheme: Extension = [darkTheme, syntaxHighlighting(darkHighlightStyle)]
