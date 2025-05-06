import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { loct } from "../../redux/slices/user/userSlice";
import { 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions, 
  Button, 
  TextField, 
  Typography, 
  IconButton,
  Box
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import SaveIcon from '@mui/icons-material/Save';
import AddIcon from '@mui/icons-material/Add';
import "./addDestination.css";

export const AddDestination = (props) => {
  const { addDestination, updateDestination, des, close } = props;
  const dispatch = useDispatch();
  const [dest, setDest] = useState({ path: "", destination: "" });
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    setDest(des);
    setOpen(true);
  }, [des]);

  const handleClose = () => {
    setOpen(false);
    close();
  };

  const handleSubmit = () => {
    if (des.destination !== "") {
      updateDestination(dest);
    } else {
      addDestination(dest);
    }
  };

  const isFormValid = dest.path !== "" && dest.destination !== "";

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      className="destination-dialog"
    >
      <DialogTitle className="dialog-title">
        <Typography variant="h6" component="div" className="title-text">
          {des.path === "" ? "הוספת יעד" : "עריכת יעד"}
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
            יעד
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={dest.destination}
            onChange={(e) => setDest(prev => ({ ...prev, destination: e.target.value }))}
            disabled={des.path !== "" && des.destination !== ""}
            placeholder="הכנס שם יעד"
            className="text-field"
            InputProps={{
              className: "rtl-input"
            }}
          />
        </Box>
        
        <Box className="form-field">
          <Typography variant="subtitle1" className="field-label">
            תמונה
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            size="small"
            value={dest.path}
            onChange={(e) => setDest(prev => ({ ...prev, path: e.target.value }))}
            placeholder="הכנס שם קובץ תמונה"
            className="text-field"
            InputProps={{
              className: "rtl-input"
            }}
          />
        </Box>
      </DialogContent>
      
      <DialogActions className="dialog-actions">
        <Button 
          variant="contained" 
          color="primary"
          startIcon={des.destination !== "" ? <SaveIcon /> : <AddIcon />}
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