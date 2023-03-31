import { useState } from "react";
import { Fragment } from 'react';
import { styled, useTheme, alpha } from "@mui/material/styles";
import {
  TextField,
  Button,
  Grid,
  Typography,
  IconButton,
  Dialog,
  DialogContent,
  DialogTitle,
  Tab,
  Alert,
  AlertTitle
} from "@mui/material";
import { TabContext, TabPanel, TabList } from "@mui/lab";
import { DataGrid, renderEditInputCell } from '@mui/x-data-grid';
//iconos
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import DescriptionIcon from '@mui/icons-material/Description';
//AHORA
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';


import Swal from "sweetalert2";
import AddForm from "./addform";


const VerMayor500 = ({
}) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenPost = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false)
  };
  
  function createData(name, calories, fat, carbs, acciones) {
    return {
      name,
      calories,
      fat,
      carbs,
      acciones,
      history: [
        {
          date: '2020-01-05',
          customerId: '11091700',
        },
        {
          date: '2020-01-02',
          customerId: 'Anonymous',
        },
      ],
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = useState(false);
  
    return (
      <Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.name}
          </TableCell>
          <TableCell>{row.calories}</TableCell>
          <TableCell>{row.fat}</TableCell>
          <TableCell>{row.carbs}</TableCell>
          <TableCell>{row.acciones}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography gutterBottom component="div">
                  <span><strong>Cotizaciones y propuestas económicas</strong></span>
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Customer</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell>{historyRow.customerId}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </Fragment>
    );
  }
  
  Row.propTypes = {
    row: PropTypes.shape({
      calories: PropTypes.number.isRequired,
      carbs: PropTypes.number.isRequired,
      fat: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          amount: PropTypes.number.isRequired,
          customerId: PropTypes.string.isRequired,
          date: PropTypes.string.isRequired,
        }),
      ).isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      protein: PropTypes.number.isRequired,
    }).isRequired,
  };
  
  const rows = [
    createData('Frozen yoghurt', 'Frozen yoghurt', 'Frozen yoghurt', 159,
    <>
    <IconButton
      size="small"
      color="error"
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
    <AddForm/>
    </>
    ),
    createData('Frozen yoghurt', 'Frozen yoghurt','Ice cream sandwich', 237,
    <>
    <IconButton
      size="small"
      color="error"
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
    <AddForm/>
    </>),
    createData('Frozen yoghurt', 'Frozen yoghurt','Eclair', 262,
    <>
    <IconButton
      size="small"
      color="error"
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
    <AddForm/>
    </>),
  ];

  return (
    <>
      <IconButton
        aria-label="delete"
        color="secondary"
        size="small"
        onClick={handleOpenPost}
      >
      <DescriptionIcon fontSize="inherit" />VER MAYORES 500
      </IconButton>
      <Dialog open={openModal} maxWidth={'xl'}>
        <DialogTitle>
          <IconButton aria-label="delete" size="small" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
          <Typography align="center" sx={{ fontSize: 20, mt: 2 }} gutterBottom>
            Órdenes de bienes con cotización mayor a 500
          </Typography>
        </DialogTitle>
        <DialogContent>
                {/*item.id && <input type="hidden" name="cod" value={item.id}/>*/}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={12} md={12}>
                    <div style={{ height: 400, width: '100%' }}>
                    <TableContainer component={Paper}>
                      <Table aria-label="collapsible table">
                        <TableHead
                        sx={{
                          backgroundColor: alpha("#633256", 0.2),
                          "&:hover": {
                            backgroundColor: alpha("#633256", 0.25),
                          },
                        }}>
                          <TableRow>
                            <TableCell />
                            <TableCell><span>Item</span></TableCell>
                            <TableCell><span>Código</span></TableCell>
                            <TableCell><span>Tipo de bien</span></TableCell>
                            <TableCell><span>Estado</span></TableCell>
                            <TableCell><span>Acciones</span></TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {rows.map((row) => (
                            <Row key={row.name} row={row} />
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    </div>
                  </Grid>
                    <Grid item xs={12} sm={6} md={6} sx={{ mt: 2 }}>
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
                  <Grid item xs={12} sm={6} md={6} sx={{ mt: 2 }}>
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
        </DialogContent>
      </Dialog>
    </>
  );
};

export default VerMayor500;
