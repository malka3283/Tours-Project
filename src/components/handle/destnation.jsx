import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { addDestantionThunk } from "../../redux/slices/flight/addDestantionThunk";
import { updateDestinationThunk } from "../../redux/slices/flight/updateDestinationThunk";
import { AddDestination } from "./addDestination";
import { 
  Button, 
  Container, 
  Typography, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  IconButton,
  Box
} from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import "./destination.css";

export const Destnation = () => {
  const dispatch = useDispatch();
  const [add, setAdd] = useState(false);
  const [des, setDes] = useState({ path: "", destination: "" });
  const destinitions = useSelector(state => state.flights.destinitions);

  useEffect(() => {
    dispatch(loct("/destnation"));
    dispatch(getAllDestinationThunk());
  }, [dispatch]);

  const addDes = (addDes) => {
    dispatch(addDestantionThunk(addDes));
    close();
  };

  const updateDes = (updateDes) => {
    dispatch(updateDestinationThunk(updateDes));
    close();
  };

  const close = () => {
    setDes({ path: "", destinition: "" });
    setAdd(false);
  };

  return (
    <Container className="destination-container">
      <Paper elevation={3} className="destination-paper">
        <Box className="destination-header">
          <Typography variant="h4" component="h1" className="destination-title">
            יעדים
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            startIcon={<AddCircleIcon />}
            onClick={() => setAdd(true)}
            className="add-button"
          >
            הוספת יעד
          </Button>
        </Box>

        <TableContainer component={Paper} className="table-container">
          <Table aria-label="destinations table">
            <TableHead>
              <TableRow>
                <TableCell align="right" className="table-header">יעד</TableCell>
                <TableCell align="right" className="table-header">תמונה</TableCell>
                <TableCell align="right" className="table-header">פעולות</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {destinitions?.map((d) => (
                <TableRow key={d.id} className="table-row">
                  <TableCell align="right">{d.destination}</TableCell>
                  <TableCell align="right">
                    <img 
                      src={`/תמונות מדינות/${d.path}.png`} 
                      alt={d.path}
                      className="destination-image"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      color="primary"
                      onClick={() => {
                        setDes(d);
                        setAdd(true);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {add && (
        <AddDestination 
          addDestination={addDes} 
          updateDestination={updateDes} 
          close={close} 
          des={des}
        />
      )}
    </Container>
  );
};