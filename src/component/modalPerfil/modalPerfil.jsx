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
import { getContractData } from '../../functions/serverInteractions';
import { sendWriteTransactions } from "../../functions/Web3Interactions"
import imgError from "../../assets/on.png";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({bINFI}) {
  const [open, setOpen] = React.useState(false);
  const [infi, setInfi] = useState(bINFI)
  const [errorInf, setErrorInf] = useState(true)


function calcularPorcentaje(infi) {

let porcentaje = (infi * 10) / 100;
let result = infi - porcentaje

  return(
    result
  )
}

function errorInfi(infi, bINFI){
  if (infi > bINFI || infi < 0){
      console.log("No se puede")
      setErrorInf(false)
  }else{
      console.log("si se puede")
      setErrorInf(true)
   }
}
const textError = (errorInfi)=>{ 
  if (errorInf == false){
    return <p className={style.errorTextInfi}><img className={style.imgErr} src={imgError}/> The amount exceeds your balance</p>
  }
}
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
console.log(errorInf)
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
          <DialogContentText  id="alert-dialog-slide-description">
            <p className={style.titleModal}> How much do yoy want to Withdraw?</p>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          <Box
            component="form"
            sx={{
             '& .MuiTextField-root': { m: 1, width: '30ch' },
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
             
             onChange={(e) => {
              errorInfi(e.target.value, bINFI),
              setInfi(e.target.value)
             
             }}
            
          />
          { textError(errorInfi)}
        </div>
         <span>You have {bINFI} INFI in youy balance</span>
        </Box>
          </DialogContentText>
      
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          You are about to withdraw: <spam className={style.spam}>{infi} INFI</spam>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          Transaction fee: <spam className={style.spam}>10%</spam>
          </DialogContentText>
          <DialogContentText id="alert-dialog-slide-description">
          You will receive: <spam className={style.spam}>{calcularPorcentaje(infi)} BUSD</spam>
          </DialogContentText> 
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} className={style.btn}>Go back</Button>
          <Button 
           
             disabled={!errorInf}
              onClick={async () => {
                handleClose()
                 await sendWriteTransactions(
                 await getContractData('/addressContract', 'text'),
                 await getContractData('/abiContract', 'json'),
                  'withdraw',
                [infi.toString()]
                 ).then(response => {
               console.log(response);
            }).catch(error => console.log(error))
          }
        }
           className={style.btnWhiteDraw}>White Draw</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}