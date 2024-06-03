import Navbar from "./Navbar";
import ScheduleForm from "./ScheduleForm";
import {Button, Grid, InputAdornment, TextField, Typography} from "@material-ui/core";
import React, {useEffect, useRef, useState} from "react";
import {BASE_URL} from "../index";
import axios from "axios";
import {
    defaultButtonStyle, defaultButtonStyleDark,
    hoverButtonStyle, hoverButtonStyleDark,
    textFieldStyle, textFieldStyleDark,
    textStyle, textStyleDark
} from "./style";
import AlarmAddIcon from '@mui/icons-material/AlarmAdd';
import Tasks from './Repetitions/Tasks';
import {get_user_id, useTheme} from "./ThemeContext";
import {useNavigate} from "react-router-dom";

export default function SchedulePage() {
    const [hover, setHover] = useState(false);
    const [repeatVal, setRepeatVal] = useState(null);
    const [weekdayVal, setWeekdayVal] = useState(null);
    const [monthVal, setMonthVal] = useState(null);
    const [nodeId, setNodeID] = useState(null);
    const [tasks, setTasks] = useState([]);
    const [error, setError] = useState('');
    const {darkMode} = useTheme();
    const navigate = useNavigate();


    useEffect(() => {
        if (!get_user_id()) navigate('/signIn');
        updateList();
    }, []);

    function deleteTask(item) {
        axios.post(BASE_URL + 'command/sendData/' + get_user_id() + '/',
            {'data': item, 'type': 'delete_task', 'node_id': item['node']})
            .then(response => updateList())
            .catch(error => console.log(error.response.status));
    }

    function updateList() {
        axios.get(BASE_URL + 'tasks/' + get_user_id() + '/')
            .then((response) => setTasks(response.data))
            .catch(error => console.log(error.response.status));
    }

    function handle_click() {
        const name = document.getElementById('task_name').value;
        const blink_count = parseInt(document.getElementById('blink_count').value);
        const blink_length = parseInt(document.getElementById('blink_length').value);
        const year = parseInt(document.getElementById('year').value);
        const day = parseInt(document.getElementById('day').value);
        const hour = parseInt(document.getElementById('hour').value);
        const minute = parseInt(document.getElementById('minute').value);
        const second = parseInt(document.getElementById('second').value);
        const data = {"node_id": nodeId, "blink_count": blink_count, "blink_length": blink_length,
                           "year": year, "month": monthVal, "day": day, "weekday": weekdayVal, "hour": hour, "minute": minute,
                           "second": second, "repeat": repeatVal, "task_name": name, "type": "add_task"};
        function is_data_valid() {
            function isNumeric(str) {
                return !isNaN(str) && !isNaN(parseInt(str, 10));
            }
            if (!isNumeric(blink_count) || !isNumeric(blink_length) ||
                !isNumeric(hour) || !isNumeric(minute) || !isNumeric(second)) {
                setError('All fields should have integer values!');
                return false;
            }
            if ((year && !isNumeric(year)) || (day && !isNumeric(day))) {
                setError('All fields should have integer values!');
                return false;
            }
            if (blink_length <= 0 || blink_count <= 0) {
                setError('Blink fields should be positive!');
                return false;
            }
            if ((repeatVal==='every-month' || repeatVal==='every-year') && !day) {
                setError('Day field cannot be blank!');
                return false;
            }
            if (repeatVal==='just-once' && !year) {
                setError('Year field cannot be blank!');
                return false;
            }
            if (repeatVal==='every-week' && !weekdayVal) {
                setError('Choose a day of the week to repeat the task!');
                return false;
            }
            if ((repeatVal==='just-once' || repeatVal==='every-year') && !monthVal) {
                setError('You should choose a month!');
                return false;
            }
            if (!(0 <= hour && hour <= 23 && 0 <= minute && minute <= 59 && 0 <= second && second <= 59 &&
                (!day || (1 <= day && day <= 31)) && (!year || (0 < year)))) {
                setError('Date & Time values are invalid! ');
                return false;
            }
            return true;}
        if (is_data_valid())
            axios.post(BASE_URL + 'command/sendData/' + get_user_id() + '/', data)
                .then((response) => {
                    updateList();
                    setError('Task added successfully!')})
                .catch(error => {
                    if (error.response.status===400) setError('You can\'t schedule a task for a sensor node!');
                    if (error.response.status===404) setError('Mentioned node is not found in the database!');
                });
    }

    return (
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Navbar />
                </Grid>
                <Grid item xs={12}>
                    <ScheduleForm nodeChange={(val) => setNodeID(val)} monthChange={(val) => setMonthVal(val)}
                        weekdayChange={(val) => setWeekdayVal(val)} repeatChange={(val) => setRepeatVal(val)}/>
                </Grid>
                <Grid item xs={12}>
                    <Grid container justifyContent='center'>
                        <Button style={hover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)}
                                onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
                                variant="contained" endIcon={<AlarmAddIcon />} onClick={handle_click}>
                            Add Task
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
                        <Typography style={darkMode? textStyleDark: textStyle}>Current Tasks:</Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Tasks tasks={tasks} delete_function={deleteTask} />
                </Grid>
            </Grid>
    );
}