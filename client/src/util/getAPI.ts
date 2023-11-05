import { todoType } from "@/shared/types/api";

export const getTodo=async(url:string)=>{
    const res=await fetch(url);
    const data=await res.json();
    return data as todoType[];
}