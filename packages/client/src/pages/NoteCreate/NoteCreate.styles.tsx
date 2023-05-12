import styled from '@emotion/styled';
import { motion } from 'framer-motion';

export const Cotainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  height: 100%;
`;

export const Form = styled(motion.form)`
  width: 100%;
  height: 500px;
  border: none;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  margin: 0;
  padding: 20px;
  background-color: #eaeaea;
  border-radius: 10px 10px 0 0;
`;

export const Input = styled.input`
  width: 100%;
  height: 50px;
  border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 20px;
  font-size: 16px;
  font-weight: 700;
  outline: none;
`;

export const Textarea = styled.textarea`
  width: 100%;
  height: 350px;
  border: none;
  padding: 20px;
  font-size: 16px;
  font-weight: 700;
  outline: none;
  resize: none;
`;

export const Button = styled.button`
  width: 100%;
  height: 50px;
  background-color: #eaeaea;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  border-radius: 0 0 10px 10px;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  &:hover {
    background-color: #d4d4d4;
  }
`;
