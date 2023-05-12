import BaseLayout from '~/components/layouts/BaseLayout';
import * as S from './NoteCreate.styles';
import { useCreateNote } from '~/hooks/queries/note';

const NoteCreate = () => {
  const { mutate } = useCreateNote();

  return (
    <BaseLayout>
      <S.Cotainer>
        <S.Form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <S.Title>노트 생성</S.Title>
          <S.Input placeholder="제목을 입력하세요" />
          <S.Textarea placeholder="내용을 입력하세요 (장식용)" />
          <S.Button>생성하기</S.Button>
        </S.Form>
      </S.Cotainer>
    </BaseLayout>
  );
};

export default NoteCreate;
