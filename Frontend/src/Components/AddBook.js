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
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Navbar from "./Navbar";
export default function AddBook() {
    const navigate = useNavigate();

    function handleClick() {
        axios.post(BASE_URL + 'manage/add_book', {'name': document.getElementById('name').value,
                                                            'author': document.getElementById('author').value,
                                                            'price': parseInt(document.getElementById('price').value),
                                                            'description': document.getElementById('description').value,
                                                            'genre': document.getElementById('genre').value})
            .then(response => console.log('book added!')).catch(error => console.log(error.response))
    }

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
                        <BookmarkAddIcon />
                    </Avatar>
                    <Typography component="h1" variant="h3" style={{ color: 'white' }}>
                        افزودن کتاب
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
                                    id="name"
                                    label="نام کتاب"
                                    name="name"
                                    type="text"
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
                                    name="author"
                                    label="نویسنده"
                                    type="text"
                                    id="author"
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
                                    name="genre"
                                    label="دسته‌بندی"
                                    type="text"
                                    id="genre"
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
                                    name="price"
                                    label="قیمت"
                                    type="text"
                                    id="price"
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
                                    name="description"
                                    label="توضیحات"
                                    type="text"
                                    id="description"
                                    variant="filled"
                                />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={12}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        onClick={handleClick}
                                    >
                                        ثبت کتاب
                                    </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}
