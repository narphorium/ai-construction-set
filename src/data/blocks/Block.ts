export interface BaseAction { type: string }

export interface Block {
  uuid: string
  type: string
  classNames: Set<string>
  parent?: string
  iteration?: number
  variant?: string
  theme?: string
}

export const createBlock = (props: Partial<Block>): Block => {
  return {
    uuid: '',
    type: 'aics:unknown',
    classNames: new Set(),
    ...props,
  } as Block
}
