import { make_element } from './element';

const objectKeys = <T>(obj: T) => Object.keys(obj) as (keyof T)[]

export function h<T extends keyof JSX.IntrinsicElementMap>(
  Component: T | JSX.ComponentConstructor,
  props: JSX.Props,
  ...children: Node[]
) {
  if (!props) {
    props = {};
  }

  if (typeof Component === 'function') {
    return Component(props, children);
  }

  const element = make_element(Component)();

  objectKeys(props).forEach(propName => {
    if (propName && props && propName in props) {
      const value = props[propName];      
      if (value) {
        (element as any)[propName] = value;
      }
    }
  });

  for (let child of children) {
    if (typeof child === 'string') {
      element.innerText += child;
      continue;
    }
    if (Array.isArray(child)) {
      element.append(...child);
      continue;
    }
    element.appendChild(child);
  }
  return element;
}