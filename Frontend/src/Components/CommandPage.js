import { Grid } from "@material-ui/core";
import React, {useEffect} from "react";
import Commander from "./Commander";
import Navbar from "./Navbar";
import {get_user_id, useTheme} from "./ThemeContext";
import {useNavigate} from "react-router-dom";

export default function CommandPage() {
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
                <Commander />
            </Grid>
        </Grid>
    );
}