import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";


const ModalErrorType = ({open, handleClose}) => {

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                sx={{ padding: '0 20px 20px 20px'}}
            >
                <DialogTitle>Something went wrong
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: '#25292A', 
                    borderBottom: '1px solid #B4B4B4',
                    paddingBottom: '10px'
                    }}>
                      Our developers are working to solve the problem as quickly as possible.
                    </DialogContentText>
                </DialogContent>
                <DialogActions sx={{padding: '0 20px 15px 0'}}>
                    <Button onClick={handleClose}
                    sx={{
                      background: "linear-gradient(60.23deg, #51BADB 19.54%, #662489 106.78%)",
                      borderRadius: '8px',
                      color: '#fff',
                      fontFamily: 'Poppins',
                      fontSize: '11px',
                      
                    }}
                    >reload page</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
  }

  export default ModalErrorType;