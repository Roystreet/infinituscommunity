import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import style from "./ModalPerfil.module.css"
import img from "../../assets/retiro.png"
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={style.cont}>
      <Button  onClick={handleClickOpen} className={style.contImg}>
       Whit Draw
       <img className={style.img} src={img} alt="not found"/>
      </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
       
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          You are about to withdraw: <spam>300 INFI</spam>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          Transaction fee: <spam>10%</spam>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          You will receive: <spam>270 BUSD</spam>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={style.btn}>Go back</Button>
          <Button onClick={handleClose} className={style.btnWhiteDraw}>White Draw</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}