import React, {useState} from "react";
import { Button, Grid, TextField, Paper } from "@mui/material";

const RetrieveBook = (props) => {
    const [item, setItem] = useState({title: "", author: "", publisher: "", userId: ""});
    const { retrieveItem } = props;

    // title 값으로 제품 검색
    const onInputChange = (e) => {
        setItem({...item, title: e.target.value});
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

    return (
        <div className="RetrieveBook">
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
                            value={item.userId}
                        />
                    </Grid>
                    <Grid item xs={4}>
                        <Button
                            fullWidth
                            style={{ height: '100%', backgroundColor: '#FFA500', color: '#000000' }}
                            variant="contained"
                            onClick={onButtonClick}
                        >
                            제품 검색
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}

export default RetrieveBook;
