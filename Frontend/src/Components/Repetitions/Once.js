import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DateRangeIcon from '@mui/icons-material/DateRange';
import React from "react";
import {textStyle, textStyleDark} from "../style";
import {useTheme} from "../ThemeContext";

export default function Once( {item} ) {
    const {darkMode} = useTheme();

    return (
        <List>
            <ListItem style={darkMode? textStyleDark: textStyle}>
                <ListItemAvatar>
                    <RepeatIcon />
                </ListItemAvatar>
                <ListItemText primary={'Do It Just Once'} primaryTypographyProps={{ variant: 'caption' }} />
            </ListItem>
            <Divider />
            <ListItem style={darkMode? textStyleDark: textStyle}>
                <ListItemAvatar>
                    <DateRangeIcon />
                </ListItemAvatar>
                <ListItemText primary={'Occurrence Date: ' + item['year'] + '-' + (item['month']<10? '0' + item['month']: item['month'])
                + '-' + (item['day']<10? '0' + item['day']: item['day'])} primaryTypographyProps={{ variant: 'caption' }} />
            </ListItem>
            <Divider />
            <ListItem style={darkMode? textStyleDark: textStyle}>
                <ListItemAvatar>
                    <AccessTimeIcon />
                </ListItemAvatar>
                <ListItemText primary={'Execution Time: ' + item['exec_time']} primaryTypographyProps={{ variant: 'caption' }} />
            </ListItem>
        </List>
    );
}