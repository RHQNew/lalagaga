/**
 * Created by acer acer on 2018/2/22.
 */
import React from 'react'
import Board from './Board'
import FetchLa from '../fetch'
export default class Blog extends React.Component{
	constructor(){
		super();
		this.state={
			blogContent:'',
			titleContent:'',
			initVal:'',
			typeContent:"remind",
			imgSrc:'',
			types:[]
		}
	}
	render(){
		let types=this.state.types.map((item,index)=>{
			return(
				<option value={item} key={index}>
					{item}
				</option>
			)
		})
		return<div>
			<h1>note</h1>
			<span>preview here</span>
			<div style={{border:'dashed 2px',marginBottom:'10px'}} dangerouslySetInnerHTML={{__html:this.state.blogContent}}/>
			<div style={{marginBottom:'10px'}}>
				<span>title:</span>
				<input type="text" onChange={(e)=>{this.setState({titleContent:e.target.value})}} value={this.state.titleContent}/>
				<span style={{marginLeft:'10px'}}>type:
					<select name="" id="" onChange={(e)=>{this.setState({typeContent:e.target.value})}} value={this.state.typeContent}>
						{[<option value="remind" key="remind">remind</option>,...types]}
					</select>
				</span>
			</div>
			<Board id="content" keyLa={this.props.keyLa}/>
			<div style={{marginTop:'10px'}} onClick={this.getContent.bind(this)}>PreViewContent</div>
			<div style={{marginTop:'10px'}} onClick={this.subLa.bind(this)}>SubLa</div>
		</div>
	}
	componentWillMount(){
	}
	componentDidMount(){
		this.setState({titleContent:this.props.keyLa.title,typeContent:this.props.keyLa.type})
		FetchLa('http://127.0.0.1:5000/getType',{})
		.then((response)=>{
			return response.json()
		}).then(
			(data)=>{
				let type=[]
				for(let item of data){
					type.push(item.type)
				}
				this.setState({types:type})
			}
		)
	}
	getContent(){
		const data=UE.getEditor('content').getContent()
		this.setState({blogContent:data})
	}
	subLa(){
		const data=UE.getEditor('content').getContent()
		if(this.props.actionType==='edit'){
			FetchLa('http://127.0.0.1:5000/setCommit',
				{
					title:this.state.titleContent,
					context:data,
					id:this.props.keyLa.id,
					type:this.state.typeContent
				})
			.then((response)=>{return response.json()})
			.then( (data)=>{
					this.props.handelCom()
				}
			)
		}else{
			FetchLa('http://127.0.0.1:5000/addCommit',
				{
					title:this.state.titleContent,
					context:data,
					id:this.props.keyLa.id,
					type:this.state.typeContent
				})
			.then((response)=>{return response.json()})
			.then(
				(data)=>{
					this.props.handelCom()
				}
			)
		}
	}
}
















