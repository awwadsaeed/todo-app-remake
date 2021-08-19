import React,{useContext,useEffect,useState} from 'react';
import {settingContext} from '../../context/settingContext';
import { Button,Alignment} from "@blueprintjs/core";

function SettingsForm() {
    const settings = useContext(settingContext)
    const [show,setShow] = useState(true);
    const [numOfitems,setNumOfitems] = useState(1);

    function handleItemNumber(e){
        setNumOfitems(Number(e.target.value));
    }
    function handleView(e){
        if(e.target.checked){
            setShow(e.target.checked);
        }else{
            setShow(e.target.checked);
        }
    }
    function handleSubmit(e){
        e.preventDefault();
        settings.setItemPerPage(Number(numOfitems));
        settings.setShowCompleted(show);
    }

    useEffect(()=>{
        let payload ={
        itemPerPage:settings.itemPerPage,
        showCompleted:settings.showCompleted,
        }
        if(settings.itemPerPage){
            localStorage.setItem('settings',JSON.stringify(payload));
        }
    },[settings])
    return (
        <div style={{marginTop:'20px'}}>
            <form onSubmit={(e)=>{handleSubmit(e)}}>
                <div>
                <label style={{width:'10%'}}>number of items per page</label>
                <input className="bp3-input" style={{width:'70px'}} name='items' type='number' placeholder={1} value={numOfitems} min={1} onChange={handleItemNumber}></input>
                </div>
                <div style={{height:'40px'}}>
                <label class="bp3-control bp3-checkbox .bp3-align-left">
                <input  name='view' type='checkbox' onChange={handleView}/>
                <span class="bp3-control-indicator"></span>
                    view completed items
                </label>
                </div>
                <Button  type='submit'>submit</Button>
            </form>
        </div>
    )
}

export default SettingsForm
