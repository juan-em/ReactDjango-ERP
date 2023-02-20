import { useState } from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  IconButton,
  Menu,
  Avatar,
  Tooltip,
  MenuItem,
  Grid,
  Toolbar,
  List,
  CssBaseline,
  Drawer,
  AppBar,
  Divider,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import MenuIcon from "@mui/icons-material/Menu";

import "./index.css";

import { DrawerHeader } from "./extra.jsx";
import { SearchIconWrapper, StyledInputBase, Search } from "./extra.jsx";
import CustomListItem from "./listitem";
import { menuItems } from "../../resources/menuItems";

// Logout imports
import useLogout from '../../hooks/useLogout';
import { useNavigate } from 'react-router-dom';

const outSettings = ['Iniciar', 'Registrarme'];
const inSettings = ['Perfil'];
const MenuNavbar = ({ content }) => {

    // Logout system
    const navigate = useNavigate()
    
    const logout = useLogout()

    const signOut = async () => {
        await logout()
        navigate('/login')
    }

    // Navigation and Menu bar components
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

  const drawer = (
    <div style={{ background: "#EDECEF", height: "100vh" }}>
      <DrawerHeader>
        <h1 className="logo">ALPACA</h1>
        <Divider />
      </DrawerHeader>
      <List style={{ background: "#EDECEF" }}>
        {menuItems.map((item, index) => (
          <CustomListItem
            onClick={handleDrawerOpen}
            id="items"
            key={item.name}
            name={item.name}
            url={item.url}
            icons={item.icon}
            item={item.item}
            bigOpen={open}
          />
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }} className='topnavbar'>
            <CssBaseline />
            <AppBar position="fixed" open={open} style={{ background: '#EDECEF' }}>
                <Toolbar>
                    <IconButton
                        color="#000"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            fontSize:30,
                            margin: 1,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <h1 className="logo">ALPACA</h1>
                    </IconButton>
                    <Grid container>
                        <Grid item xs={1} sm={9} md={10} lg={11}>
                            <div className="buscar">
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Buscar…"
                                        inputProps={{ 'aria-label': 'search' }}
                                    />
                                </Search>
                            </div>
                        </Grid>
                        <div className="cuenta">
                            <Grid item xs={11} sm={2} md={1}>
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
                                        {inSettings.map((setting) => (
                                            <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                                {setting}
                                            </MenuItem>
                                        ))}

                                        {/* Login button (provisional) */}
                                        <Button variant="text" color="secondary" onClick={signOut}>Logout</Button>
                                    </Menu>
                                </Box>
                            </Grid>
                        </div>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" open={open}>
                <DrawerHeader style={{ background: '#EDECEF' }}>
                    <Button sx={{fontSize:30}} onClick={handleDrawerClose}>
                        <h1 className="logo">ALPACA</h1>
                    </Button>
                </DrawerHeader>
                <List style={{ background: '#EDECEF' }}>
                    {menuItems.map((item, index) => (
                        <CustomListItem id="items" key={item.name} name={item.name} url={item.url} icons={item.icon} item={item.item} bigOpen={open}/>
                    ))}
                </List>
                
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 5 }}>
                <DrawerHeader />
                {content}
            </Box>
        </Box>
    );
}

export default MenuNavbar;
