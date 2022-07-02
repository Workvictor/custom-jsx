import { array_each } from './array_utils';
import { get_class_token } from './token';

export const css = (tokens: TemplateStringsArray, ...args: (string | number)[]) => {
  let result = '';
  array_each(tokens, (token, index) => {
    result += token + (args[index] !== undefined ? args[index] : '');
  });
  return result;
};

export const set_global_style = (styleCSS: string) => {
  const styleElem = document.createElement('style');
  styleElem.innerHTML = styleCSS;
  document.head.append(styleElem);
};

export const defineStyle = (styleCSS: string = '', className = get_class_token()) => {
  let refElement: CSSStyleSheet | null = null;

  if (styleCSS) {
    const styleElem = document.createElement('style');
    styleElem.innerHTML = `.${className}{${styleCSS}}`;
    document.head.appendChild(styleElem);
    const elemIndex = document.styleSheets.length - 1;
    refElement = document.styleSheets.item(elemIndex);
  }

  return {
    el: refElement,
    cn: className,
  };
};