import { HighlightStyle, syntaxHighlighting } from '@codemirror/language'
import { type Extension } from '@codemirror/state'
import { EditorView } from '@codemirror/view'
import { tags as t } from '@lezer/highlight'
import { type DefaultTheme } from 'styled-components'
import { themedVariant } from './theme'

const unknown = '#cccccc'
const invalid = '#ffffff'

export const codeTheme = (theme: DefaultTheme, variant = 'default'): Extension[] => {
  const props = { theme, variant, selected: 'unselected' }

  const textColor = themedVariant('codeTextColor')(props) ?? unknown
  const functionColor = themedVariant('codeFunctionColor')(props) ?? unknown
  const stringColor = themedVariant('codeStringColor')(props) ?? unknown
  const constantColor = themedVariant('codeConstantColor')(props) ?? unknown
  const keywordColor = themedVariant('codeKeywordColor')(props) ?? unknown
  const backgroundColor = themedVariant('codeBackgroundColor')(props) ?? unknown
  const panelBackgroundColor = themedVariant('codePanelBackgroundColor')(props) ?? unknown

  // TODO: Move these mappings to the theme
  const highlightBackground = '#2c313a'
  const tooltipBackground = '#353a42'
  const selection = '#3E4451'
  const cursor = '#528bff'

  const darkTheme = EditorView.theme({
    '&': {
      color: textColor,
      backgroundColor
    },

    '.cm-content': {
      caretColor: cursor
    },

    '.cm-scroller': {
      'font-family': 'Roboto Mono, monospace',
      'font-weight': 300
    },

    '.cm-cursor, .cm-dropCursor': { borderLeftColor: cursor },
    '&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection': { backgroundColor: selection },

    '.cm-panels': { backgroundColor: panelBackgroundColor, color: textColor },
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
      backgroundColor,
      color: textColor,
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
        color: textColor
      }
    }
  }, { dark: true })

  const darkHighlightStyle = HighlightStyle.define([
    {
      tag: t.keyword,
      color: keywordColor
    },
    {
      tag: [t.name, t.deleted, t.character, t.propertyName, t.macroName],
      color: textColor
    },
    {
      tag: [t.function(t.variableName), t.labelName],
      color: functionColor
    },
    {
      tag: [t.color, t.constant(t.name), t.standard(t.name)],
      color: constantColor
    },
    {
      tag: [t.definition(t.name), t.separator],
      color: textColor
    },
    {
      tag: [t.typeName, t.className, t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace],
      color: constantColor
    },
    {
      tag: [t.operator, t.operatorKeyword, t.url, t.escape, t.regexp, t.link, t.special(t.string)],
      color: textColor
    },
    {
      tag: [t.meta, t.comment],
      color: textColor
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
      color: textColor,
      textDecoration: 'underline'
    },
    {
      tag: t.heading,
      fontWeight: 'bold',
      color: stringColor
    },
    {
      tag: [t.atom, t.bool, t.special(t.variableName)],
      color: constantColor
    },
    {
      tag: [t.processingInstruction, t.string, t.inserted],
      color: stringColor
    },
    {
      tag: t.invalid,
      color: invalid
    }
  ])

  return [darkTheme, syntaxHighlighting(darkHighlightStyle)]
}
