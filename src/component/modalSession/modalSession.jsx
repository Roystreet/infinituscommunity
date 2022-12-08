import {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import {Dialog, DialogTitle, DialogContent, DialogContentText ,Button} from '@mui/material'


const ModalSession = ({open}) => {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        navigate('/')
    };

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Aviso inicio de sesión</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Parece que hubo un cambio de cuenta. Debes iniciar sesión nuevamente!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} >OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ModalSession;