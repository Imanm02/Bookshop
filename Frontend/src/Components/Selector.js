import {FormControl, Icon, InputLabel, Select} from "@mui/material";
import {
    defaultSelectStyle,
    defaultSelectStyleDark, disableTextStyle, disableTextStyleDark,
    hoverSelectStyle,
    hoverSelectStyleDark,
    selectLabelStyle,
    selectLabelStyleDark, textFieldStyle, textFieldStyleDark, textStyle, textStyleDark
} from "./style";
import MenuItem from "@mui/material/MenuItem";
import React, {useEffect, useState} from "react";
import {get_user_id, useTheme} from "./ThemeContext";
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import axios from "axios";
import {BASE_URL} from "../index";
import {Grid} from "@material-ui/core";

export default function Selector( {type, change_handle, node_id} ) {
    const [id, setID] = useState(null);
    const [nodes, setNodes] = useState([]);
    const {darkMode} = useTheme();

    useEffect(() => {
        if (node_id) {
            setID(node_id);
            change_handle(node_id);
        }
        else
            axios.get(BASE_URL + 'nodes/' + (type==='Sensor'? 'SE/': 'AC/') + get_user_id() + '/')
                .then((response) => setNodes(response.data))
                .catch(error => console.log(error.status));
    }, []);

    function changeHandle(event) {
        setID(event.target.value);
        change_handle(event.target.value);
    }

    if (node_id)
        return (
            <FormControl sx={{width: '300px'}}>
                <InputLabel style={darkMode? textStyleDark: textStyle}>{type} ID</InputLabel>
                <Select
                    style={darkMode? disableTextStyleDark: disableTextStyle}
                    id={type + '_id'}
                    value={node_id}
                    variant='filled'
                    label={type + " ID"}
                    disabled>
                    <MenuItem value={node_id}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <DeviceHubIcon />
                            </Grid>
                            <Grid item>
                                {node_id}
                            </Grid>
                        </Grid>
                    </MenuItem>
                </Select>
            </FormControl>
        );

    return (
        <FormControl sx={{width: '300px'}}>
            <InputLabel style={darkMode? textStyleDark: textStyle}>
                {type} ID
            </InputLabel>
            <Select
                sx={{height: '57px'}}
                style={darkMode? textFieldStyleDark: textFieldStyle}
                id={type + '_id'}
                value={id}
                variant='filled'
                onChange={changeHandle}
                label={type + " ID"}>
                {nodes.map((item) =>
                    <MenuItem value={item['id']}>
                        <Grid container spacing={1}>
                            <Grid item>
                                <DeviceHubIcon />
                            </Grid>
                            <Grid item>
                                {item['id']} ({item['type']==='Actuator'? '': item['sensor_type'] + ' of '}Room {item['room']})
                            </Grid>
                        </Grid>
                    </MenuItem>)}
            </Select>
        </FormControl>
    );
}