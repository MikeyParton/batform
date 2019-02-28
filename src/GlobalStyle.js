import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    box-sizing: border-box;
    text-size-adjust: 100%;
    margin: 0;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
