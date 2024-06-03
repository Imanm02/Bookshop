import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {BASE_URL} from "../index";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {get_user_id} from "./ThemeContext";
import Container from "@mui/material/Container";
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
export default function SignInSide() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        axios.post(BASE_URL + 'login', {'username': document.getElementById('username').value, 'password': document.getElementById('password').value})
            .then(response => {
                localStorage.setItem('user_token', response.data['token']);
                localStorage.setItem('user_id', response.data['user_id']);
                console.log(response.data);
                navigate('/');
            })
            .catch(error => console.log(error.response));
    };

    return (
        <div style={{
            backgroundImage: 'url(background.avif)',
            // backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
        }}>
            <Container component="main" maxWidth="xs">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <PermIdentityIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" style={{ color: 'white' }}>
                        ورود
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    style={{ backgroundColor: 'gray' }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                    InputProps={{
                                        style: { color: 'white' },
                                    }}
                                    required
                                    fullWidth
                                    id="username"
                                    label="نام کاربری"
                                    name="username"
                                    type="email"
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    style={{ backgroundColor: 'gray' }}
                                    InputLabelProps={{
                                        style: { color: 'white' },
                                    }}
                                    InputProps={{
                                        style: { color: 'white' },
                                    }}
                                    required
                                    fullWidth
                                    name="password"
                                    label="رمز عبور"
                                    type="password"
                                    id="password"
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    ورود
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/passRec">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                    >
                                        رمزم رو فراموش کردم
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/signUp">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                    >
                                        حساب ندارید؟ ثبت نام کنید
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
