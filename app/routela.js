/**
 * Created by acer acer on 2018/2/23.
 */
import React from 'react'
import {Link} from 'react-router-dom'
export default class Routela extends React.Component{
	constructor(){
		super();
		this.state={
			routela:'/'
		}
	}
	render(){
		let word=this.props.routela,dic=word.match(/\/[^\/]*/g),line=[];
		for(let i=0;i<dic.length;i++){
			if(i===0){
				line.push({name:'home',route:'/'})
			}
			if(dic[0]!=='/'){
				line.push(
					{name:dic[i].substring(1),route:dic.slice(0,i+1).reduce((gaga,lala)=>{
						return gaga+lala
					})}
				)
			}
		}
		let list=()=>{
			let length=line.length;
			return line.map((item,index)=>{
				return <li key={item.name} style={{display:'inline-block'}}>
					<Link to={item.route}>{item.name}</Link>
					{(length-1===index?'':'->')}
				</li>})
		}
		return <ul>
			{list()}
		</ul>
	}
}