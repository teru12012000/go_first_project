import { todoType } from "@/shared/types/api";

export const updateTodo=async(todo:todoType)=>{
    const res=await fetch('http://localhost:9090/update_data',{
        method:"PUT",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(todo)
    });
    const data=await res.json();
}