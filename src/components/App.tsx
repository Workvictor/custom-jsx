import { css, defineStyle } from 'src/utils/css';
import { h } from 'src/utils/h';
import { Block } from './Block';
import { GuiBlock } from './GuiBlock';


export const App = () => {
	return (
		<Block className={style.cn} onclick={()=>{
			console.log('App onclick');
		}}>
			<GuiBlock className={style2.cn}/>
		</Block>
	);
};

const style = defineStyle(css`
	font-size: 20px;
`, App.name);

const style2 = defineStyle(css`
	background-color: blue;
`);

declare global {
	interface IntrinsicElements {
		App: typeof App;
	}
}
