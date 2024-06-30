import React, {useState} from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";

const UpdateBook = (props) => {
    const [item, setItem] = useState({title: "", author: "", publisher: "", userId: ""});
    const { retrieveItem, editItem } = props;

    // title 값으로 제품 검색 후 수정
    const onInputChange = (e) => {
        const {name, value} = e.target;
        setItem(prevItem => ({...prevItem, [name]: value}));
    };

    const onButtonClick = async () => {
        const response = await retrieveItem(item.title);
        if(response) {
            setItem(response);
        }
        else {
            setItem({title: "", author: "", publisher: "", userId: ""})
        }
    };

    const editEventHandler = () => {
        editItem(item);
    };

    return (
        <div className="UpdateBook">
            <Paper elevation={3} style={{ padding: 20, margin: 10 }}>
                <Grid container alignItems="center" spacing={2} style={{marginBottom: 10}}>
                    <Grid item xs={2}>
                        <div style={{ textAlign: 'right' }}>title:</div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="title"
                            fullWidth
                            onChange={onInputChange}
                            value={item.title}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            style={{ height: '100%', backgroundColor: '#FFA500', color: '#000000' }}
                            color="secondary"
                            variant="contained"
                            onClick={onButtonClick}
                        >
                        제품 검색
                        </Button>
                    </Grid>
                </Grid>
                <Grid container alignItems="center"  spacing={2} style={{marginBottom: 10}}>
                    <Grid item xs={2}>
                        <div style={{ textAlign: 'right' }}>author:</div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="author"
                            fullWidth
                            onChange={onInputChange}
                            value={item.author}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center"  spacing={2} style={{marginBottom: 10}}>
                    <Grid item xs={2}>
                        <div style={{ textAlign: 'right' }}>publisher:</div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="publisher"
                            fullWidth
                            onChange={onInputChange}
                            value={item.publisher}
                        />
                    </Grid>
                </Grid>
                <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={2}>
                        <div style={{ textAlign: 'right' }}>userId:</div>
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            name="userId"
                            fullWidth
                            onChange={onInputChange}
                            value={item.userId}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            style={{ height: '100%', backgroundColor: '#FFA500', color: '#000000' }}
                            variant="contained"
                            onClick={editEventHandler}
                        >
                            제품 수정
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default UpdateBook;