import {get_user_id, useTheme} from "./ThemeContext";
import {useNavigate} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Button, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import axios from "axios";
import {BASE_URL} from "../index";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import Navbar from "./Navbar";

export default function ProfilePage() {
    const navigate = useNavigate();
    const [nameHover, setNameHover] = useState(false);
    const [passHover, setPassHover] = useState(false);
    const [emailHover, setEmailHover] = useState(false);
    const [confirmHover, setConfirmHover] = useState(false);
    const [sendHover, setSendHover] = useState(false);
    const [deleteHover, setDeleteHover] = useState(false);
    const [name, setName] = useState(null);
    const [pass, setPass] = useState(null);
    const [email, setEmail] = useState(null);
    const [verified, setVerified] = useState(false);
    const {darkMode} = useTheme();

    // useEffect(() => {
    //     if (!get_user_id()) navigate('/signIn');
    //     update_data();
    // }, []);


    function update_data() {
        axios.get(BASE_URL + 'user/' + get_user_id() + '/')
            .then(response => {
                setName(response.data['name']);
                setEmail(response.data['email']);
                setPass(response.data['password']);
                setVerified(response.data['verified']);
            })
            .catch(error => console.log(error.response.status));
    }

    function change_name() {
        const name = document.getElementById('username').value
        axios.post(BASE_URL + 'namechange/', {'user_id': get_user_id(), 'name': name})
            .then(response => update_data())
            .catch(error => console.log(error.response.status));
    }

    function change_email() {
        const email = document.getElementById('email').value
        axios.post(BASE_URL + 'emailchange/', {'user_id': get_user_id(), 'email': email})
            .then(response => update_data())
            .catch(error => console.log(error.response.status));
    }

    function confirm_verification() {
        const code = document.getElementById('verification_code').value;
        navigate('/verify?code=' + code);
    }

    function send_email() {
        axios.post(BASE_URL + 'sendmail/', {'user_id': get_user_id()})
            .then(response => console.log('yes!'))
            .catch(error => console.log(error.response.status));
    }

    function change_password() {
        const password = document.getElementById('password').value
        axios.post(BASE_URL + 'passchange/', {'user_id': get_user_id(), 'password': password})
            .then(response => update_data())
            .catch(error => console.log(error.response.status));
    }

    function delete_account() {
        axios.post(BASE_URL + 'delete/', {'user_id': get_user_id()})
            .then(response => {
                localStorage.setItem('token', '');
                navigate('/signIn');
            })
            .catch(error => console.log(error.response.status));
    }

    return (
        <div style={{
        backgroundImage: 'url(background.avif)',
        // backgroundColor: 'black',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh'
    }}>
            <Navbar />
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
                    ویرایش اطلاعات
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
                                id="email"
                                label="آدرس"
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
                                name="password"
                                label="کدپستی"
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
                                name="password"
                                label="شماره تلفن"
                                type="text"
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
                            >
                                ثبت اطلاعات
                            </Button>
                    </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    </div>
);
}