import { css } from '@emotion/react';
import styled from '@emotion/styled';

export const Container = styled.div<{
  status: 'play' | 'done' | 'pending' | 'unset';
}>`
  width: 100%;
  height: 4px;
  position: relative;
  border-radius: 0.1875rem;
  background-color: #e6e6e6;

  .percent {
    width: 0%;
    height: 100%;
    transition: width 0.5s ease;
    border-radius: 0.1875rem;
    // 파란색
    background-color: #007aff;
  }

  ${({ status }) =>
    status === 'play' &&
    css`
      .percent {
        animation-name: setAnimationContent;
        animation-play-state: running;
        animation-fill-mode: forwards;
        animation-timing-function: linear;

        @keyframes setAnimationContent {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      }
    `}

  ${({ status }) =>
    status === 'done' &&
    css`
      animation: fadeOut 0.2s linear forwards 0.5s;

      @keyframes fadeOut {
        from {
          opacity: 1;
        }

        to {
          opacity: 0;
        }
      }

      .percent {
        animation: full 0.2s ease-in forwards;

        @keyframes full {
          from {
            width: 0%;
          }

          to {
            width: 100%;
          }
        }
      }
    `}
`;
