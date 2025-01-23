import { HighlightableComponentProps } from "@/components/behaviors";
import { Span } from "@/types/blocks";
import { python } from "@codemirror/lang-python";
import { type ViewUpdate } from "@codemirror/view";
import CodeMirror, { type Extension } from "@uiw/react-codemirror";
import React, { forwardRef, type ForwardedRef, type MouseEvent } from "react";
import { cn } from "../../styles";
import { BlockComponentProps } from "./Base";

export interface CodeBlockProps
  extends BlockComponentProps,
    HighlightableComponentProps {
  children?: React.ReactNode;
  editable?: boolean;
  extensions?: any[];
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  onChange?: (value: string, viewUpdate: ViewUpdate) => void;
}

const CodeBlock = forwardRef(function CodeBlock(
  {
    key,
    className,
    extensions,
    onClick,
    onChange,
    children,
    editable,
  }: CodeBlockProps,
  ref: ForwardedRef<HTMLDivElement>,
): JSX.Element {
  const handleClick = (e: MouseEvent<HTMLDivElement>): void => {
    if (onClick !== undefined) {
      onClick(e);
    }
  };

  // TODO: Support highlighting spans within code blocks
  const codeContent = React.Children.toArray(children)
    .map((child) => {
      if (React.isValidElement(child)) {
        const span = child.props as Span;
        return span.content ?? "";
      }
      return "";
    })
    .join("");

  let config: any[] = [];
  if (extensions !== undefined) {
    config = config.concat(extensions);
  }
  config.push(python());

  return (
    <div
      ref={ref}
      key={key}
      className={cn(
        "aics-code-block",
        "bg-[var(--code-background-color)]",
        "text-[9.5pt]",
        "p-0",
        "rounded-md",
        "[&_.cm-editor]:rounded",
        "[&_.cm-editor]:px-0",
        "[&_.cm-editor]:py-2",
        "[&_.cm-editor]:pl-2",
        className,
      )}
      onClick={handleClick}
    >
      <CodeMirror
        value={codeContent}
        basicSetup={false}
        editable={editable}
        extensions={config}
        onChange={(value: string, viewUpdate: ViewUpdate) => {
          if (onChange !== undefined) {
            onChange(value, viewUpdate);
          }
        }}
      />
    </div>
  );
});

CodeBlock.displayName = "CodeBlock";

export { CodeBlock };
