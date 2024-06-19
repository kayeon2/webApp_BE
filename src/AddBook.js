import React, {useState} from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";

const AddBook = (props) => {
    // 사용자의 입력을 저장할 오브젝트
    const [item, setItem] = useState({title: "", author: "", publisher: "", userId: ""});
    const addItem = props.addItem;

    // onInputChange 함수 작성
    const onInputChange = (e) => {
        const {name, value} = e.target;
        setItem(prevItem => ({...prevItem, [name]: value}));
        // console.log(item);
    };

    // onButtonClick 함수 작성
    const onButtonClick = () => {
        addItem(item);
        setItem({title: "", author: "", publisher: "", userId: ""});
    }

    return (
        <div className="AddBook">
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
                </Grid>
                <Grid container alignItems="center" spacing={2} style={{marginBottom: 10}}>
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
                <Grid container alignItems="center" spacing={2} style={{marginBottom: 10}}>
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
                            style={{ height: '100%', backgroundColor: '#FFFF99', color: '#000000' }}
                            variant="contained"
                            onClick={onButtonClick}
                        >
                            제품 추가
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default AddBook;