import styles from "./styles.css";

interface props{
    color:string;
    buttonTitle:string;
    clickEvent:()=>void
    isDisabled:boolean;
}
const EditOrDeleteButton = (props:props) => {
    return (
        <div className={styles.containar}>
            <button
                className={styles.button}
                style={{
                    backgroundColor:props.isDisabled?"silver":props.color,
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