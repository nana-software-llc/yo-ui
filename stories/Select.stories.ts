import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Select } from '@/registry/new-york/components/select';
import { fn } from 'storybook/test';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Example/Select',
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {},
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: { onChange: fn() },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    options: [
      {
        value: '1',
        label: 'Class 1',
      },
      {
        value: '2',
        label: 'Class 2',
      },
    ],
    value: "1",
    placeholder: 'Select an option',
    onChange: fn(),
    label: 'Select Class',
    labelInValue: false,
  },
};

export const SelectWithRequestApi: Story = {
  args: {
    request: async (keyword: string) => {
      return [
        {
          value: '1',
          label: 'Class 1',
        },
        {
          value: '2',
          label: 'Class 2',
        },
        {
          value: '3',
          label: 'Class 3',
        },
        {
          value: '4',
          label: 'Class 4',
        },
        {
          value: '5',
          label: 'Class 5',
        },
      ].filter((item) => item.label.toLowerCase().includes(keyword.toLowerCase()))
    },
    options: [
      {
        value: '2',
        label: 'Class 2',
      },
    ],
    value: "2",
    placeholder: 'Select an option',
    onChange: fn(),
    label: 'Select Class',
    labelInValue: false,
  },
};
