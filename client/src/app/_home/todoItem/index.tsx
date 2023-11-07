'use client'
import { todoType } from "@/shared/types/api";
import { updateTodo } from "@/util/putAPI";
import { Checkbox } from "@nextui-org/react";
import { mutate, useSWRConfig } from "swr";


interface props{
    id:string;
    item:string;
    isChecked:number;
}
const TodoItem = (props:props) => {
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
    return (
        <div
            style={{
                display:"flex",
                marginLeft:"5px",
            }}
        >
            <Checkbox isSelected={props.isChecked===1?true:false} onValueChange={handleChange}/>
            <div>
                {props.item}
            </div>
        </div>
    );
}

export default TodoItem;