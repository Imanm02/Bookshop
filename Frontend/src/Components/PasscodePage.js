import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {BASE_URL} from "../index";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {Container} from "@mui/material";
import {get_user_id} from "./ThemeContext";
import Navbar from "./Navbar";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import Link from "@mui/material/Link";

export default function PasscodePage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [failed, setFailed] = useState(true);
    const [userId, setUserId] = useState(null);
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');


    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        if (form.get('new_password') !== form.get('confirm_password')) console.log('oops!');
        else {
            const data = {'user_id': userId, 'password': form.get('new_password')};
            axios.post(BASE_URL + 'passchange/', data)
                .then(response => {
                    navigate('/');
                })
                .catch(error => console.log('nooo!'));
        }
    };

    return (
        <div style={{
            backgroundImage: 'url(background.avif)',
            // backgroundColor: 'black',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100vw',
            height: '100vh'
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
                        <RestartAltIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" style={{ color: 'white' }}>
                        بازیابی رمز عبور
                    </Typography>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
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
                                    id="email"
                                    label="رمز عبور جدید"
                                    name="email"
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
                                    id="email"
                                    label="تکرار رمز عبور جدید"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                />
                            </Grid>
                        <Grid item xs={12}>
                            <Link href="/signIn">
                                <Button
                                    fullWidth
                                    variant="contained"
                                >
                                    تغییر رمز عبور
                                </Button>
                            </Link>
                        </Grid>
                        </Grid>
                </Box>
            </Container>
        </div>
    );
}
