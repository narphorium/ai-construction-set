export interface LeafBlockComponentProps {
  key: string;
  theme?: string;
  className?: string;
}

export interface BlockComponentProps extends LeafBlockComponentProps {
  children?: React.ReactNode;
}
