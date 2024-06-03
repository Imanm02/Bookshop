import {Grid, InputAdornment, TextField} from "@material-ui/core";
import WbTwilightIcon from '@mui/icons-material/WbTwilight';
import TimerIcon from "@mui/icons-material/Timer";
import React, {useState} from "react";
import {
    textFieldStyle,
    textFieldStyleDark,
    textStyle,
    textStyleDark
} from "./style";
import {useTheme} from "./ThemeContext";
import TaskName from "./TaskName";
import Selector from "./Selector";


export default function CommandForm( {id, type, change_handle, selector_handle} ) {
    const {darkMode } = useTheme();


    return (<Grid container spacing={id? 2: 6} justifyContent='center'>
            <TaskName type={type} />
        {type==='Condition'?
            <Grid item>
                <Selector type='Sensor' change_handle={selector_handle} node_id={id} />
            </Grid>: ''}
        <Grid item>
            <Selector type='Actuator' change_handle={(val) => change_handle(val)} node_id={id} />
        </Grid>
        <Grid item>
            <TextField id="blink_count" label="Blink Count" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <WbTwilightIcon />
                    </InputAdornment>
                ),
                style: darkMode? textFieldStyleDark: textFieldStyle
            }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                       variant="filled" required/>
        </Grid>
        <Grid item>
            <TextField id="blink_length" label="Blink Length (in Milliseconds)" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <TimerIcon />
                    </InputAdornment>
                ),
                style: darkMode? textFieldStyleDark: textFieldStyle
            }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                       variant="filled" required/>
        </Grid>
    </Grid>);
}