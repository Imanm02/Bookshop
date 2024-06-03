import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import axios from "axios";
import { BASE_URL } from '../index';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {get_user_id} from "./ThemeContext";
import {textStyleDark} from "./style";
export default function SignUp() {
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        axios.post(BASE_URL + 'signup', {'username': document.getElementById('username').value,
                                                   'password': document.getElementById('password').value,
                                                   'phone': document.getElementById('phone').value})
            .then(response => navigate('/verify'))
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
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" style={{ color: 'white' }}>
                        ثبت نام
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
                                    name="phone"
                                    label="شماره تلفن"
                                    type="text"
                                    id="phone"
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={6}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleSubmit}
                                    >
                                        ارسال کد تایید
                                    </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/signIn">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                    >
                                        قبلا ثبت نام کرده‌اید؟ وارد شوید
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
