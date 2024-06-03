import {Divider, List, ListItem, ListItemAvatar, ListItemText} from "@mui/material";
import RepeatIcon from '@mui/icons-material/Repeat';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import React from "react";
import {textStyle, textStyleDark} from "../style";
import {useTheme} from "../ThemeContext";

export default function Daily( {item} ) {
    const {darkMode} = useTheme();

    return (
        <List>
            <ListItem style={darkMode? textStyleDark: textStyle}>
                <ListItemAvatar>
                    <RepeatIcon />
                </ListItemAvatar>
                <ListItemText primary={'Do It Every Day'} primaryTypographyProps={{ variant: 'caption' }} />
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