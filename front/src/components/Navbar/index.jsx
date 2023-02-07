import { useState } from 'react';
import { Box, IconButton, Typography, Menu, Avatar, Tooltip, MenuItem, Grid, InputBase, Button } from '@mui/material'

import { styled, alpha } from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

import './index.css';

import MiniDrawer from '../Menu';

const settings = ['Perfil', 'Logout'];

const Navbar = () => {

  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha('#633256', 0.20),
    '&:hover': {
      backgroundColor: alpha('#633256', 0.25),
    },
    marginLeft: 0,
    width: '100%',
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
      display: 'block',
    },
  }));

  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#633256',
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    //color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        width: '12ch',
        '&:focus': {
          width: '20ch',
        },
      },
    },
  }));

  return (
    <section>
      <div className="topnav" id="myTopnav">
        <Grid container spacing={1}>
          <Grid item xs={0} sm={2} md={2}>
              <MiniDrawer/>
          </Grid>

          <Grid item xs={0} sm={8} md={9}>
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
      </div>
    </section>
  );
}
export default Navbar;