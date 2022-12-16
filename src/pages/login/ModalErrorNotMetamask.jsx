import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from "@mui/material";


const ModalErrorNotMetamask = ({activeAlert, setCloseMetamaskNotFound}) => {


    return (
        <div>
            <Dialog
                open={activeAlert}
                onClose={setCloseMetamaskNotFound}
                sx={{ padding: '0 20px 20px 20px'}}
            >
                <DialogTitle>Something went wrong
                </DialogTitle>
                <DialogContent>
                    <DialogContentText sx={{color: '#25292A', 
                    borderBottom: '1px solid #B4B4B4',
                    paddingBottom: '10px'
                    }}>
                        You don't have metamask installed.                   
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={setCloseMetamaskNotFound}
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

  export default ModalErrorNotMetamask;