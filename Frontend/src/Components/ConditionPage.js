import AddTaskIcon from '@mui/icons-material/AddTask';
import {Button, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import Navbar from "./Navbar";
import ScheduleForm from "./ScheduleForm";
import {
    defaultButtonStyle,
    defaultButtonStyleDark, defaultSelectStyle, defaultSelectStyleDark,
    disableTextStyle,
    disableTextStyleDark,
    hoverButtonStyle,
    hoverButtonStyleDark, hoverSelectStyle,
    hoverSelectStyleDark,
    selectLabelStyle,
    selectLabelStyleDark,
    textFieldStyle,
    textFieldStyleDark,
    textStyle,
    textStyleDark
} from "./style";
import Tasks from "./Repetitions/Tasks";
import React, {useEffect, useState} from "react";
import {get_user_id, useTheme} from "./ThemeContext";
import CommandForm from "./CommandForm";
import EventRepeatIcon from "@mui/icons-material/EventRepeat";
import {FormControl, InputLabel, Select} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {BASE_URL} from "../index";
import axios from "axios";
import Conditions from "./Conditions";
import NumbersIcon from '@mui/icons-material/Numbers';
import {useNavigate} from "react-router-dom";


export default function ConditionPage() {
    const [sensor, setSensor] = useState(null);
    const [actuator, setActuator] = useState(null);
    const [hover, setHover] = useState(false);
    const [hoverSelect, setHoverSelect] = useState(false);
    const [condition, setCondition] = useState(null);
    const [conditions, setConditions] = useState([]);
    const [error, setError] = useState('');
    const {darkMode} = useTheme();
    const navigate = useNavigate();



    useEffect(() => {
        if (!get_user_id()) navigate('/signIn');
        updateList();
    }, []);

    function deleteTask(item) {
        axios.post(BASE_URL + 'command/sendData/' + get_user_id() + '/',
            {'data': item, 'type': 'remove_condition', 'node_id': item['actuator']})
            .then(response => updateList())
            .catch(error => console.log(error.response.status));
    }

    function updateList() {
        axios.get(BASE_URL + 'tasks/cond/' + get_user_id() + '/')
            .then((response) => setConditions(response.data))
            .catch(error => console.log(error.response.status));
    }

    function handle_click() {
        const blink_count = parseInt(document.getElementById('blink_count').value);
        const blink_length = parseInt(document.getElementById('blink_length').value);
        const value1 = parseFloat(document.getElementById('first_value').value);
        const value2 = document.getElementById('second_value')?
                                  parseFloat(document.getElementById('second_value').value): null;
        const data = {'sensor': sensor, 'node_id': actuator, 'blink_count': blink_count,
                          'blink_length': blink_length, 'value1': value1, 'value2': value2,
                          'condition': condition, 'type': 'conditional'};
        function is_data_valid() {
            function isNumeric(str) {
                return !isNaN(str) && !isNaN(parseInt(str, 10));
            }
            if (!isNumeric(blink_count) || !isNumeric(blink_length)) {
                setError('Blink fields should have integer values!');
                return false;
            }
            if (blink_count <= 0 || blink_length <= 0) {
                setError('Blink fields should be positive!');
                return false;
            }
            if (isNaN(value1) || (condition==='between-these' && isNaN(value2))) {
                setError('You should fill values with numerical data!');
                return false;
            }
            if (condition==='between-these' && value1 > value2) {
                setError('First value should be less than or equal to Second value!');
                return false;
            }
            return true;
        }
        if (is_data_valid())
            axios.post(BASE_URL + 'command/sendData/' + get_user_id() + '/', data)
                .then(response => {
                    setError('Condition has successfully added!');
                    updateList();
                })
                .catch(error => {
                    if (error.response.status===400) setError('You can\'t add conditions on actuators or add tasks to sensors!');
                    if (error.response.status===404) setError('Mentioned node is not found in the database!');
                    if (error.response.status===403) setError('The sensor node and actuator node should be relevant (have the same room and type)');
                });
    }

    return (
        <Grid container spacing={4}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <CommandForm type={'Condition'} change_handle={(val) => setActuator(val)} selector_handle={(val) => setSensor(val)} />
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <FormControl sx={{width: '300px'}}>
                        <InputLabel style={darkMode? selectLabelStyleDark: selectLabelStyle}>Condition</InputLabel>
                        <Select
                            style={hoverSelect? (darkMode? hoverSelectStyleDark: hoverSelectStyle): (darkMode? defaultSelectStyleDark: defaultSelectStyle)}
                            onMouseEnter={() => setHoverSelect(true)}
                            onMouseLeave={() => setHoverSelect(false)}
                            onFocus={() => setHoverSelect(true)}
                            onBlur={() => setHoverSelect(false)}
                            id='condition'
                            value={condition}
                            variant='filled'
                            onChange={(event) => setCondition(event.target.value)}
                            label="Condition"
                        >
                            <MenuItem value="less-than">Less Than</MenuItem>
                            <MenuItem value="between-these">Between</MenuItem>
                            <MenuItem value="greater-than">Greater Than</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container spacing={6} justifyContent='center'>
                    <Grid item>
                        <TextField id="first_value" label={condition==='between-these'? 'From': 'Value'} InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <NumbersIcon />
                                </InputAdornment>
                            ),
                            style: (darkMode? textFieldStyleDark: textFieldStyle)
                        }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                                   variant="filled"/>
                    </Grid>
                    {condition==='between-these'?
                        <Grid item>
                            <TextField id="second_value" label='To' InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <NumbersIcon />
                                    </InputAdornment>
                                ),
                                style: (darkMode? textFieldStyleDark: textFieldStyle)
                            }} InputLabelProps={{style: darkMode? textStyleDark: textStyle}}
                                       variant="filled"/>
                        </Grid> : ''}
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Button style={hover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)}
                            onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                            variant="contained" endIcon={<AddTaskIcon />} onClick={handle_click}>
                        Add Condition
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>{error}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography style={darkMode? textStyleDark: textStyle}>Current Conditions:</Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Conditions conditions={conditions} delete_function={deleteTask} />
            </Grid>
        </Grid>
    );
}