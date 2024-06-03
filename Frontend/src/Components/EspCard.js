import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardActionArea,
    CardContent,
    CardMedia
} from "@mui/material";
import {cardStyle, cardStyleDark, textStyle, textStyleDark} from "./style";
import {Button, Grid, Typography} from "@material-ui/core";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useTheme} from "./ThemeContext";
import Commander from "./Commander";
import axios from "axios";
import {BASE_URL} from "../index";
import Reporter from "./Reporter";

export default function EspCard( {title, author, genre, price, description, id} ) {
    const navigate = useNavigate();
    const {darkMode} = useTheme();

    return (
        <Card sx={{ maxWidth: 250, height: 500 }} onClick={event => navigate('/book/' + id)}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="200"
                    image={`image${Math.floor(Math.random() * (5)) + 1}.jpg`}
                    alt={title}
                />
                <CardContent>
                    <Grid container justifyContent={'right'} alignItems={'right'}>
                        <Grid item xs={12}>
                            <Typography align={'right'} gutterBottom variant="h5">
                                {title}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'right'} variant="body2" color="text.secondary">
                                نویسنده: {author}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'right'} variant="body2" color="text.secondary">
                                دسته‌بندی: {genre}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'right'} variant="body2" color="text.secondary">
                                قیمت: {price}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography align={'right'} variant="body2" color="text.secondary">
                                {description}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}