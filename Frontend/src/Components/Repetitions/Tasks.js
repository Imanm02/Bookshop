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
} from "../style";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import LightModeIcon from "@mui/icons-material/LightMode";
import TimerIcon from "@mui/icons-material/Timer";
import RepeatDate from "../RepeatDate";
import React, {useState} from "react";
import {useTheme} from "../ThemeContext";

export default function Tasks( {tasks, delete_function} ) {
    const [hoverIndex, setHoverIndex] = useState(null);
    const { darkMode } = useTheme();


    return (
        <Grid container spacing={4} justifyContent='center'>
            {tasks.map((item, index) =>
                <Grid item>
                    <Card sx={{maxWidth: '400px'}} style={darkMode? cardStyleDark: cardStyle}>
                        <CardContent>
                            <Grid container justifyContent='space-between'>
                                <Grid item style={{textAlign: 'left'}}>
                                    <Typography variant='body1' style={darkMode? textStyleDark: textStyle}>
                                        {index+1}: {item['name']}
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
                                    <Grid item xs={12}>
                                        <Grid container>
                                            <Grid item xs={12}>
                                                <Grid container justifyContent='center'>
                                                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>Task</Typography>
                                                </Grid>
                                            </Grid>
                                            <Grid item xs={12}>
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
                                                        <ListItemText primary={'Node ID: ' + item['node']} primaryTypographyProps={{ variant: 'caption' }} />
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
                                    <Grid item xs={12}>
                                        <RepeatDate item={item} />
                                    </Grid>
                                </Grid>
                            </AccordionDetails>
                        </Accordion>
                    </Card>
                </Grid>)}
        </Grid>
    );
}