/**
 * Created by acer acer on 2018/2/28.
 */
import React from 'react'
import FetchLa from '../fetch'
import Blog from './Blog'
export default class BlogList extends React.Component{
	constructor(){
		super()
		this.state= {
			listla: [],
			editla:false,
			keyLa:'',
			actionType:'',
			theListla:[],
			handelList:'none',
			handelView:true,
			lists:[],
			learnLists:[],
			levalList:[],
			handleType:'#cccccc',
			cover:"block",
			leval:"",
			typeContent:"",
			editTypeContent:"",
			currType:'',
			disable:''
		}
	}
	componentWillMount(){
		this.init.bind(this)();
		this.initNode.bind(this)('learn',(data)=>{
			this.addNode(data,(list)=>{
				this.setState({lists:list})
			})
		})
	}
	addNode(data,fnc){
		let list=[]
		for(let item of data){
			list.push(item.TYPE)
		}
		fnc(list)
	}
	initNode(type,fnc){
		FetchLa('http://127.0.0.1:5000/getNode',{type:type})
		.then((response)=>{
			return response.json()
		})
		.then(
			data=>{
				fnc(data)
			}
		)
	}
	init(type){
		this.fetchList.bind(this)((data)=>{
			this.setState({listla:data})
			let theColors=[];
			for(let i=0;i<data.length;i++){
				theColors.push('white')
			}
			this.setState({theListla:theColors})
		},type);
	}
	render(){
		const listla=this.state.listla.map((item,index)=>{
			return (
			<div style={{border:'black solid 1px',width:'100%',marginTop:'10px',padding:"10px"}} key={index}>
				<div style={{border:"1px solid black",width:"9px",height:"9px",marginLeft:'5px',
					backgroundColor:this.state.theListla[index],display:this.state.handelList}}
				     onClick={this.handelTheEdit(index).bind(this)}/>
				<span>title:</span>
				<h1 style={{fontSize:'25px',display:'inline-block'}} onClick={this.handelEdit(item).bind(this)}>{item.title}</h1>
				<span style={{margin:'0 10px'}}>id:{item.id}</span>
				<span style={{margin:'0 10px'}}>type:{item.type}</span>
				<div style={{width:'100%',borderBottom:'1px solid black',height:0}}/>
				<div dangerouslySetInnerHTML={{__html:item.context}} style={{height:'54px', overflow:'hidden'}}/>
				<div style={{textAlign:'center',height:'25px'}} onClick={this.handelClip(event).bind(this)}>....</div>
			</div>
			)
		});
		if(this.state.handelView){
			let lists=this.state.lists,learnLists=this.state.learnLists,levalList=this.state.levalList
			let list=(lists,level)=>{
				let perlis= lists.map((item,index)=>{
						return (
							<li key={index} onClick={this.handelTypeList(item,level)}>
								{item}
							</li>
						)
					})
				return(
					lists.length===0?'': <ul style={{width: "100%", boxSizing: "border-box",border:'1px solid #cccccc',marginTop:'10px'}}>{perlis}</ul>
				)
			}
			return(
				<div>
					<div onClick={this.toList.bind(this)}>toList</div>
					<span style={{width:"159px",position:"absolute",height:"121px",display:this.state.cover}}/>
					<span style={{color:this.state.handleType}}>leval:{this.state.leval}</span>
					<span style={{color:this.state.handleType}}>
						<p style={{margin:0}} onClick={this.addTypes.bind(this)}>addTypes:</p>
						<input type="text" onChange={(e)=>{this.setState({typeContent:e.target.value})}} value={this.state.typeContent}/>
					</span>
					<span style={{color:this.state.handleType,display:this.state.disable}}>
						<p style={{margin:0}} onClick={this.editTypes.bind(this)}>editTypes:</p>
						<input type="text" onChange={(e)=>{this.setState({editTypeContent:e.target.value})}} value={this.state.editTypeContent}/>
					</span>
					<span style={{color:this.state.handleType,display:'block'}} onClick={this.deleteType.bind(this)}>
						deleteType
					</span>
					<ul style={{padding:0,width:'75%'}}>
						<li style={{width:'100%',display:'inline-block'}}>
							<span>learn</span>
							{list(lists,1)}
							{list(learnLists,2)}
							{list(levalList,3)}
						</li>
					</ul>
				</div>
			)
		}else{
			if(!this.state.editla){
				return(
					<div>
						<div onClick={this.seeType.bind(this)}>viewTags</div>
						<div onClick={this.addCommit.bind(this)}>addCommit</div>
						<div onClick={this.handelTheList.bind(this)} style={{marginRight:'25px',display:'inline-block'}}>EditListLength</div>
						<div onClick={this.confirmHandel.bind(this)} style={{display:'inline-block'}}>ConfirmDelete</div>
						{listla}
					</div>
				)
			}
			else{
				return (
					<Blog keyLa={this.state.keyLa} handelCom={this.handelCom.bind(this)} actionType={this.state.actionType}/>
				)
			}
		}
	}
	seeType(){
		this.initNode.bind(this)('learn',(data)=>{
			this.addNode(data,(list)=>{
				this.setState({lists:list,typeContent:'',editTypeContent:'',learnLists:[], levalList:[],editla:true,handelView:true})
			})
		})
	}
	toList(){
		this.setState({lists:[],typeContent:'',editTypeContent:'',learnLists:[], levalList:[],editla:false,handelView:false})
	}
	deleteType(){
		FetchLa('http://127.0.0.1:5000/deleteNode',{type:this.state.currType})
		.then((response)=>{return response.json()})
		.then((data)=>{
			this.initNode.bind(this)('learn',(data)=>{
				this.addNode(data,(list)=>{
					this.setState({lists:list,typeContent:'',editTypeContent:'',learnLists:[],levalList:[]})
				})
			})
		})
	}
	addTypes(){
		FetchLa('http://127.0.0.1:5000/getByType',{type:this.state.currType})
		.then((response)=>{
			return response.json()}
		)
		.then((data)=>{
			let priType='';
			if(this.state.levalList[0]==='what to learn'){
				priType=this.state.currType
			}else{
				priType=data[0].pritype
			}
			console.log(priType)
			FetchLa('http://127.0.0.1:5000/addType',{type:this.state.typeContent,pritype:priType,leval:this.state.leval})
			.then(
				this.initNode.bind(this)('learn',(data)=>{
					this.addNode(data,(list)=>{
						this.setState({lists:list,typeContent:'',editTypeContent:'',learnLists:[],levalList:[],disable:'block'})
					})
				})
			)
		})
	}
	editTypes(){
		FetchLa('http://127.0.0.1:5000/getByType',{type:this.state.currType})
		.then((response)=>{
			return response.json()}
		)
		.then((data)=>{
			FetchLa('http://127.0.0.1:5000/setType',
				{
					type:this.state.editTypeContent,
					pritype:data[0].pritype,
					leval:this.state.leval,
					thetype:this.state.currType
				})
			.then((response)=>{
				return response.json()
				})
			.then((data)=>{
				this.setState({currType:data.type})
				this.initNode.bind(this)('learn',(data)=>{
					this.addNode(data,(list)=>{
						this.setState({lists:list,typeContent:'',editTypeContent:'',learnLists:[],levalList:[]})
					})
				})
			})
		})
	}
	handelTypeList(item,level){
		let itemla=item
		return (event)=>{
			event.target.style.backgroundColor='#cccccc'
			let nodes=event.target.parentNode.childNodes
			for(let item of nodes){
				if(item===event.target) continue
				item.style.backgroundColor='#ffffff'
			}
			let UIControl=(leval)=>{
				this.setState({cover:"none",handleType:"black",leval:leval,currType:itemla,levalList:[]})
			}
			if(level===1){
				UIControl(1);
				this.initNode(itemla,(data)=>{
					this.addNode(data,(list)=>{
						this.setState({learnLists:list,disable:'block'})
						if(list.length===0){
							this.setState({learnLists:['what to learn'],leval:3,disable:'none'})
						}
					})
				})
			}else if(level===2){
				UIControl(2);
				if(itemla==='what to learn'){
					this.setState({disable:'none'})
				}else {
					this.setState({disable:'block'})
					this.fetchList.bind(this)((data)=>{
						let list=[]
						for(let item of data){
							list.push(item.id+":"+item.title)
						}
						this.setState({levalList:list})
					},itemla);
				}
			}else{
				this.setState({disable:'block'})
				FetchLa('http://127.0.0.1:5000/getCommitByID',{id:+itemla.match(/\d*/g)[0]})
				.then((response)=>{
					return response.json()}
				)
				.then((data)=>{
					this.setState({
						handelView:false,
						editla:true,
						keyLa:data[0],
						actionType:'edit'
					})
				})
			}
		}
	}
	handelClip(event){
		return (event)=> {
			let tar=event.target.previousSibling.style
			if(tar.height==='54px'){
				tar.height='auto';
				tar.overflow='none';
			}else{
				tar.height='54px';
				tar.overflow='hidden';
			}
		}
	}
	typeList(type){
		return ()=>{
			this.init(type)
		}
	}
	confirmHandel(){
		let keys=this.state.theListla,listla=this.state.listla,key,
		arra=listla.map(
			(item,index)=>{
				if(keys[index]==='black'){
					key=item.id
				}else{
					key=''
				}
				return key
			}
		)
		let text=''
		for(let item of arra){
			if(item){
				text+=(item+',')
			}
		}
		if(text!==''){
			FetchLa('http://127.0.0.1:5000/deleteCommit',{
				theKey:text.slice(0,-1)
			}).then(
				(response)=>{
					return response.json()
				}).then(
				this.init.bind(this)('')
			)
		}
		this.setState({handelList:'none'})
	}
	handelTheList(){
		this.setState({handelList:'inline-block'})
	}
	handelTheEdit(index){
		return ()=>{
			let colors=this.state.theListla
			colors[index]=colors[index]==="white"?"black":"white"
			this.setState({theListla:colors})
		}
	}
	fetchList(fnc,type=''){
		FetchLa('http://127.0.0.1:5000/getCommit',{type:type})
		.then((response)=>{
			return response.json()}
			)
		.then((data)=>{
			fnc(data)})
	}
	handelEdit(item){
		return ()=>{
			this.setState({editla:true,keyLa:item,actionType:'edit'})
		}
	}
	addCommit(){
		this.setState({editla:true,
			keyLa:{
			title:'',
			id:this.state.listla[this.state.listla.length-1]['id']+1,
			context:'',
			type:"remind"},
			actionType:'add'
		})
	}
	handelCom(){
		this.fetchList.bind(this)(
			(data)=>{
				this.setState({editla:false,listla:data})
			}
		)
	}
}