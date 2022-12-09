import {useState, useEffect} from 'react'
import {Box, Typography, Select, TextField, MenuItem, Alert, AlertTitle } from '@mui/material'
import lineSetting from './assets/lineSetting.svg'
import imgProfile from './assets/imgProfile.svg'
import editIcon from './assets/editIcon.svg'
import lineDiv from './assets/lineDiv.svg'
import style from './styles/settings.module.css'
// import { SwitchComponent } from './switch'
import SwitchComponent from './assets/switchComponent.svg'
import { prepareServerConnection } from '../../functions/serverInteractions'

const Settings = () => {

    const [active, setActive] = useState(true)
    const [name, setName] = useState('')
    const [oldName, setOldName] = useState('')
    const [MyInfo, setMyInfo] = useState([])
    const [errorNick, setErrorNick] = useState(null)
    const getMyInfo = async () => {
        const result = await prepareServerConnection(
            {address: localStorage.getItem('address')},
            '/user/getmyinfo',
            'json',
            localStorage.getItem('jwt')
        )
        if (result) {
            setMyInfo(result)
            const name = result.nickName
            setOldName(name)
            setName(oldName)
        }
    }
    
    useEffect(() => {
        getMyInfo()
    }, [oldName])

    const handleChange = (e) => {
        setName(e.target.value)
    }
    const inputActive = () => {
        setActive(!true)
    }

    const setClose = () => {
        setErrorNick(false)
    }
    
    const setChangeName = async () => {
        setActive(true)
        await prepareServerConnection(
            {
                address: localStorage.getItem('address'),
                oldNickName: oldName,
                newNickName: name
            },
            '/user/changenickname',
            'text',
            localStorage.getItem('jwt')
        ).then((response) => {
            if (response.includes('errors')){
                setErrorNick(true)
            }    
            
        }).catch((error) => {
            console.log('Hubo un error', error)
        })
    }

    return (
        <Box >
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                marginTop: '34px'
            }}>
                <Typography sx={{
                    color: "#333",
                    fontSize: "1.4rem",
                    marginLeft: '27px'
                }}>Account</Typography>
                <img src={lineSetting} className={style.lineSetting}/>
            </Box>
            <Box sx={{
                display: 'flex',
                marginTop: '40px',
                marginLeft: '27px',
                marginRight: '27px'
            }}>
                <img src={imgProfile} className={style.imgProfile} />
                <Box sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '40px'
                }}>
                    <Box sx={{
                        marginLeft: '20px',
                    }}>
                        <TextField 
                            id="outlined-basic" 
                            // label="InsertName" 
                            variant="outlined"
                            value={name}
                            sx={{
                                border: 0,
                            }}
                            onChange={e => handleChange(e)}
                            onBlur={setChangeName}
                            disabled={active}
                            onClick={inputActive}
                            
                        />
                    </Box>
                    <img src={editIcon} className={style.editIcon} onClick={inputActive} />
                </Box>
            </Box>
            <Box sx={{
                marginTop: '40px',
                display: 'flex',
                justifyContent:'center'
            }}>
                <img src={lineDiv} className={style.lineDiv} />
            </Box>
            <Box sx={{
                marginTop: '20px',
                marginLeft: '27px',
                marginRight: '27px'
            }}>
                <Typography sx={{
                    fontSize: '1.6rem'
                }}>Lenguage</Typography>
                <Box sx={{
                    marginTop: '12px',

                }}>
                    <Select sx={{
                        width: '100%',
                        boxShadow: '0px 4px 4px rgba(0,0,0,0.15)',
                        border: 0,
                        borderRadius: '8px'

                    }} value={'Español'}>
                        <MenuItem value='Español'>Español</MenuItem>
                        <MenuItem disabled>Ingles</MenuItem>
                        <MenuItem disabled>Portugues</MenuItem>
                        <MenuItem disabled>Italiano</MenuItem>
                    </Select>
                </Box>
            </Box>
            <Box sx={{
                marginTop: '20px',
                marginLeft: '27px',
                marginRight: '27px'
            }}>
                <Typography sx={{
                    fontSize: '1.6rem'
                }}>Mode</Typography>
                <Box sx={{
                    marginTop: '12px'
                }}>
                    <img src={SwitchComponent} />
                </Box>
            </Box>
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'relative',
                top: '100px',
                height: 'max-content',
                zIndex: '0'
            }}>
                {
                    errorNick ? 
                    <Alert severity="error" sx={{
                    fontSize: '1rem',
                    zIndex: 4,
                    bottom: '15px',
                    width: '80%'
                    }}
                    onClose={setClose}
                    >
                    <AlertTitle sx={{fontSize: '1.2rem'}}>Hubo un error</AlertTitle>
                        No se acepta espacios ni carácteres especiales.
                        Solo: _ y - 
                    </Alert>
                    : null
                }
            </Box>
        </Box>
    )
}

export default Settings;