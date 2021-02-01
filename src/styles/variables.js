import 'typeface-merriweather-sans';
import { injectGlobal } from 'emotion';

const variables = injectGlobal`
  :root {
    --firstActiveColor: #0f4c81;
    --secondActiveColor: #0f817d;
    --superLightGray: #ccc;

    --textColor: #555;
    --lightTextColor:  #777;
    --superLightTextColor:  #aaa;

    --linkColor: #0f1381;
    --hoverLinkColor: #0f4c81;

    --scrollBarThumb: #eaeaea;
    --scrollBarTrack: #f9f9f9;
    --scrollBarWidth: 5px;
  }
`;

export default variables;
