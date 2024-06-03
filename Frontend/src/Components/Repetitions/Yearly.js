import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import RepeatIcon from "@mui/icons-material/Repeat";
import DateRangeIcon from "@mui/icons-material/DateRange";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import React from "react";
import {textStyle, textStyleDark} from "../style";
import {useTheme} from "../ThemeContext";

export default function Yearly( {item} ) {
    const {darkMode} = useTheme();

    const monthNames = {1: 'January',
                            2: 'February',
                            3: 'March',
                            4: 'April',
                            5: 'May',
                            6: 'June',
                            7: 'July',
                            8: 'August',
                            9: 'September',
                            10: 'October',
                            11: 'November',
                            12: 'December'};
    return (
        <List>
            <ListItem style={darkMode? textStyleDark: textStyle}>
                <ListItemAvatar>
                    <RepeatIcon />
                </ListItemAvatar>
                <ListItemText primary={'Do It Every Year'} primaryTypographyProps={{ variant: 'caption' }} />
            </ListItem>
            <Divider />
            <ListItem style={darkMode? textStyleDark: textStyle}>
                <ListItemAvatar>
                    <DateRangeIcon />
                </ListItemAvatar>
                <ListItemText primary={'Occurs ' + (item['day']<10? '0' + item['day']: item['day']) +
                    ((item['day']%10 > 3) || (Math.floor(item['day']/10) === 1)? 'th': (item['day']%10 === 1? 'st': (item['day']%10 === 2? 'nd': 'rd'))) +
                    ' Day of ' + monthNames[item['month']] + ' Each Year'} primaryTypographyProps={{ variant: 'caption' }} />
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