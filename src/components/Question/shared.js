import styled from 'styled-components';
import { darken, lighten } from 'polished';

const botMessageColor = '#D8D8D8';
const userMessageColor = '#263133';

export const MessageWrapper = styled.div`
  background-color: ${botMessageColor};
  border-radius: 4px;
  padding: 20px;
  white-space: pre-line;

  ${props => props.user && `
    background-color: ${userMessageColor};
    color: white;
  `}
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
`;
