import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { PAGE_LIST } from '~/constants';
import { NoteResponse } from '~/lib/types';

interface Props {
  note: Omit<NoteResponse, 'content'>;
  color: string;
}

const NoteListItem = ({ note, color }: Props) => {
  return (
    <Link to={PAGE_LIST.NOTE(note.id)}>
      <Container color={color}>
        <div>{note.title}</div>
        <div>{note.owner.username}</div>
      </Container>
    </Link>
  );
};

const Container = styled.div<{ color: string }>`
  width: 350px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-right: 1rem;
  background-color: ${(props) => props.color};
  background-clip: content-box;
  gap: 2rem;
  font-size: 1.5rem;
  transition: opacity 0.3s ease-in-out;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

export default NoteListItem;
