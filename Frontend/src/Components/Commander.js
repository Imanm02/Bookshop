import axios from "axios";
import {BASE_URL} from "../index";
import React, {useState} from "react";
import {Button, Grid, Typography} from "@material-ui/core";
import SendIcon from "@mui/icons-material/Send";
import CommandForm from "./CommandForm";
import {
    defaultButtonStyle,
    defaultButtonStyleDark,
    hoverButtonStyle,
    hoverButtonStyleDark, textStyle,
    textStyleDark
} from "./style";
import {get_user_id, useTheme} from "./ThemeContext";

export default function Commander( {id} ) {
    const [hover, setHover] = useState(false);
    const [nodeId, setNodeID] = useState(null);
    const [error, setError] = useState('');
    const {darkMode } = useTheme();
    const handle_click = () => {
        const blink_count = parseInt(document.getElementById('blink_count').value);
        const blink_length = parseInt(document.getElementById('blink_length').value);
        const data = {"node_id": nodeId, "blink_count": blink_count, "blink_length": blink_length, "type": "instant"};
        function is_valid() {
            function isNumeric(str) {
                return !isNaN(str) && !isNaN(parseInt(str, 10));
            }
            if (!isNumeric(blink_count) && !isNumeric(blink_length)) {
                setError('Fields should have integer values!');
                return false;
            }
            if (blink_count <= 0 || blink_length <= 0) {
                setError('Blink fields should be positive!');
                return false;
            }
            return true;
        }
        if (is_valid())
            axios.post(BASE_URL + 'command/sendData/' + get_user_id() + '/', data)
                .then(response => setError('Command has sent successfully!'))
                .catch(error => setError('An error occurred. Command has failed!'));
    };

    return (
        <Grid container spacing={id? 2: 6}>
            <Grid item  xs={12}>
                <CommandForm id={id} type={'Command'} change_handle={(val) => setNodeID(val)} selector_handle={() => {}} />
            </Grid>
            <Grid item  xs={12}>
                <Grid container justifyContent='center'>
                    <Button style={hover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)} onMouseEnter={() => setHover(true)}
                            onMouseLeave={() => setHover(false)} variant="contained" endIcon={<SendIcon />} onClick={handle_click}>
                        Send
                    </Button>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Grid container justifyContent='center'>
                    <Typography variant='body2' style={darkMode? textStyleDark: textStyle}>{error}</Typography>
                </Grid>
            </Grid>
        </Grid>
    );
}
