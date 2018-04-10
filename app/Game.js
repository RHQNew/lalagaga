/**
 * Created by acer acer on 2018/2/22.
 */
import React from 'react'
import Ooooo from './gamela/ooooo'
import Caichengyu from './gamela/caichengyu'
import Wenzimaoxian from './gamela/wenzimaoxian'
import {Link,Route} from 'react-router-dom'
export default class Game extends React.Component{
	constructor(){
		super();
		this.state={
			pathname:'/game'
		}
	}
	render(){
		let page='',lala='';
		if(this.state.pathname==='/game'){
			return <ul>
				<li><Link to="/game/ooooo">五子棋</Link></li>
				<li><Link to="/game/caichengyu">猜成语</Link></li>
				<li><Link to="/game/wenzimaoxian">文字冒险</Link></li>
			</ul>
		}else{
			return <div>
				<Route path="/game/:id" render={
					({match}) => {
						switch(true){
							case(match.params.id==='ooooo'):
								page=<Ooooo/>;
								break;
							case(match.params.id==='caichengyu'):
								page=<Caichengyu/>;
								break;
							case(match.params.id==='wenzimaoxian'):
								page=<Wenzimaoxian/>
								break;
							default:
								page=''
						}
						return page
					}
				}></Route>
			</div>
		}
	}
	componentWillReceiveProps(prevProps){
		this.setState({pathname:prevProps.location.pathname})
	}
}