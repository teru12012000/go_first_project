import { style } from "@vanilla-extract/css";

const styles={
    containar:style({
        margin:"5px"
    }),
    button:style({
        width:"30px",
        height:"30px",
        borderRadius:"10px",
        color:"white",
        ':hover':{
            opacity:0.7,
        }
    })
}

export default styles;