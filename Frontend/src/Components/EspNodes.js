import React, {useEffect, useState} from "react";
import {Grid, Typography} from "@material-ui/core";
import EspCard from "./EspCard";
import axios from "axios";
import {BASE_URL} from "../index";
import {textStyle, textStyleDark} from "./style";
import {get_user_id, useTheme} from "./ThemeContext";
import {useParams} from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import {Image} from "@mui/icons-material";
import {CardMedia} from "@mui/material";

export default function EspNodes() {

    const {id} = useParams();
    const [info, setInfo] = useState({});

    useEffect(() => {
        axios.get(BASE_URL + 'book/' + id)
            .then(response => {
                setInfo(response.data);
            }).catch(error => console.log(error));
    }, []);

    function handleSubmit() {
        axios.post(BASE_URL + 'add_order', {'user_id': localStorage.getItem('user_id'), 'book_id': id})
            .then(response => console.log('good'))
            .catch(error => console.log(error.response));
    }

    return (
        <div style={{
            backgroundImage: 'url(../background.avif)',
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
                    <Box
                        component="img"
                        sx={{
                            width: 300,       // Adjust the width
                            height: 'auto',   // Maintain the aspect ratio
                            borderRadius: 8,  // Add some border radius
                            boxShadow: 3,     // Add a box shadow
                            margin: 'auto',   // Center the image horizontally
                            display: 'block', // Ensures the margin: auto works
                        }}
                        alt={info.name}
                        src={`../image${Math.floor(Math.random() * (5)) + 1}.jpg`}
                    />
                    <Typography component="h1" variant="h3" style={{ color: 'white' }}>
                        {info.name}
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography align={'right'} variant="body2" style={{ color: 'white' }}>
                                    نویسنده: {info.author}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align={'right'} variant="body2" style={{ color: 'white' }}>
                                    دسته‌بندی: {info.genre}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align={'right'} variant="body2" style={{ color: 'white' }}>
                                    قیمت: {info.price}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography align={'right'} variant="body2" style={{ color: 'white' }}>
                                    {info.description}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2} sx={{ mt: 3 }}>
                            <Grid item xs={12}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={handleSubmit}
                                >
                                    سفارش
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </div>
    );
}