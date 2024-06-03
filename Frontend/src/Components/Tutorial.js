import React, { useState } from 'react';
import {
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Container,
    Paper,
    makeStyles, StepIcon, Icon,
} from '@mui/material';
import {Image} from "@mui/icons-material";
import Navbar from "./Navbar";
import {Grid} from "@material-ui/core";
import {
    chartBackgroundStyle,
    chartBackgroundStyleDark,
    defaultButtonStyle,
    defaultButtonStyleDark,
    hoverButtonStyle,
    hoverButtonStyleDark, paperBackgroundStyle, paperBackgroundStyleDark,
    textStyle,
    textStyleDark
} from "./style";
import {useTheme} from "./ThemeContext";

const steps = [
    'Step 1: Open Device App',
    'Step 2: Click On Connection',
    'Step 3: Enter Your Information To Login And Connect To Your Account',
    'Step 4: Enjoy Customizing Your Device From Far Away!'
];

export default function Tutorial() {
    const [activeStep, setActiveStep] = useState(0);
    const [backHover, setBackHover] = useState(false);
    const [nextHover, setNextHover] = useState(false);
    const {darkMode} = useTheme();

    const handleNext = () => {
        setActiveStep((prevStep) => Math.min(prevStep + 1, 3));
    };

    const handleBack = () => {
        setActiveStep((prevStep) => Math.max(prevStep - 1, 0));
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            <Grid item xs={12}>
                <Container>
                    <Paper elevation={3} sx={{padding: '20px'}} style={darkMode? paperBackgroundStyleDark: paperBackgroundStyle}>
                        <Stepper activeStep={activeStep} alternativeLabel>
                            {steps.map((label) => (
                                <Step key={label}>
                                    <StepLabel>{label}</StepLabel>
                                </Step>
                            ))}
                        </Stepper>
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h5" style={darkMode? textStyleDark: textStyle}>
                                    {steps[activeStep]}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <img
                                    src={`step${activeStep + 1}.png`}
                                    alt={`Step ${activeStep + 1}`}
                                    style={{ maxWidth: '100%' }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Grid container spacing={6} justifyContent='center'>
                                    <Grid item>
                                        <Button onClick={handleBack}
                                                onMouseEnter={() => setBackHover(true)} onMouseLeave={() => setBackHover(false)}
                                                style={backHover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)}>
                                            Back
                                        </Button>
                                    </Grid>
                                    <Grid item>
                                        <Button onClick={handleNext}
                                                onMouseEnter={() => setNextHover(true)} onMouseLeave={() => setNextHover(false)}
                                                style={nextHover? (darkMode? hoverButtonStyleDark: hoverButtonStyle): (darkMode? defaultButtonStyleDark: defaultButtonStyle)}>
                                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Grid>
        </Grid>
    );
};