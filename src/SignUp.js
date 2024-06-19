import React from "react";
import { Container, Grid, Typography, TextField, Button } from "@mui/material";
import { signup } from "./ApiService";
import { Link } from "react-router-dom";
import BookStoreLogo from "./BookStoreLogo.jpg";

function SignUp() {
    const handleSubmit = (event) => {
        event.preventDefault();
        // 오브젝트에서 form에 저장된 데이터를 맵의 형태로 바꿔줌.
        const data = new FormData(event.target);
        const username = data.get("username");
        const password = data.get("password");
        signup({ username: username, password: password }).then(
        (response) => {
            // 계정 생성 성공 시 login페이지로 리디렉트
            window.location.href = "/login";
        }
        );
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
            <form noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2} paddingTop={3} paddingBottom={2}>
                    <Grid item xs={12}>
                        <Typography component="h1" align="center" variant="h5">
                            Register
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                        autoComplete="fname"
                        name="username"
                        variant="outlined"
                        required
                        fullWidth
                        id="username"
                        label="아이디"
                        autoFocus
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
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: 'black', color: 'white' }}
                        >
                        계정 생성
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" color="textSecondary" align="center" style={{ fontSize: '0.8rem'}}>
                            이미 회원이신가요?
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            style={{ backgroundColor: 'black', color: 'white' }}
                            component={Link}
                            to="/login"
                        >
                            로그인
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    );
};

export default SignUp;
