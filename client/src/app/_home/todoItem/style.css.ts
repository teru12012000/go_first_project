import { style } from "@vanilla-extract/css";

const styles={
    containar:style({
        display:"flex",
        alignItems:"center",
    }),
    checkBox:style({
        width:"45px",
        marginLeft:"5px",
    }),
    itemContent:style({
        width:"100px",
        overflow:"auto",
        height:"100%",
    }),
    buttonContents:style({
        display:"flex",
        width:"100px",
        justifyContent:"center",
        alignItems:"center",
    }),
    editButton:style({
        margin:"5px"
    }),
    deleteButton:style({
        marginLeft:"10px"
    })
}

export default styles;