import { css, defineStyle } from 'src/utils/css';
import { h } from 'src/utils/h';
import { GuiBlock } from './GuiBlock';


export const App = () => {
	return (
		<div className={style.cn} onclick={()=>{
			console.log('App onclick');
		}}>
			<GuiBlock className={style2.cn}/>
		</div>
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
