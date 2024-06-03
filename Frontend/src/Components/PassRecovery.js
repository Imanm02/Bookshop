import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import axios from "axios";
import { BASE_URL } from '../index';
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {get_user_id} from "./ThemeContext";
import RestartAltIcon from '@mui/icons-material/RestartAlt';
export default function PassRecovery() {
    const navigate = useNavigate();

    useEffect(() => {
        if (get_user_id()) navigate('/');
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = new FormData(event.currentTarget);
        const data = {'email': form.get('email')};
        axios.post(BASE_URL + 'passRec/', data)
            .then(response => {
                if (response.status === 200) navigate('/SignIn');
            })
            .catch(error => console.log('noooo!'));
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
                                    label="شماره تلفن"
                                    name="email"
                                    type="email"
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Link href="/pass">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                    >
                                        ارسال رمز یکبار مصرف
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                </Box>
            </Container>
        </div>
    );
}
