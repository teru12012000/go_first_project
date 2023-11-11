'use client'
import ja from "@/shared/ja";
import { inputTodoType } from "@/shared/types/api";
import { postAPI } from "@/util/postAPI";
import { Button, Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { mutate, useSWRConfig } from "swr";
import styles from "./style.css";
interface props{
    editBox:boolean;
    postBox:boolean;
    setPostBox:Dispatch<SetStateAction<boolean>>;
}
const InputForm = (props:props) => {
    useSWRConfig();
    const [value,setValue]=useState<string>("");
    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        setValue(e.target.value);
    }
    const handleClick=async()=>{
        const newTodo:inputTodoType={
            CONTENT:value,
            CHECKED:0,
        }
        await postAPI(newTodo);
        mutate('http://localhost:9090/get_datas');
        setValue("");
    }
    return (
        <div>
            <div className={styles.input}>
                <Input 
                    isDisabled={props.editBox}
                    label="todo" 
                    variant="underlined"
                    value={value}
                    onChange={(e)=>handleChange(e)}
                />
            </div>
            <div className={styles.button}>
                <Button 
                    isDisabled={/^[\x20\u3000]+$/.test(value)||!value}
                    color="primary"
                    onClick={handleClick}
                >
                    {ja.home.inputForm.buttonTitle}
                </Button>
            </div>
        </div>
    );
}

export default InputForm;