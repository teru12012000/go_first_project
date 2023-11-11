import { style } from "@vanilla-extract/css";

const styles={
    containar:style({
        width:"270px",
        margin:"30px auto",
        height:"185px",
        overflow:"auto",
        backgroundColor:"#FF3399",
        position:"relative",
    }),
    notingItemContent:style({
        marginTop:"60px",
        display:"flex",
        justifyContent:"center",
        color:"white",
    }),
    itemContent:style({
        width:"250px",
        margin:"5px auto",
        textAlign:"start",
        height:"50px",
    }),
    isLoading:style({
        marginTop:"60px",
        display:"flex",
        justifyContent:"center",
        color:"white",
    })



}

export default styles;