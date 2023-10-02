import React from 'react'

interface IconProps {
  svg: string
}

export const Icon = function Icon ({ svg }: IconProps): JSX.Element {
  return <span dangerouslySetInnerHTML={{ __html: svg }}></span>
}
