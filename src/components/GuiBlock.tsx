import { css, defineStyle } from 'src/utils/css';
import { h } from 'src/utils/h';
import { Block } from './Block';

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
		<Block className={props.className}>
			<Block className={style.cn}>children 1</Block>
			<Block className={style2.cn}>children 2</Block>
			<Block>children 3</Block>
		</Block>
	);
};

declare global {
	interface IntrinsicElements {
		GuiBlock: typeof GuiBlock;
	}
}
