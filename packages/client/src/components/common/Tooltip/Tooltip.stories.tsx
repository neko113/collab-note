import { Meta, StoryObj } from '@storybook/react';
import Tooltip from './Tooltip';
import styled from '@emotion/styled';
import { Button } from '../index';

const meta = {
  title: 'Example/Tooltip',
  component: Tooltip,
  tags: ['autodocs'],
} satisfies Meta<typeof Tooltip>;
export default meta;

type Story = StoryObj<typeof Tooltip>;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px;
  gap: 5rem;
  margin-top: 5rem;
`;

export const Default: Story = {
  render: (args) => {
    return (
      <Container>
        <Tooltip {...args}>
          <Button shadow size="md">
            Hover Here
          </Button>
        </Tooltip>
      </Container>
    );
  },
  args: {
    placement: 'top',
    content: 'Boooooom!',
  },
};

export const Placement: Story = {
  render: () => {
    return (
      <Container>
        <Tooltip placement="right" content="Boooooom!">
          <Button shadow size="md">
            Right
          </Button>
        </Tooltip>
        <Tooltip placement="top" content="Boooooom!">
          <Button shadow size="md">
            Top
          </Button>
        </Tooltip>
        <Tooltip placement="bottom" content="Boooooom!">
          <Button shadow size="md">
            Bottom
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Boooooom!">
          <Button shadow size="md">
            Right
          </Button>
        </Tooltip>
      </Container>
    );
  },
};

export const Color: Story = {
  render: () => {
    return (
      <FlexColumn>
        <Tooltip placement="right" content="Boooooom!" color="primary">
          <Button shadow size="md" color="primary">
            Hover me
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Boooooom!" color="success">
          <Button shadow size="md" color="success">
            Hover me
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Boooooom!" color="secondary">
          <Button shadow size="md" color="secondary">
            Hover me
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Boooooom!" color="warning">
          <Button shadow size="md" color="warning">
            Hover me
          </Button>
        </Tooltip>
        <Tooltip placement="right" content="Boooooom!" color="error">
          <Button shadow size="md" color="error">
            Hover me
          </Button>
        </Tooltip>
      </FlexColumn>
    );
  },
};

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-left: 5rem;
  margin-top: 2rem;
`;
