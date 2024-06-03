import {Button, Grid, Typography} from "@material-ui/core";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Card,
    CardContent, Divider,
    List,
    ListItem,
    ListItemAvatar, ListItemText
} from "@mui/material";
import {
    cardStyle,
    cardStyleDark,
    deleteButtonStyle,
    deleteButtonStyleDark,
    hoverDeleteButtonStyle, hoverDeleteButtonStyleDark,
    textStyle,
    textStyleDark
} from "./style";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, {useState} from "react";
import {useTheme} from "./ThemeContext";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import TimerIcon from "@mui/icons-material/Timer";
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';

export default function Conditions( {conditions, delete_function} ) {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { darkMode } = useTheme();

    const condition_map = {'LT': 'Less than ', 'GT': 'Greater than '};

    return (
        <Grid container spacing={4} justifyContent='center'>
            {conditions.map((item, index) =>
                <Grid item>
                    <Card sx={{maxWidth: '400px'}} style={darkMode? cardStyleDark: cardStyle}>
                        <CardContent>
                            <Grid container justifyContent='space-between'>
                                <Grid item style={{textAlign: 'left'}}>
                                    <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>
                                        Sensor {item['sensor']} → Actuator {item['actuator']}
                                    </Typography>
                                </Grid>
                                <Grid item style={{textAlign: 'right'}}>
                                    <Button style={(hoverIndex === index)? (darkMode? hoverDeleteButtonStyleDark: hoverDeleteButtonStyle):
                                        (darkMode? deleteButtonStyleDark: deleteButtonStyle)}
                                            onMouseEnter={() => setHoverIndex(index)} onMouseLeave={() => setHoverIndex(null)}
                                            onClick={() => {delete_function(item); setHoverIndex(null);}} endIcon={<DeleteOutlineOutlinedIcon />}>
                                        Delete
                                    </Button>
                                </Grid>
                            </Grid>
                        </CardContent>
                        <Accordion style={darkMode? cardStyleDark: cardStyle}>
                            <AccordionSummary style={darkMode? textStyleDark: textStyle} expandIcon={<ExpandMoreIcon />}>
                                More Details
                            </AccordionSummary>
                            <AccordionDetails>
                                <Grid container>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Grid container justifyContent='center'>
                                                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>Task</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <List>
                                                    <ListItem style={darkMode? textStyleDark: textStyle}>
                                                        <ListItemAvatar>
                                                            <MeetingRoomIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={'Room: ' + item['room']} primaryTypographyProps={{ variant: 'caption' }} />
                                                    </ListItem>
                                                    <Divider />
                                                    <ListItem style={darkMode? textStyleDark: textStyle}>
                                                        <ListItemAvatar>
                                                            <DeviceHubIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={'Sensor ID: ' + item['sensor']} primaryTypographyProps={{ variant: 'caption' }} />
                                                    </ListItem>
                                                    <Divider />
                                                    <ListItem style={darkMode? textStyleDark: textStyle}>
                                                        <ListItemAvatar>
                                                            <DeviceHubIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={'Actuator ID: ' + item['actuator']} primaryTypographyProps={{ variant: 'caption' }} />
                                                    </ListItem>
                                                    <Divider />
                                                    <ListItem style={darkMode? textStyleDark: textStyle}>
                                                        <ListItemAvatar>
                                                            <LightModeIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={'Blink Count: ' + item['blink_count']} primaryTypographyProps={{ variant: 'caption' }} />
                                                    </ListItem>
                                                    <Divider />
                                                    <ListItem style={darkMode? textStyleDark: textStyle}>
                                                        <ListItemAvatar>
                                                            <TimerIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={'Blink Length: ' + item['blink_length']} primaryTypographyProps={{ variant: 'caption' }} />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Grid container>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <Grid container justifyContent='center'>
                                                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>Condition</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <List>
                                                    <ListItem style={darkMode? textStyleDark: textStyle}>
                                                        <ListItemAvatar>
                                                            <QuestionMarkIcon />
                                                        </ListItemAvatar>
                                                        <ListItemText primary={'When Value is '
                                                            + (item['condition']==='BT'? 'Between ' + item['value1'] + ' and '
                                                            + item['value2']: condition_map[item['condition']] + item['value1'])}
                                                                      primaryTypographyProps={{ variant: 'caption' }} />
                                                    </ListItem>
                                                </List>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                </Grid>)}
        </Grid>
    );
}