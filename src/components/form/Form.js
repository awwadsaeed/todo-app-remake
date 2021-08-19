import React from 'react'
import useForm from '../../hooks/form.js';
import { Button,Slider } from "@blueprintjs/core";

function Form(props) {   
    const { handleChange, handleSubmit } = useForm(props.addItem);
    return (
        <div>
            <form onSubmit={handleSubmit}>

                <h2>Add To Do Item</h2>

                <label style={{marginLeft:'1%'}}>
                    <span style={{marginRight:'10px'}}>To Do Item</span>
                    <input className="bp3-input" style={{width:'70px'}} placeholder="Item Details" name="text" type="text" onChange={handleChange} />
                </label>

                <label style={{marginLeft:'1%'}}>
                    <span style={{marginRight:'10px'}}>Assigned To</span>
                    <input style={{marginRight:'10px'}} className="bp3-input" style={{width:'70px'}} placeholder="Assignee Name" name="assignee" type="text" onChange={handleChange} />
                </label>

                <label style={{marginLeft:'1%'}}>
                    <span style={{marginRight:'10px'}}>Difficulty</span>
                    <input style={{marginRight:'10px'}} name="difficulty" min={1} max={5} type="range" onChange={handleChange} defaultValue={3} />

                </label>

                <label>
                    <Button style={{backgroundColor:'#2A363F'}} type="submit">Add Item</Button>
                </label>
            </form>
        </div>
    )
}

export default Form
