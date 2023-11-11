'use client'
import ja from "@/shared/ja";
import { todoType } from "@/shared/types/api";
import { updateTodo } from "@/util/putAPI";
import { Checkbox } from "@nextui-org/react";
import { mutate, useSWRConfig } from "swr";
import EditOrDeleteButton from "../editOrDeleteButton";
import { useState } from "react";
import { deleteTodo } from "@/util/deleteAPI";
import EditInputText from "../editInputText";
import styles from "./style.css";
interface props{
    id:string;
    item:string;
    isChecked:number;
}
const TodoItem = (props:props) => {
    const [content,setContent]=useState<string>(props.item);
    const [isDisabled,setIsDisabled]=useState<boolean>(false);
    useSWRConfig();
    const handleCheck=async()=>{
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
            const todo:todoType={
                id:props.id,
                content:content,
                checked:props.isChecked,
            }
            await updateTodo(todo);
            mutate('http://localhost:9090/get_datas');
            setIsDisabled(false);

        }
    }
    const handleDelete=async()=>{
        await deleteTodo(props.id);
        mutate('http://localhost:9090/get_datas');
    }
    return (
        <div className={styles.containar}>
            <div className={styles.checkBox}>
                <Checkbox
                    isDisabled={isDisabled}
                    isSelected={props.isChecked===1?true:false} 
                    onValueChange={handleCheck}
                />
            </div>
            <div className={styles.itemContent}>
                {isDisabled?(
                    <EditInputText
                        value={content}
                        setValue={setContent}
                    />
                ):(
                    <p>{props.item}</p>
                )}
            </div>
            <div className={styles.buttonContents}>
                <div className={styles.editButton}>
                    <EditOrDeleteButton 
                        color={"lime"} 
                        buttonTitle={isDisabled?ja.home.complete:ja.home.edit} 
                        clickEvent={handleEdit} 
                        isDisabled={false}                        
                    />
                </div>
                <div className={styles.deleteButton}>
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