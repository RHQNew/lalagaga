/**
 * Created by acer acer on 2018/2/22.
 */
import React from 'react'
import ReactDom from 'react-dom'
import Navigation from './Navigation.js'
import { BrowserRouter,Route} from 'react-router-dom'
import Game from '../app/Game'
import BlogList from '../app/BlogList'
let element=document.createElement('div');
element.id='lala';
document.body.appendChild(element);
class MainCom extends React.Component{
	constructor(){
		super()
	}
	render(){
		return <BrowserRouter >
			<div>
				<Route path="/" component={Navigation}/>
				<Route path="/blogList" component={BlogList}/>
				<Route path="/game" component={Game}/>
			</div>
		</BrowserRouter>
	}
}
ReactDom.render(<MainCom/>,document.getElementById('lala'))