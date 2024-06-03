import {Grid, InputAdornment, TextField} from "@material-ui/core";
import AssignmentIcon from "@mui/icons-material/Assignment";
import {textFieldStyle, textFieldStyleDark, textStyle, textStyleDark} from "./style";
import React from "react";
import {useTheme} from "./ThemeContext";

export default function TaskName( {type} ) {
    const {darkMode } = useTheme();

    if (type!=='Task') return;
    return (
        <Grid item>
            <TextField id="task_name" label="Task Name" InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <AssignmentIcon />
                    </InputAdornment>
                ),
                style: darkMode? textFieldStyleDark: textFieldStyle
            }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}} variant="filled"/>
        </Grid>
    );
}