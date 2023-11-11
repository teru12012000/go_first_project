'use client'
import { todoType } from "@/shared/types/api";
import { getTodo } from "@/util/getAPI";
import { CircularProgress } from "@nextui-org/react";
import useSWR from "swr";
import TodoItem from "../todoItem";
import ja from "@/shared/ja";
import styles from "./style.css";

const TodoList = () => {
    const {data,isLoading}=useSWR("http://localhost:9090/get_datas",getTodo);
    return (
        <div className={styles.containar}>
            {isLoading?(
                <div className={styles.isLoading}>
                    <CircularProgress color="primary" label="Loading..." />
                </div>
            ):data===null?(
                <div className={styles.notingItemContent}>
                    <p>{ja.home.notingItem}</p>
                </div>
            ):(
                <>
                    {data?.map((item:todoType)=>(
                        <div 
                            key={item.id}
                            className={styles.itemContent}
                            style={{
                                backgroundColor:item.checked===0?'white':'silver',
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