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
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import  {useState}  from 'react';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({bINFI}) {
  const [open, setOpen] = React.useState(false);
  const [infi, setInfi] = useState(bINFI)



function calcularPorcentaje(infi) {

let porcentaje = (infi * 10) / 100;
let result = infi - porcentaje

  return(
    result
  )
}

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
            How much do yoy want to Withdraw?
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{
             '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
         
             >
        <div>
          <TextField
             required
             id="outlined-required"
             label="INFI"
             defaultValue={bINFI}
             type="number"
             
             onChange={(e) => setInfi(e.target.value)}
            
          />
        </div>
         <span>You have {bINFI} INF in youy balance</span>
        </Box>
          </DialogContentText>
      
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          You are about to withdraw: <spam>{infi} INFI</spam>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          Transaction fee: <spam>10%</spam>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          You will receive: <spam>{calcularPorcentaje(infi)} BUSD</spam>
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