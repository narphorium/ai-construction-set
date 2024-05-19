import { python } from '@codemirror/lang-python'
import { type ViewUpdate } from '@codemirror/view'
import CodeMirror, { type Extension } from '@uiw/react-codemirror'
import React, { forwardRef, type ForwardedRef, type MouseEvent } from 'react'
import { styled, useTheme } from 'styled-components'
import { type Code } from '../data/Code'
import { codeTheme } from '../themes/code'
import { themedVariant } from '../themes/theme'
import { getClasses, type SelectableProps } from './Base'

export interface CodeBlockProps extends SelectableProps {
  block: Code
  extensions?: any[]
  onClick?: (e: MouseEvent<HTMLDivElement>) => void
  onChange?: (value: string, viewUpdate: ViewUpdate) => void
}

const CodeBlockComponent = forwardRef(function CodeBlock (
  { className, block, extensions, onClick, onChange }: CodeBlockProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const theme = useTheme()
  const getTheme = (): Extension[] => {
    if (block.variant !== undefined) {
      return codeTheme(theme, block.variant)
    }
    return codeTheme(theme)
  }

  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e)
    }
  }

  let codeContent = ''
  block.spans.forEach((span) => {
    codeContent += span.content
  })

  let config: any[] = []
  if (extensions !== undefined) {
    config = config.concat(extensions)
  }
  config.push(python())

  return (<div ref={ref} key={block.uuid} className={getClasses('aics-code-block', className, block.classNames)} onClick={handleClick}>
      <CodeMirror
        value={codeContent}
        basicSetup={false}
        theme={getTheme()}
        editable={block.editable}
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

CodeBlockComponent.displayName = 'CodeBlock'

export const CodeBlock = styled(CodeBlockComponent)`
  background-color: ${themedVariant('codeBackgroundColor')};
  font-size: 9.5pt;
  padding: 0;
  border-radius: 4px;

  & .cm-editor {
    border-radius: 3px;
    padding: 8px 0 8px 8px;
  }
`
