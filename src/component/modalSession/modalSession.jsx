import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button,
} from "@mui/material";

const ModalSession = ({ open, handleClose }) => {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{ padding: "0 20px 20px 20px" }}
      >
        <DialogTitle
          sx={{
            color: "#25292A",
            borderBottom: "1px solid #B4B4B4",
            paddingBottom: "10px",
          }}
        >
          Notice about login
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
              color: "#25292A",
              borderBottom: "1px solid #B4B4B4",
              paddingBottom: "10px",
            }}
          >
            It seems there was an account change. You must login again.{" "}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ padding: "0 20px 15px 0" }}>
          <Button
            onClick={handleClose}
            sx={{
              background:
                "linear-gradient(60.23deg, #51BADB 19.54%, #662489 106.78%)",
              borderRadius: "8px",
              color: "#fff",
              fontFamily: "Poppins",
              fontSize: "11px",
            }}
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ModalSession;
