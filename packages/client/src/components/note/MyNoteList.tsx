import styled from '@emotion/styled';
import { Carousel } from '../common';
import useUser from '~/hooks/useUser';
import { useGetNotesListByUserId } from '~/hooks/queries/note';
import NoteListItem from './NoteListItem';

const MyNoteList = () => {
  const user = useUser();

  const { data } = useGetNotesListByUserId(user?.id);

  return (
    <Container>
      {user && (
        <>
          <Title>My Note List</Title>
          <Carousel>
            {data?.list.map((note, idx) => {
              return (
                <NoteListItem
                  key={note.id}
                  note={note}
                  color={idx % 2 === 0 ? '#70BBF5' : '#EDF9B2'}
                />
              );
            })}
          </Carousel>
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
`;

const Title = styled.div`
  font-size: 1.5rem;
  padding: 0.5rem;
`;

export default MyNoteList;
