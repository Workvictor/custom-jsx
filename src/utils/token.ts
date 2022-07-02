let css_var_id = 0;
export const get_class_token = () => `cn${css_var_id++}`;
export const get_var_token = () => `--v${css_var_id++}`;
