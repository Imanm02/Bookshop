import React, {useEffect, useState} from 'react';
import {Grid, Typography} from "@material-ui/core";
import Navbar from "./Navbar";
import {textStyle, textStyleDark} from "./style";
import {get_user_id, useTheme} from "./ThemeContext";
import Selector from "./Selector";
import Reporter from "./Reporter";
import axios from "axios";
import {BASE_URL} from "../index";
import {useNavigate} from "react-router-dom";

export default function ReportPage () {
    const [nodeId, setNodeId] = useState(null);
    const {darkMode} = useTheme();
    const navigate = useNavigate();

    useEffect(() => {
        if (!get_user_id()) navigate('/signIn');
    }, []);

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Selector type='Sensor' change_handle={(val) => setNodeId(val)} />
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>NODE ID: {nodeId}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Reporter id={nodeId} small={false} />
                </Grid>
            </Grid>
        </Grid>
    );
};