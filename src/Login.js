import React from "react";
import { Container, Grid, Typography, TextField, Button} from "@mui/material";
import { Link } from "react-router-dom";
import { signin } from "./ApiService";
import BookStoreLogo from "./BookStoreLogo.jpg";

function Login() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        // ApiService의 signin 메서드를 사용 해 로그인.
        signin({ username: username, password: password });
    };

    return (
        <Container component="main" maxWidth="xs" style={{ marginTop: "8%" }}>
            <Grid item xs={12} style={{ backgroundColor: 'black', textAlign: 'center', padding: '10px', borderRadius: '5px' }}>
                <img 
                    src={BookStoreLogo} 
                    alt="Book Store Logo" 
                    style={{ maxWidth: '40%', height: 'auto'}} 
                />
            </Grid>
            <Grid container spacing={2} paddingTop={3} paddingBottom={2}>
                <Grid item xs={12}>
                    <Typography component="h1" align="center" variant="h5">
                        Login
                    </Typography>
                </Grid>
            </Grid>
            <form noValidate onSubmit={handleSubmit}>
                {" "}
                {/* submit 버튼을 누르면 handleSubmit이 실행됨. */}
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="아이디"
                        name="username"
                        autoComplete="username"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="패스워드"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" fullWidth variant="contained" style={{ backgroundColor: 'black', color: 'white' }}>
                        로그인
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '0.8rem'}}>
                            아직 회원이 아니신가요?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: 'black', color: 'white' }}
                            component={Link}
                            to="/signup"
                        >
                            회원가입
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
}

export default Login;
