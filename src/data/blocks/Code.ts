import { createParagraph, type Paragraph } from './Paragraph'

export interface Code extends Paragraph {
  language?: string
  editable: false
}

export const createCode = (props: Partial<Code>): Code => {
  return {
    ...createParagraph(props as Partial<Paragraph>),
    editable: false,
    ...props,
    type: 'aics:code',
  }
}
