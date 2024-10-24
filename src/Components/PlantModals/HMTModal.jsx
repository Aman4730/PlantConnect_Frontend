import React, { useState } from "react";
import Slide from "@mui/material/Slide";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import CloseIcon from "@mui/icons-material/Close";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import {
  TextField,
  Grid,
  IconButton,
  Select,
  MenuItem,
  Typography,
} from "@mui/material";
import PlantModalTable from "../../Home/PlantTables/PlantModalTable";
import EnterOTPForm from "../EnterOTPForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const HMTModal = ({ HMTModalopen, handleHMTModalClose }) => {
  const field = [
    {
      options: ["Option 1", "Option 2", "Option 3"],
    },
  ];
  const headCells = [
    { id: "id", label: "S.No" },
    { id: "Nursery Name", label: "Nursery Name" },
    { id: "Availability", label: "Availability" },
    { id: "Address", label: "Address" },
    { id: "Contact Detail", label: "Contact Detail" },
    { id: "Distance", label: "Distance" },
    { id: "Requirement", label: "Requirement" },
    { id: "Action", label: "Action" },
  ];
  const nurseries = [
    {
      id: 1,
      name: "A",
      availability: 8,
      address: "A",
      contact: "1234567890",
      distance: "A",
      requirement: 0, // initial value
    },
    {
      id: 2,
      name: "B",
      availability: 15,
      address: "B",
      contact: "844567890",
      distance: "B",
      requirement: 0,
    },
    // Add more objects following the same pattern
  ];
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = () => {
    setOpenDialog(false);
  };
  return (
    <React.Fragment>
      <Dialog
        open={HMTModalopen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleHMTModalClose}
        aria-describedby="alert-dialog-slide-description"
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            height: "60px",
            position: "relative",
          }}
          id="customized-dialog-title"
        >
          <span>Form</span>
          <IconButton
            aria-label="close"
            onClick={handleHMTModalClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={0.1}>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Farmer Name
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Name"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Mobile Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Mobile Number"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Aadhaar Number
              </Typography>
              <TextField
                fullWidth
                placeholder="Aadhaar Number"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Farmer Latitude
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Latitude"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Farmer Longitude
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Longitude"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Farmer Address
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Address"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Farmer Pin code
              </Typography>
              <TextField
                fullWidth
                placeholder="Farmer Pin code"
                size="small"
                variant="outlined"
                className="textfield-form"
              />
            </Grid>

            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Season
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Variety"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={6}>
              <Typography component="div" className="label-Form">
                Scheme
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Variety"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Category
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Category"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Name
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Name"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Quantity
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Quantity"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
            <Grid item lg={4} xs={12}>
              <Typography component="div" className="label-Form">
                Plant Category
              </Typography>
              <Select
                fullWidth
                displayEmpty
                className="textfield-form"
                variant="outlined"
                placeholder="Select Plant Category"
                size="small"
                sx={{
                  color: "#000000",
                }}
              >
                {field[0].options.map((option, index) => (
                  <MenuItem key={index} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Grid>
          </Grid>
         
      <EnterOTPForm open={openDialog} onClose={handleClose} />

        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button
            onClick={handleOpen}
            style={{
              width: "130px",
              height: "40px",
              color: "#2f73fa",
              borderRadius:"8px",
              boxShadow: "0px 4px 25px rgba(0, 0, 0, 0.11)",
            }}
          >
            Send OTP
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default HMTModal;
