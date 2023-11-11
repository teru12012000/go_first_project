'use client'
import ja from "@/shared/ja";
import { todoType } from "@/shared/types/api";
import { updateTodo } from "@/util/putAPI";
import { Button, Checkbox } from "@nextui-org/react";
import { mutate, useSWRConfig } from "swr";
import EditOrDeleteButton from "../editOrDeleteButton";
import { useState } from "react";
import { deleteTodo } from "@/util/deleteAPI";


interface props{
    id:string;
    item:string;
    isChecked:number;
}
const TodoItem = (props:props) => {
    const [isDisabled,setIsDisabled]=useState<boolean>(false);
    useSWRConfig();
    const handleChange=async()=>{
        const todo:todoType={
            id:props.id,
            content:props.item,
            checked:props.isChecked===1?0:1,
        }
        await updateTodo(todo);
        mutate('http://localhost:9090/get_datas');
    }
    const handleEdit=async()=>{
        if(!isDisabled){
            setIsDisabled(true);
        }else{
            setIsDisabled(false);
        }
    }
    const handleDelete=async()=>{
        await deleteTodo(props.id);
        mutate('http://localhost:9090/get_datas');
    }
    return (
        <div
            style={{display:"flex",alignItems:"center",}}
        >
            <div
                style={{width:"45px",marginLeft:"5px"}}
            >
                <Checkbox 
                    isSelected={props.isChecked===1?true:false} 
                    onValueChange={handleChange}
                />
            </div>
            <div 
                style={{width:"100px",overflow:"auto",height:"100%",}}
            >
                {props.item}
            </div>
            <div 
                style={{display:"flex",width:"100px",justifyContent:"center",alignItems:"center",}}
            >
                <div
                    style={{margin:"5px"}}
                >
                    <EditOrDeleteButton 
                        color={"lime"} 
                        buttonTitle={ja.home.edit} 
                        clickEvent={handleEdit} 
                        isDisabled={false}                        
                    />
                </div>
                <div
                    style={{marginLeft:"10px"}}
                >
                    <EditOrDeleteButton 
                        color={"red"} 
                        buttonTitle={ja.home.delete} 
                        clickEvent={handleDelete}
                        isDisabled={isDisabled}
                    />
                </div>
            </div>
        </div>
    );
}

export default TodoItem;