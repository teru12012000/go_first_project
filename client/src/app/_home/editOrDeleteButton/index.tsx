
import styles from "./style.module.css"
interface props{
    color:string;
    buttonTitle:string;
    clickEvent:()=>void
    isDisabled:boolean;
}
const EditOrDeleteButton = (props:props) => {
    return (
        <div
            style={{
                margin:"5px"
            }}
        >
            <button
                className={styles.button}
                style={{
                    width:"30px",
                    height:"30px",
                    backgroundColor:props.isDisabled?"silver":props.color,
                    borderRadius:"10px",
                    color:"white",
                }}
                disabled={props.isDisabled}
                onClick={props.clickEvent}
            >
                {props.buttonTitle}
            </button>
        </div>
    );
}

export default EditOrDeleteButton;