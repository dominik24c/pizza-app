import { Typography } from "@material-ui/core";

const Title = (props)=>{
    return (
        <Typography 
            variant="h5" 
            style={{
                fontWeight:'700',
                fontSize:30
            }}
            >
            {props.children}
        </Typography>
    );
}

export default Title;