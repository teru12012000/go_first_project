import { Input } from "@nextui-org/react";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
interface props{
    value:string;
    setValue:Dispatch<SetStateAction<string>>;
}
const EditInputText = (props:props) => {
    const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
        props.setValue(e.target.value);
    }
    return (
        <Input 
            label="todo" 
            variant="underlined"
            value={props.value}
            onChange={(e)=>handleChange(e)}
        />
    );
}

export default EditInputText;