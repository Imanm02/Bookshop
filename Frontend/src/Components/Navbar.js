import React, {useEffect, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {Grid, Typography} from "@material-ui/core";
import axios from "axios";
import {BASE_URL} from "../index";
import {useNavigate} from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {get_user_id, useTheme} from './ThemeContext';
import RoomPreferencesIcon from '@mui/icons-material/RoomPreferences';
import HelpIcon from '@mui/icons-material/Help';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';
import {barStyle, barStyleDark, textStyle, textStyleDark} from "./style";
import TextField from "@mui/material/TextField";
import {InputAdornment} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import BookIcon from '@mui/icons-material/Book';
import Link from "@mui/material/Link";

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [name, setName] = useState('');
    const [raspberry, setRaspberry] = useState(null);
    const { darkMode, toggleTheme } = useTheme();
    const open = Boolean(anchorEl);
    const navigate = useNavigate();

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    function handleClose() {
        setAnchorEl(null);
    }

    function changeTheme() {
        toggleTheme();
        handleClose();
    }

    function logout() {
        localStorage.setItem('token', 'undefined');
        navigate('../signIn');
    }

    return (
        <AppBar position="static" style={{width: '100vw', backgroundColor: '#0c2556'}}>
            <Toolbar>
                <Grid container alignItems={'center'}>
                    <Grid item xs={2}>
                        <div>
                            <IconButton
                                onClick={handleMenu}
                                color="inherit"
                                aria-label="account"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                            >
                                <AccountCircleIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={open}
                                onClose={handleClose}
                            >
                                <MenuItem onClick={() => navigate('/')}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <HomeIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                صفحه اصلی
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/Profile')}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <SettingsIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                تنظیمات
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                                <MenuItem onClick={() => navigate('/addBook')}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <BookIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                افزودن کتاب
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                                <MenuItem onClick={logout}>
                                    <Grid container spacing={2}>
                                        <Grid item>
                                            <LogoutIcon />
                                        </Grid>
                                        <Grid item>
                                            <Typography>
                                                خروج
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </MenuItem>
                            </Menu>
                        </div>
                    </Grid>
                    <Grid item xs={3}>
                        <Link href='/cart'>
                            <Typography variant='h6' style={textStyleDark}>سبد خرید</Typography>
                        </Link>
                    </Grid>
                    <Grid item xs={3}>
                        <Typography variant='h6' style={textStyleDark}>دسته‌بندی‌ها</Typography>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField
                            variant="outlined"
                            placeholder="جست‌وجو..."
                            fullWidth
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            style={{ backgroundColor: 'gray', height: '100%', borderRadius: '10px'}}
                            InputLabelProps={{
                                style: { color: 'white' },
                            }}
                            InputProps={{
                                style: { color: 'white' },
                            }}
                        />
                    </Grid>
                </Grid>
            </Toolbar>
        </AppBar>
    );
}