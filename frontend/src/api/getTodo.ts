import { todoType } from "@/shared/types/apiType";

export const getTodo=async(url:string)=>{
    const res=await fetch(url);
    const data=await res.json();
    return data as todoType[];
}