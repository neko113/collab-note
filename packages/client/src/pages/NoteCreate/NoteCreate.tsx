import BaseLayout from '~/components/layouts/BaseLayout';
import * as S from './NoteCreate.styles';
import { useCreateNote } from '~/hooks/queries/note';
import { useState } from 'react';
import useModalStore from '~/stores/useModalStore';
import { useNavigate } from 'react-router-dom';

const NoteCreate = () => {
  const [title, setTitle] = useState<string>('');
  const navigate = useNavigate();
  const { openModal } = useModalStore();
  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const { mutate } = useCreateNote({
    onSuccess: () => {
      openModal({
        title: '생성 성공',
        message: '노트가 생성되었습니다.',
        onConfirm: () => {
          navigate('/');
        },
      });
    },
    onError: (error) => {
      alert(error);
      setTitle('');
    },
  });

  const handleCreateNote = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title) {
      openModal({
        title: '생성 실패',
        message: '노트 제목을 입력해주세요.',
        onConfirm: () => {
          return;
        },
      });
      return;
    }

    mutate({
      title,
    });
  };

  return (
    <BaseLayout>
      <S.Cotainer>
        <S.Form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleCreateNote}
        >
          <S.Title>노트 생성</S.Title>
          <S.Input
            placeholder="제목을 입력하세요"
            value={title}
            onChange={handleChangeTitle}
          />
          <S.Textarea placeholder="내용을 입력하세요 (장식용)" />
          <S.Button type="submit">생성하기</S.Button>
        </S.Form>
      </S.Cotainer>
    </BaseLayout>
  );
};

export default NoteCreate;
