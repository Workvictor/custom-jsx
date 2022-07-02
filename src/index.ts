import { App } from './components/App';
import { css, set_global_style } from './utils/css';

set_global_style(css`
  body {
    background-color: #333;
    color: #fff;
    margin: 0;
  }
`);

const app = App();

console.log(app);

document.body.appendChild(app);
