import { Button } from "@material-ui/core";
import { makeStyles } from "@mui/styles";
import React from "react";

const useStyles = makeStyles({
    btn:{
        padding: 10,
        fontWeight: 'bold',
        backgroundColor:"#009900",
        color:'white',
        "&:hover":{
            backgroundColor: "#008800"
        }
    },
    btnOutline:{
        padding: 5,
        fontWeight: 'bold',
        backgroundColor:"transparent",
        color:'#009900',
        border: '1px solid #009900',
        marginLeft: 10,
        "&:hover":{
            color: '#00AA00',
            borderColor: '#00AA00'
        }
    }

});

const PrimaryButton = (props) => {
    const classes = useStyles();

    let style = classes.btn;
    if(props.isOutlined){
        style = classes.btnOutline;
    }

    return(
        <Button
            className={style}
            onClick={props.onClickHandler}
        >
            {props.children}
        </Button>
    );
}

export default PrimaryButton;