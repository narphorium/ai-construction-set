export type BlockID = string

export interface BlockProps {
  uuid: BlockID
  type: string
  classNames: Set<string>
  children: BlockID[]
  parent?: string
  iteration?: number
  variant?: string
  theme?: string
}

export const createBlock = (props: Partial<BlockProps> = {}): BlockProps => {
  return {
    uuid: '',
    type: 'aics:unknown',
    classNames: new Set(),
    children: [],
    ...props,
  } as Block
}

export type BlockGetter<P extends BlockProps> = () => P
export type BlockSetter<P extends BlockProps> = (state: Partial<P>) => void

export interface BlockActions {
}

export const createBlockActions = (props: Partial<BlockActions> = {}): BlockActions => {
  return {
    ...props
  } as BlockActions
}

export type Block = BlockProps & BlockActions
