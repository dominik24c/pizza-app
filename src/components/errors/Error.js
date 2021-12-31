import { Typography } from "@material-ui/core";

const Error = (props) =>{
    return (
        <Typography 
            variant="h4"
            style={{
                fontSize: 30,
                color: "red"
            }}
        >
            Error! Cannot connect to api!
        </Typography>
    );
}

export default Error;