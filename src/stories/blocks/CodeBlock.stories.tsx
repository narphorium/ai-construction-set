import { CodeBlock } from '../../components/blocks/CodeBlock'
import { SimplePythonCode } from '../storyContent'
import { BlockStoryTemplate } from '../BlockStoryTemplate';

export default {
  component: CodeBlock,
  title: 'Blocks/CodeBlock',
  tags: ['autodocs'],
};

export const Default = BlockStoryTemplate.bind({})
Default.args = {
  builder: SimplePythonCode,
};

export const Blue = BlockStoryTemplate.bind({})
Blue.args = {
  builder: SimplePythonCode,
  theme: 'blue',
}

