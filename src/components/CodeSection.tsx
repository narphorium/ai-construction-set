import { python } from '@codemirror/lang-python'
import { type ViewUpdate } from '@codemirror/view'
import CodeMirror, { type Extension } from '@uiw/react-codemirror'
import React, { forwardRef, type ForwardedRef, type MouseEvent } from 'react'
import { styled } from 'styled-components'
import theme from 'styled-theming'
import { type Code } from '../data/Code'
import { codeColorTheme, codeTheme } from '../themes/code'
import { getColor } from '../themes/colors'
import { type SelectableProps } from './Base'

export interface CodeSectionProps extends SelectableProps {
  code: Code
  extensions?: any[]
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onChange?: (value: string, viewUpdate: ViewUpdate) => void
  editable: boolean
}

const CodeSectionComponent = forwardRef(function CodeSection (
  { className, code, extensions, selected, onSelected, onClick, onChange, variant, editable, key }: CodeSectionProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const getClasses = (): string => {
    let classes = ['aics-code-section']
    if (className !== undefined) {
      if (typeof className === 'string') {
        classes.push(className)
      } else if (Array.isArray(className)) {
        classes = classes.concat(className)
      }
    }
    if (selected === true) {
      classes.push('selected')
    }
    return classes.join(' ')
  }

  const getTheme = (): Extension => {
    if (code.variant !== undefined) {
      return codeColorTheme(code.variant)
    }
    return codeTheme
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  let codeContent = ''
  code.spans.forEach((span) => {
    codeContent += span.content
  })

  let config: any[] = []
  if (extensions !== undefined) {
    config = config.concat(extensions)
  }
  config.push(python())

  return (<div ref={ref} className={getClasses()} onClick={handleClick}>
      <CodeMirror
        value={codeContent}
        basicSetup={false}
        theme={getTheme()}
        editable={editable}
        extensions={config}
        onChange={(value: string, viewUpdate: ViewUpdate) => {
          if (onChange !== undefined) {
            onChange(value, viewUpdate)
          }
        }}
      />
    </div>
  )
})

const backgroundColor = theme('mode', {
  light: getColor('slate-200'),
  dark: getColor('slate-100')
})

export const CodeSection = styled(CodeSectionComponent)`
  background-color: ${backgroundColor};
  font-size: 9.5pt;
  padding: 0;
  border-radius: 4px;

  & .cm-editor {
    border-radius: 3px;
    padding: 8px 0 8px 8px;
  }
`
