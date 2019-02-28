import styled, { css } from 'styled-components';
import { darken, lighten } from 'polished';

const botMessageColor = '#D8D8D8';
const userMessageColor = '#263133';

export const fadeIn = (delay) => css`
  animation: fadeIn 0.5s ${delay && `${delay}s `}linear;
  animation-fill-mode: forwards;
  opacity: 0;
  transform: translateY(10px);

  @keyframes fadeIn {
    0%   {opacity: 0; transform: translateY(10px);}
    100% {opacity: 1; transform: translateY(0px);}
  }
`;

export const MessageWrapper = styled.div`
  background-color: ${botMessageColor};
  border-radius: 4px;
  padding: 20px;
  white-space: pre-line;

  ${props => props.user && `
    background-color: ${userMessageColor};
    color: white;
  `}

  ${fadeIn()}
`;

export const OptionsWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding-left: 0;
`;

export const Option = styled.li`
  background-color: ${botMessageColor};
  border-radius: 4px;
  cursor: pointer;
  padding: 20px;

  &:not(:last-child) {
    margin-bottom: 5px;
  }

  ${props => props.submit && `
    width: 100px;
    align-self: flex-end;
  `}

  &:hover {
    background-color: ${(props) => {
      if (props.active) return userMessageColor;
      return darken(0.15, botMessageColor);
    }};
  }

  ${props => props.active && `
    background-color: ${userMessageColor};
    color: white;
  `}

  ${(props) => fadeIn((props.index + 1) * 0.25)}
`;
