import CommandForm from "./CommandForm";
import {Grid, InputAdornment, TextField} from "@material-ui/core";
import React, {useState} from "react";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import EventRepeatIcon from '@mui/icons-material/EventRepeat';
import {
    defaultSelectStyle, defaultSelectStyleDark,
    disableSelectStyle, disableSelectStyleDark, disableTextStyle, disableTextStyleDark,
    hoverSelectStyle, hoverSelectStyleDark, selectLabelStyle, selectLabelStyleDark, textFieldStyle, textFieldStyleDark,
    textStyle, textStyleDark
} from "./style";
import {useTheme} from "./ThemeContext";


export default function ScheduleForm( {repeatChange, weekdayChange, nodeChange, monthChange} ) {
    const [repeat, setRepeat] = useState(null);
    const [weekday, setWeekday] = useState(null);
    const [month, setMonth] = useState(null);
    const [hover, setHover] = useState(false);
    const {darkMode} = useTheme();

    function weekdayHandle(event) {
        setWeekday(event.target.value);
        weekdayChange(event.target.value);
    }

    function repeatHandle(event) {
        setRepeat(event.target.value);
        repeatChange(event.target.value);
    }

    function monthHandle(event) {
        setMonth(event.target.value);
        monthChange(event.target.value);

    }

    function nodeHandle(val) {
        nodeChange(val);
    }

    return (
        <Grid container spacing={6}>
            <Grid item  xs={12}>
                <CommandForm type={'Task'} change_handle={nodeHandle} />
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={6} justifyContent='center'>
                    <Grid item>
                        <TextField id="year" label="Year" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventRepeatIcon />
                                </InputAdornment>
                            ),
                            style: (repeat==='just-once')? (darkMode? textFieldStyleDark: textFieldStyle): (darkMode? disableTextStyleDark: disableTextStyle)
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                                   variant="filled" disabled={repeat!=='just-once'}/>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{width: '300px'}}>
                            <InputLabel style={darkMode? textStyleDark: textStyle}>Month</InputLabel>
                            <Select
                                style={(repeat!=='just-once' && repeat!=='every-year')?
                                    (darkMode? disableTextStyleDark: disableTextStyle):
                                    (darkMode? textFieldStyleDark: textFieldStyle)}
                                id='month'
                                variant='filled'
                                disabled={repeat!=='just-once' && repeat!=='every-year'}
                                value={month}
                                onChange={monthHandle}
                                label="Month"
                            >
                                <MenuItem value={1}>January</MenuItem>
                                <MenuItem value={2}>February</MenuItem>
                                <MenuItem value={3}>March</MenuItem>
                                <MenuItem value={4}>April</MenuItem>
                                <MenuItem value={5}>May</MenuItem>
                                <MenuItem value={6}>June</MenuItem>
                                <MenuItem value={7}>July</MenuItem>
                                <MenuItem value={8}>August</MenuItem>
                                <MenuItem value={9}>September</MenuItem>
                                <MenuItem value={10}>October</MenuItem>
                                <MenuItem value={11}>November</MenuItem>
                                <MenuItem value={12}>December</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item>
                        <TextField id="day" label="Day" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventRepeatIcon />
                                </InputAdornment>
                            ),
                            style: (repeat==='every-day' || repeat==='every-week')?
                                (darkMode? disableTextStyleDark: disableTextStyle): (darkMode? textFieldStyleDark: textFieldStyle)
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                                   variant="filled" disabled={repeat==='every-day' || repeat==='every-week'}/>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{width: '300px'}}>
                            <InputLabel style={darkMode? textStyleDark: textStyle}>Weekly</InputLabel>
                            <Select
                                style={(repeat==='every-week')?
                                    (darkMode? textFieldStyleDark: textFieldStyle):
                                    (darkMode? disableTextStyleDark: disableTextStyle)}
                                id='weekday'
                                variant='filled'
                                disabled={repeat!=='every-week'}
                                value={weekday}
                                onChange={weekdayHandle}
                                label="Weekly"
                            >
                                <MenuItem value="saturday">Saturday</MenuItem>
                                <MenuItem value="sunday">Sunday</MenuItem>
                                <MenuItem value="monday">Monday</MenuItem>
                                <MenuItem value="tuesday">Tuesday</MenuItem>
                                <MenuItem value="wednesday">Wednesday</MenuItem>
                                <MenuItem value="thursday">Thursday</MenuItem>
                                <MenuItem value="friday">Friday</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={6} justifyContent='center'>
                    <Grid item>
                        <TextField id="hour" label="Hour" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventRepeatIcon />
                                </InputAdornment>
                            ),
                            style: darkMode? textFieldStyleDark: textFieldStyle
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}} variant="filled"/>
                    </Grid>
                    <Grid item>
                        <TextField id="minute" label="Minute" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventRepeatIcon />
                                </InputAdornment>
                            ),
                            style: darkMode? textFieldStyleDark: textFieldStyle
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}} variant="filled"/>
                    </Grid>
                    <Grid item>
                        <TextField id="second" label="Second" InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <EventRepeatIcon />
                                </InputAdornment>
                            ),
                            style: darkMode? textFieldStyleDark: textFieldStyle
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}} variant="filled"/>
                    </Grid>
                    <Grid item>
                        <FormControl sx={{width: '300px'}}>
                            <InputLabel style={darkMode? selectLabelStyleDark: selectLabelStyle}>Repeat</InputLabel>
                            <Select
                                style={hover? (darkMode? hoverSelectStyleDark: hoverSelectStyle): (darkMode? defaultSelectStyleDark: defaultSelectStyle)}
                                onMouseEnter={() => setHover(true)}
                                onMouseLeave={() => setHover(false)}
                                onFocus={() => setHover(true)}
                                onBlur={() => setHover(false)}
                                id='repeat'
                                value={repeat}
                                variant='filled'
                                onChange={repeatHandle}
                                label="Repeat"
                            >
                                <MenuItem value="just-once">Just Once</MenuItem>
                                <MenuItem value="every-day">Every Day</MenuItem>
                                <MenuItem value="every-week">Every Week</MenuItem>
                                <MenuItem value="every-month">Every Month</MenuItem>
                                <MenuItem value="every-year">Every Year</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}