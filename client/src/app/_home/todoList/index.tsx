'use client'

import { todoType } from "@/shared/types/api";
import { getTodo } from "@/util/getAPI";
import { CircularProgress } from "@nextui-org/react";
import useSWR from "swr";
import TodoItem from "../todoItem";
import ja from "@/shared/ja";

const TodoList = () => {
    const {data,isLoading}=useSWR("http://localhost:9090/get_datas",getTodo);
    return (
        <div
            style={{
                width:"270px",
                margin:"30px auto",
                height:"185px",
                overflow:"auto",
                backgroundColor:"#FF3399",
                position:"relative",
            }}
        >
            {isLoading?(
                <div
                    style={{
                        marginTop:"60px",
                        display:"flex",
                        justifyContent:"center",
                        color:"white",
                    }}
                >
                    <CircularProgress color="primary" label="Loading..." />
                </div>
            ):data===null?(
                <>
                    <div
                        style={{
                            marginTop:"60px",
                            display:"flex",
                            justifyContent:"center",
                            color:"white",
                            
                        }}
                    >
                        <p>{ja.home.notingItem}</p>
                    </div>
                </>
            ):(
                <>
                    {data?.map((item:todoType)=>(
                        <div 
                            key={item.id}
                            style={{
                                width:"250px",
                                margin:"5px auto",
                                backgroundColor:item.checked===0?'white':'silver',
                                textAlign:"start",
                                height:"50px",
                            }}
                        >
                            <TodoItem
                                id={item.id}
                                item={item.content} 
                                isChecked={item.checked}                                
                            />
                        </div>
                    ))}
                </>
            )}
        </div>
    );
}

export default TodoList;