import Typography from "@mui/material/Typography";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {BASE_URL} from "../index";
import {Grid} from "@material-ui/core";
import Navbar from "./Navbar";
import {textStyle, textStyleDark} from "./style";
import {useTheme} from "./ThemeContext";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import * as React from "react";
import {LockOpen} from "@mui/icons-material";
import SmsIcon from '@mui/icons-material/Sms';
export default function VerificationPage() {
    const location = useLocation();
    const [success, setSuccess] = useState(false);
    const queryParams = new URLSearchParams(location.search);
    const code = parseInt(queryParams.get('code'));
    const {darkMode} = useTheme();

    useEffect(() => {
        if (code)
            axios.post(BASE_URL + 'verify/', {'code': code})
                .then(response => setSuccess(true))
                .catch(error => setSuccess(false));
        else setSuccess(false);
    }, []);

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
                        <SmsIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" style={{ color: 'white', fontFamily: 'Vazirmatn' }}>
                        فعال‌سازی حساب
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={4}>
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
                                    name="password confirmation"
                                    label="کد تایید پیامک شده"
                                    type="text"
                                    id="password_confirmation"
                                    variant="filled"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/verify">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                    >
                                        تکمیل ثبت نام
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item xs={6}>
                                <Link href="/signUp">
                                    <Button
                                        fullWidth
                                        variant="contained"
                                    >
                                        ویرایش شماره تلفن
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