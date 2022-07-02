import { css, defineStyle } from 'src/utils/css';
import { h } from 'src/utils/h';

const style = defineStyle(css`
  color: red;
	font-size: 18px;
`);

const style2 = defineStyle(css`
  color: green;
	font-size: 12px;
`);

export const GuiBlock = (props: Partial<JSX.Attributes> = {}) => {
	return (
		<div className={props.className}>
			<div className={style.cn}>children 1</div>
			<div className={style2.cn}>children 2</div>
			<div>children 3</div>
		</div>
	);
};

declare global {
	interface IntrinsicElements {
		GuiBlock: typeof GuiBlock;
	}
}
