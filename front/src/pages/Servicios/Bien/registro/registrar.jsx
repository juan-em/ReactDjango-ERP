import '../index.css';

import { useState } from "react";
import {
  Grid,
  Button,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab, Tabs, Box,

  //Imports para el FormControlulario
  FormControl
} from "@mui/material";

import { TabContext, TabPanel, TabList } from "@mui/lab";

import CloseIcon from "@mui/icons-material/Close";

import CotizacionMayor from './CotizacionMayor';
import CotizacionMenor from './CotizacionMenor';

import PropTypes from 'prop-types';

const Registar = () => {
  const [open, setOpen] = useState(false);
  
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

    
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
        <Button size="small" variant="outlined"  color='warning'sx={{fontFamily: "inherit", height:'100%' }} onClick={handleOpen}>
          Registrar
        </Button>
        <Dialog open={open}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            
            Registrar Bien
          </Typography>
        </DialogTitle>
        <DialogContent>
          <TabContext centered>
              <FormControl>
                  <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <Tabs textColor="secondary" indicatorColor="secondary" value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label={<span>Cotización &lt; 500</span>} {...a11yProps(0)} />
                        <Tab label={<span>Cotización &gt; 500</span>} {...a11yProps(1)} />
                      </Tabs>
                    </Box>
                    <TabPanel value={value} index={0}>
                      <CotizacionMenor/>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                      <CotizacionMayor/>
                    </TabPanel>

                    
                    <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
                      {/* Boton de registro */}
                      <Grid item xs={6}>
                        <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="secondary"
                        className="navbar-btn-single"
                        variant="contained"
                        type="submit"
                        
                        >
                          <span>Registrar</span>
                        </Button> 
                      </Grid>
                      {/* Boton para cancelar registro */}
                      <Grid item xs={6}>
                        <Button
                        fullWidth
                        id="btnClick"
                        size="medium"
                        color="error"
                        className="navbar-btn-single"
                        variant="contained"
                        onClick={handleClose}
                        >
                          <span>Cancelar</span>
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
              </FormControl>
          </TabContext>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Registar;