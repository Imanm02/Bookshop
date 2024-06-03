import {
    textStyle,
    textStyleDark
} from "./style";
import {Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {get_user_id, useTheme} from "./ThemeContext";
import axios from "axios";
import {BASE_URL} from "../index";

export default function Reporter( {id, small} ) {
    const [data, setData] = useState({'type': ''});
    const [vals, setVals] = useState([]);
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());
    const {darkMode} = useTheme();

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get(BASE_URL + 'report/updateData/' + id + '/' + get_user_id() + '/')
                .then(response => {
                    setData(response.data);
                }).catch(error => console.log(error.response.status));
        }, 1000);
        return () => clearInterval(interval);
    }, [id]);


    return (
        <Grid container spacing={small? 2: 6} justifyContent='center'>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>{data['type']}: {data[data['type'].toLowerCase()]}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={small? 2: 6} justifyContent='center'>
                </Grid>
            </Grid>
        </Grid>
        );
}