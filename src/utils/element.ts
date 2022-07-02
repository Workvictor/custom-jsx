import { not_nullish } from './not_nullish';

declare global {
  namespace App {
    type Children = (string | Node | null | undefined | number)[];
  }
}

let to_html_string = (child: any) => (not_nullish(child) ? String(child) : '');

let is_node = (child: any): child is Node => <Node>child && true;

export let stringify_children = (children: App.Children) => {
  return children.map(child => (is_node(child) ? child : to_html_string(child)));
};

export function make_element<K extends keyof HTMLElementTagNameMap>(tagName: K) {
  return (children?: App.Children) => {
    const element = document.createElement(tagName);

    if (children) {
      element.append(...stringify_children(children));
    }

    return element;
  };
}

export const div = make_element('div');


