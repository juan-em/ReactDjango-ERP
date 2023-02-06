import { useState } from 'react';
import { styled, useTheme, alpha } from '@mui/material/styles';
import { Box, IconButton, Typography, Menu, Avatar, Tooltip, 
        MenuItem, Grid, Toolbar, List, CssBaseline, Divider,
        ListItem, ListItemButton, ListItemIcon, ListItemText} from '@mui/material'

import { Link } from "react-router-dom";

import MenuIcon from '@mui/icons-material/Menu'
import HomeIcon from '@mui/icons-material/Home';
import HandshakeIcon from '@mui/icons-material/Handshake';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CategoryIcon from '@mui/icons-material/Category';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import SearchIcon from '@mui/icons-material/Search';

import './index.css'

import {openedMixin, closedMixin, DrawerHeader, AppBar, Drawer} from './extra.jsx'
import { SearchIconWrapper, StyledInputBase, Search } from './extra.jsx';

const menu_items = [
    { url: "/", icon: HomeIcon, name: "Inicio" },
    { url: "/comerciales", icon: HandshakeIcon, name: "Inter. Comer." },
    { url: "#contact", icon: Inventory2Icon, name: "Productos" },
    { url: "#about", icon: AttachMoneyIcon, name: "Ventas" },
    { url: "#about", icon: ReceiptIcon, name: "Compras" },
    { url: "#about", icon: CategoryIcon, name: "Producción" },
    { url: "#about", icon: AutoStoriesIcon, name: "Tesorería" },
    { url: "#about", icon: DragIndicatorIcon, name: "Mantenimiento" },
    { url: "#about", icon: PrecisionManufacturingIcon, name: "Servicios" },
];

const settings = ['Perfil', 'Logout'];
const MenuNavbar = ({content}) => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);

    const [anchorElUser, setAnchorElUser] = useState(null);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    

    return (
        <Box sx={{ display: 'flex' }} className='topnavbar'>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Grid container>
                        <Grid item xs={0} sm={10} md={11}>
                            <div className="buscar">
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </div>
                        </Grid>
                        <div className="cuenta">
                            <Grid item xs={12} sm={2} md={1}>
                                <Box sx={{ flexGrow: 1 }}>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 2.3 }}>
                                            <Avatar alt="Remy Sharp" src="https://images.unsplash.com/photo-1474904200416-6b2b7926f26f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80" />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                <Typography textAlign="center">{setting}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                </Box>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <h1 className="logo">ALPACA</h1> : <h1 className="logo">ALPACA</h1>}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {menu_items.map((item, index) => (
                        <ListItem key={item.name} disablePadding sx={{ display: 'block' }}>
                            <Link to={item.url}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <item.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.name} sx={{textColor:'#0000', opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </Link>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                {content}
            </Box>
        </Box>
    );
}

export default MenuNavbar;