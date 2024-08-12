import { CodeBlock } from '../../components/blocks/CodeBlock'
import { SimplePythonCode } from '../storyContent'
import { PaddedBlockStoryTemplate } from '../BlockStoryTemplate';

export default {
  component: CodeBlock,
  title: 'Blocks/CodeBlock',
  tags: ['autodocs'],
};

export const Default = PaddedBlockStoryTemplate.bind({})
Default.args = {
  builder: SimplePythonCode,
};

export const Blue = PaddedBlockStoryTemplate.bind({})
Blue.args = {
  builder: SimplePythonCode,
  theme: 'blue',
}

