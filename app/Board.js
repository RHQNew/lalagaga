/**
 * Created by acer acer on 2018/2/28.
 */
import React from 'react'
export default class Board extends React.Component{
	constructor(){
		super()
	}
	render(){

	}
	initEditor(){
		const id=this.props.id;
		const ueEditor=UE.getEditor(this.props.id)
		const theThis=this
		ueEditor.ready(
			(ueditor)=>{
				if(!ueditor){
					UE.delEditor(id);
					self.initEditor();
				}else{
					ueEditor.setContent(this.props.keyLa.context)
				}
			}
		)
	}
	render(){
		return(
			<div id={this.props.id} name="content" ></div>
		)
	}
	componentDidMount(){
		this.initEditor()
	}
	componentWillReceiveProps(){
	}
	componentWillUnmount() {
		//防止重复渲染错误
		UE.delEditor(this.props.id);
	}
}