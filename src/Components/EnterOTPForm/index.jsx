import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import "./EnterOTPForm.css"; // Import custom CSS for styling
import CloseIcon from "@mui/icons-material/Close";
import { closeSnackbar, enqueueSnackbar } from "notistack";

const EnterOTPForm = ({ open, onClose }) => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timer, setTimer] = useState(59); // Countdown timer starts from 59
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  // Handle the OTP input change
  const handleChange = (element, index) => {
    if (isNaN(element.value)) return; // Allow only numeric values
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Move to next input box after entering a value
    if (element.nextSibling && element.value !== "") {
      element.nextSibling.focus();
    }
  };

  // Handle backspace functionality
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index] === "") {
        if (e.target.previousSibling) {
          e.target.previousSibling.focus();
        }
      } else {
        setOtp([...otp.map((d, idx) => (idx === index ? "" : d))]);
      }
    }
  };

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTime) => prevTime - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResendOtp = () => {
    setTimer(59); 
    setIsResendDisabled(true);
    enqueueSnackbar("OTP Resent", {
        variant: "success",
        anchorOrigin: {
          vertical: "bottom",
          horizontal: "left",
        },
        action: (key) => <CloseIcon onClick={() => closeSnackbar(key)} />,
        iconVariant: "success",
        autoHideDuration: 2000,
      });
  };

  const handleSubmit = () => {
    const enteredOtp = otp.join("");
    console.log("Entered OTP: ", enteredOtp);
  };

  return (
    <Dialog open={open} onClose={onClose}>
    <DialogTitle
    sx={{
      display: "flex",
      justifyContent: "space-between", 
      alignItems: "center",
      padding: "8px 16px",
    }}
    id="customized-dialog-title"
  >
    <Typography
      variant="h6" 
      sx={{
        flexGrow: 1,
        textAlign: "center", 
      }}
    >
      Enter OTP
    </Typography>
    <IconButton
      aria-label="close"
      onClick={onClose}
      sx={{
        color: (theme) => theme.palette.grey[500],
      }}
    >
      <CloseIcon />
    </IconButton>
  </DialogTitle>
  
      <DialogContent>
        <Box className="otp-container">
        <p style={{
            color: "#AFAFAF",
            fontStyle: "normal",
            fontWeight: 400,
            fontSize: "15px",
            lineHeight: "144.04%",
            textAlign: "center"
          }}>
            OTP has been sent to the mobile number registered in your Aadhaar.
          </p>
          
          <div className="otp-input">
            {otp.map((data, index) => (
              <input
                type="text"
                maxLength="1"
                key={index}
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              />
            ))}
          </div>
          <p className="timer">
            {timer > 0 ? (
              <span>00:{timer < 10 ? `0${timer}` : timer}</span>
            ) : (
                <span style={{
                    fontStyle: "normal",
                    fontWeight: 400,
                    fontSize: "14px",
                    lineHeight: "144.04%",
                    textAlign: "center",
                    color: "#AFAFAF"
                  }}>
                    Didn't receive?{" "}
                    <span onClick={handleResendOtp} style={{ cursor: "pointer", color: isResendDisabled ? "#AFAFAF" : "#007BFF", textDecoration: isResendDisabled ? "none" : "underline" }} disabled={isResendDisabled}>
                      Resend OTP
                    </span>
                  </span>
            )}
          </p>
        </Box>
      </DialogContent>
      <DialogActions style={{ justifyContent: "center" }}>
        <Button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#0c6845",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width:"110px"
          }}
        >
          Verify
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EnterOTPForm;
