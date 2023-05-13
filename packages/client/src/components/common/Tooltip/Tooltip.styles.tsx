import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { NormalColorType, palette } from '~/lib/styles';

export const StyledTooltipTrigger = styled.div`
  width: max-content;
  display: inherit;
`;

export const StyledTooltipArrow = styled.div`
  display: none;
  border-radius: 0 0 2px 0;
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #ccc;
`;

export const StyledTooltipContent = styled.div<{
  visible: boolean;
  color: NormalColorType;
}>`
  position: absolute;
  display: none;
  border-radius: 14px;
  padding: 8px 12px;
  transition: opacity 0.25s ease 0s, top 0.25s ease 0s;
  ${({ visible }) =>
    visible &&
    css`
      display: block;
      opacity: 1;
      ${StyledTooltipArrow} {
        display: block;
      }
    `};
  ${({ color }) => css`
    background-color: ${palette[color]};
    ${StyledTooltipArrow} {
      background-color: ${palette[color]};
    }
  `};
`;

export const StyledTooltip = styled.div`
  position: relative;
  font-size: 14px;
  color: #fff;
  line-height: 1.5;
`;
