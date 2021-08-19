import React,{useState,useContext,useEffect} from 'react'
import {settingContext} from '../../context/settingContext.js';
import { Button,Card,Elevation } from "@blueprintjs/core";
function List(props) {
    const settingsContext = useContext(settingContext);
    const [activeList, setActiveList] = useState([]);
    const [activePage, setActivePage] = useState(1);
    const [numOfPages, setNumOfPages] = useState(Math.ceil(props.list.length/settingsContext.itemPerPage));

    useEffect(()=>{
        // console.log(settingsContext.itemPerPage);
        let start = (activePage - 1)*settingsContext.itemPerPage;
        let end = start + settingsContext.itemPerPage;
        setNumOfPages(Math.ceil(props.list.length/settingsContext.itemPerPage)); 
        setActiveList(props.list.slice(start,end)); 
    },[props.list.length]);

    useEffect(()=>{
        if(settingsContext.showCompleted){
            let start = (activePage - 1)*settingsContext.itemPerPage;
            let end = start + settingsContext.itemPerPage;
            setActiveList(props.list.slice(start,end));
            setNumOfPages(Math.ceil(props.list.length/settingsContext.itemPerPage));
        }else{
           let temp = props.list.filter((item)=>{
                return item.complete===false
            })
            let start = (activePage - 1)*settingsContext.itemPerPage;
            let end = start + settingsContext.itemPerPage;
            setActiveList(temp.slice(start,end));
            setNumOfPages(Math.ceil(temp.length/settingsContext.itemPerPage))
        }
    },[activePage,settingsContext.showCompleted]);
//----------------------------------------------//

    function changeActivePage(num){
        setActivePage(num);
    }
//----------------------------------------------//
    function toggleView(){
        settingsContext.setShowCompleted( !settingsContext.showCompleted );
    }
//----------------------------------------------//
    const pages=()=>{
        let page =[];
        for(let i=1;i<=numOfPages;i++){
           page.push(<Button style={{backgroundColor:'#2A363F'}} onClick={()=>{changeActivePage(i)}} key={i}>{i}</Button>)
        }
        return page;
    }
//----------------------------------------------//
    return (<>
            <Button style={{marginLeft:'18px', backgroundColor:'#2A363F'}} onClick={toggleView} >{settingsContext.showCompleted.toString()}</Button>
        <div style={{marginLeft:'10%'}}>
            {activeList.map(item => (
        <Card style={{width:'30%', marginBottom:'5px',backgroundColor:'#394B59'}} interactive={true} elevation={Elevation.TWO} key={item.id}>
          <p>{item.text}</p>
          <p><small>Assigned to: {item.assignee}</small></p>
          <p><small>Difficulty: {item.difficulty}</small></p>
          <div onClick={() => props.toggleComplete(item.id)}>Complete: {item.complete.toString()}</div>
        </Card>
      ))}
     {activePage>1 && <Button style={{backgroundColor:'#2A363F'}} onClick={()=>{setActivePage(activePage-1)}}>prev</Button>}
        {pages()}
      {activePage<numOfPages && <Button style={{backgroundColor:'#2A363F'}} onClick={()=>{setActivePage(activePage+1)}} >next</Button>}

        </div>
    </>)
}

export default List
