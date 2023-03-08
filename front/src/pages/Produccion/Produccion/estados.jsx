import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import Card from "@mui/material/Paper";
import { useState } from "react";
import { CardHeader, Typography } from "@mui/material";
import { fontSize } from "@mui/system";
import { alpha} from "@mui/material/styles";

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

const Estados = () => {
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([0, 1, 2, 3]);
  const [right, setRight] = useState([4, 5, 6, 7]);
  const [left2, setLeft2] = useState([8, 9, 10, 11]);
  const [right2, setRight2] = useState([12, 13, 14, 15]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const left2Checked = intersection(checked, left2);
  const right2Checked = intersection(checked, right2);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  const handleAllRight2 = () => {
    setRight2(right2.concat(left2));
    setLeft2([]);
  };

  const handleCheckedRight2 = () => {
    setRight2(right2.concat(left2Checked));
    setLeft2(not(left2, left2Checked));
    setChecked(not(checked, left2Checked));
  };

  const handleCheckedLeft2 = () => {
    setLeft2(left2.concat(right2Checked));
    setRight2(not(right2, right2Checked));
    setChecked(not(checked, right2Checked));
  };

  const handleAllLeft2 = () => {
    setLeft2(left2.concat(right2));
    setRight2([]);
  };

  /* right2=left2  left2=right */
  const handleAllRight2Medio = () => {
    setLeft2(left2.concat(right));
    setRight([]);
  };

  const handleCheckedRight2Medio = () => {
    setLeft2(left2.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleCheckedLeft2Medio = () => {
    setRight(right.concat(left2Checked));
    setLeft2(not(left2, left2Checked));
    setChecked(not(checked, left2Checked));
  };

  const handleAllLeft2Medio = () => {
    setRight(right.concat(left2));
    setLeft2([]);
  };

  const customList = (items, tittle) => (
    <Card sx={{ height: 300, overflow: "auto", mt:4 }} elevation={10}>
        <CardHeader
        title={<Typography fontFamily={"inherit"} align={'center'}
        sx={{ p: 1 , 
          backgroundColor: alpha('#633256', 0.20),
          '&:hover': {
              backgroundColor: alpha('#633256', 0.25),
          },
          }}>
          {tittle}
        </Typography>}/>
        
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  size="small"
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`N° factura ${value + 1}`} />
            </ListItem>
          );
        })}
      </List>
    </Card>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item xs={12} md={2}>{customList(left, "No Iniciado")}</Grid>
      <Grid item xs={12} md={1}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
            color="secondary"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
            color="secondary"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
            color="secondary"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
            color="secondary"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={2}>{customList(right, "En Proceso")}</Grid>







      <Grid item xs={12} md={1}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight2Medio}
            disabled={right.length === 0}
            aria-label="move all right"
            color="secondary"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight2Medio}
            disabled={rightChecked.length === 0}
            aria-label="move selected right"
            color="secondary"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft2Medio}
            disabled={left2Checked.length === 0}
            aria-label="move selected left"
            color="secondary"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft2Medio}
            disabled={left2.length === 0}
            aria-label="move all left"
            color="secondary"
          >
            ≪
          </Button>
        </Grid>
      </Grid>







      <Grid item xs={12} md={2}>{customList(left2, "Terminado")}</Grid>
      <Grid item xs={12} md={1}>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllRight2}
            disabled={left2.length === 0}
            aria-label="move all right"
            color="secondary"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedRight2}
            disabled={left2Checked.length === 0}
            aria-label="move selected right"
            color="secondary"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleCheckedLeft2}
            disabled={right2Checked.length === 0}
            aria-label="move selected left"
            color="secondary"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="outlined"
            size="small"
            onClick={handleAllLeft2}
            disabled={right2.length === 0}
            aria-label="move all left"
            color="secondary"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item xs={12} md={3}>{customList(right2, "Saliendo")}</Grid>
    </Grid>
  );
};
export default Estados;