import { inputTodoType } from "@/shared/types/api"

export const postAPI=async(newTodo:inputTodoType)=>{
    const res=await fetch('http://localhost:9090/post_data',{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(newTodo)
    })
    const data=await res.json();
}