import styled from 'styled-components'
import { themedIcon } from '../src/themes'

export interface IconProps {
  name: string
  size: number
  color: string
}

export const Icon = styled.div<IconProps>`
  display: inline-block;
  width: ${(props) => props.size}px;
  height: ${(props) => props.size}px;
  background-image: ${(props) => themedIcon(props.name, props.size, props.color)};
  background-size: cover;
  background-repeat: no-repeat;
`
