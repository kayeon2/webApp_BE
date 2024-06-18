import React, {useState} from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";

const DeleteBook = (props) => {
    const [title, setTitle] = useState("");
    const { items, deleteItem } = props;

    // title 값으로 제품 삭제
    const onInputChange = (e) => {
        setTitle(e.target.value);
    };
    
    const onButtonClick = () => {
        const itemToDelte = items.find(item => item.title === title)
        if(itemToDelte) {
            deleteItem(itemToDelte);
        }
        setTitle("");
    };

    return (
        <div className="RetrieveBook">
            <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={2}>
                        <div style={{ textAlign: 'right' }}>title:</div>
                    </Grid>
                    <Grid item>
                        <TextField
                            name="title"
                            fullWidth
                            onChange={onInputChange}
                            // onKeyPress={enterKeyEventHandler}
                            value={title}
                        />
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            style={{ height: '100%' }}
                            color="secondary"
                            variant="contained"
                            onClick={onButtonClick}
                        >
                            제품 삭제
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default DeleteBook;