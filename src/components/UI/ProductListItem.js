import { Box, ButtonGroup, ListItem } from "@material-ui/core";

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import PrimaryButton from "./PrimaryButton";

const ProductListItem = (props) =>{
    return (
        <ListItem>
        <Box display="flex" flexGrow={1}>
            {props.children}
        </Box>
        <ButtonGroup >
            <PrimaryButton isOutlined={true} onClickHandler={props.addButtonHandler}>
                <AddIcon/>
            </PrimaryButton>
            <PrimaryButton isOutlined={true} onClickHandler={props.deleteButtonHandler}>
                <RemoveIcon/>
            </PrimaryButton>
        </ButtonGroup>
        </ListItem>
    );
}

export default ProductListItem;