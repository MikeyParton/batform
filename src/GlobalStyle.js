import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @import url("https://cdn.oneflare.com/static/flarekit/fonts/montserrat/regular/montserratregular.css");
  @import url("https://cdn.oneflare.com/static/flarekit/fonts/montserrat/light/montserratlight.css");

  html, body {
    box-sizing: border-box;
    font-family: montserratlight;
    font-size: 16px;
    margin: 0;
    text-size-adjust: 100%;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
`;

export default GlobalStyle;
