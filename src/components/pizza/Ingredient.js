import { Box, ListItem } from "@material-ui/core";

const Ingredient = (props) => {

    return (
        <ListItem>
            <Box display='flex' flexGrow={1}>
                <p>{props.name}</p>
            </Box>
            <b>{props.price}$</b>
        </ListItem>
    );
};

export default Ingredient;