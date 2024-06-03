import {Grid, Typography} from "@material-ui/core";
import React from "react";
import Weekly from "./Repetitions/Weekly";
import Once from "./Repetitions/Once";
import Daily from "./Repetitions/Daily";
import Monthly from "./Repetitions/Monthly";
import Yearly from "./Repetitions/Yearly";
import {textStyle, textStyleDark} from "./style";
import {useTheme} from "./ThemeContext";

export default function RepeatDate( {item} ) {
    const {darkMode} = useTheme();

    function GetCorrectDate() {
        if (item['repetition'] === 'JO') return <Once item={item} />;
        if (item['repetition'] === 'ED') return <Daily item={item} />;
        if (item['repetition'] === 'EW') return <Weekly item={item} />;
        if (item['repetition'] === 'EM') return <Monthly item={item} />;
        return <Yearly item={item} />;
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>Date & Time</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <GetCorrectDate />
            </Grid>
        </Grid>
    );
}