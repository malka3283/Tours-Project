import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDestinationThunk } from "../../redux/slices/flight/getAllDestinationThunk";
import { addDestantionThunk } from "../../redux/slices/flight/addDestantionThunk";
import { addFlightThunk } from "../../redux/slices/flight/addFlightThunk";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  IconButton,
  Box,
  Autocomplete,
  InputAdornment
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import "./AddFlight.css";
import { getAllClassThunk } from "../../redux/slices/class/getAllClassThunk";

export const AddFlight = (props) => {
  const { addFlight, update, close, flit } = props;
  const destinitions = useSelector(state => state.flights.destinitions);
  const dispatch = useDispatch();
  const [flt, setFlt] = useState({
    source: "",
    destination: "",
    timeOfFlight: 0,
    sold: 0,
    destinationNavigation: {},
    sourceNavigation: {}
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFlt(flit);
    setOpen(true);
  }, [flit]);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const handleSubmit = () => {
    if (flit.source !== "") {
      update(flt);
    } else {
      let f = flt;
      destinitions.forEach(d => {
        if (d.destination === f.destination)
          f.destination = d.id;
      });
      destinitions.forEach(d => {
        if (d.destination === f.source)
          f.source = d.id;
      });
      addFlight(flt);
    }
  };

  const isFormValid = flt.source !== "" && flt.destination !== "" && flt.timeOfFlight !== 0;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className="flight-dialog"
    >
      <DialogTitle className="dialog-title">
        <Typography variant="h6" component="div" className="title-text">
          {flit.source !== "" ? "עריכת טיסה" : "הוספת טיסה"}
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          className="close-button"
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers className="dialog-content">
        <Box className="form-field">
          <Typography variant="subtitle1" className="field-label">
            מקור
          </Typography>
          {flit.source === "" ? (
            <Autocomplete
              options={destinitions?.map(d => d.destination) || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="בחר מקור טיסה"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon color="primary" />
                      </InputAdornment>
                    ),
                    className: "rtl-input"
                  }}
                />
              )}
              onChange={(e, value) => setFlt(prev => ({ ...prev, source: value }))}
              className="autocomplete-field"
            />
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={flt.sourceNavigation.destination}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightTakeoffIcon color="primary" />
                  </InputAdornment>
                ),
                className: "rtl-input"
              }}
            />
          )}
        </Box>

        <Box className="form-field">
          <Typography variant="subtitle1" className="field-label">
            יעד
          </Typography>
          {flit.source === "" ? (
            <Autocomplete
              options={destinitions?.map(d => d.destination) || []}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="outlined"
                  size="small"
                  placeholder="בחר יעד טיסה"
                  InputProps={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLandIcon color="primary" />
                      </InputAdornment>
                    ),
                    className: "rtl-input"
                  }}
                />
              )}
              onChange={(e, value) => setFlt(prev => ({ ...prev, destination: value }))}
              className="autocomplete-field"
            />
          ) : (
            <TextField
              fullWidth
              variant="outlined"
              size="small"
              value={flt.destinationNavigation.destination}
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <FlightLandIcon color="primary" />
                  </InputAdornment>
                ),
                className: "rtl-input"
              }}
            />
          )}
        </Box>

        <Box className="form-field">
          <Typography variant="subtitle1" className="field-label">
            זמן טיסה בדקות
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            type="number"
            value={flit.source !== "" ? parseInt(flt.timeOfFlight) : flt.timeOfFlight}
            onChange={(e) => setFlt(prev => ({ ...prev, timeOfFlight: e.target.value }))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccessTimeIcon color="primary" />
                </InputAdornment>
              ),
              className: "rtl-input"
            }}
          />
        </Box>
      </DialogContent>

      <DialogActions className="dialog-actions">
        <Button
          variant="contained"
          color="primary"
          startIcon={flit.source !== "" ? <SaveIcon /> : <AddIcon />}
          onClick={handleSubmit}
          disabled={!isFormValid}
          className="submit-button"
        >
          אישור
        </Button>
      </DialogActions>
    </Dialog>
  );
};