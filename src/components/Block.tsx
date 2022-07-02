import { h } from 'src/utils/h';

export const Block = (props: Partial<JSX.Attributes> = {}, ...children: Node[]) => {
	return (
		<div {...props} >
			{children}
		</div>
	);
};

declare global {
	interface IntrinsicElements {
		Block: typeof Block;
	}
}
