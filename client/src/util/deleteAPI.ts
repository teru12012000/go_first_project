export const deleteTodo=async(id:string)=>{
    const res=await fetch(`http://localhost:9090/delete_data/${id}`,{
        method:"DELETE",
        headers:{
            'Content-Type':'application/json'
        }
    });
    const data=await res.json();
}