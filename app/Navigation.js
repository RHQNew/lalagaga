/**
 * Created by acer acer on 2018/2/22.
 */
import React from 'react'
import {Link,Route} from 'react-router-dom'
import Routerla from './routela.js'
//react-router-dom export了好几个，link要加{}
export default class Navigation extends React.Component{
	constructor(){
		super();
		this.state={
			pathname:'/'
		}
	}
	render(){
		let page=
			<div>
				<h1>welcome to lalagaga</h1>
				<ul>
					<li><Link to="/blogList">blogList</Link></li>
					<li><Link to="/game">game</Link></li>
				</ul>
			</div>
		if(this.state.pathname!=='/'){
			page=''
		}
		return <div>
			<Routerla routela={this.state.pathname}/>
			{page}
			</div>
	}
	componentWillReceiveProps(prevProps){
		this.setState({pathname:prevProps.location.pathname})
	}
}