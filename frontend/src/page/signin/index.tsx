import { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import { Box, Button, Typography } from '@mui/material';

import { Twitter } from '@mui/icons-material';
import theme from '../../theme';
import SideMenu from '../../components/SideMenu';
import LoginModel from './components/LoginModel';
import RegisterModel from './components/RegisterModel';
import { useAppSelector } from '../../store/store';

const SignIn: React.FC = (): React.ReactElement => {
    // const [open, setOpen] = useState<boolean>(false);
    const [visible, setVisible] = useState<'signIn' | 'signOut' | 'signUp'>();
    const navigate = useNavigate();
    const userInfo = useAppSelector((state) => state.userSlice.user);
    // modal 2
    const handleClickOpenSignIn = (): void => {
        setVisible('signIn');
    };
    const handleClickOpenSignUp = () => {
        setVisible('signUp');
    };
    const handleCloseModal = (): void => {
        setVisible(undefined);
    };
    // useEffect(() => {
    //     if (userInfo != null) {
    //         navigate('/home');
    //     }
    // }, [navigate]);
    return (
        <Box
            sx={{
                display: 'flex',
                height: 'calc(100vh - 84px)',
                '.blueSide': {
                    backgroundColor: '#71c9f8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flex: '0 0 50%',
                    overflow: 'hidden',
                    position: 'relative',
                },
                '.blueSideListInfo': {
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    width: 380,

                    '& h6': {
                        color: '#fff',
                        display: 'flex',
                        alignItems: 'center',
                        fontWeight: 600,
                        fontSize: '20px',
                    },
                },
                '.blueSideBigIcon': {
                    position: 'absolute',
                    left: '50%',
                    top: '53%',
                    transform: 'translate(-50%,-50%)',
                    width: '260%',
                    height: '260%',
                },
                '.blueSideListInfoItem': {
                    position: 'relative',
                    marginBottom: '40px',
                },
                '.blueSideListInfoIcon': {
                    fontSize: 32,
                    marginRight: '15px',
                },
                '.loginSide': {
                    flex: '0 0 50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                },
                '.loginSideTwitterIcon': {
                    fontSize: 45,
                },
                '.loginSideWrapper': {
                    width: 380,
                },
                '.loginSideTitle': {
                    fontWeight: 600,
                    fontSize: 32,
                    marginTop: '20px',
                    marginBottom: '55px',
                },
                '.loginSideField': {
                    marginBottom: '18px',
                },
                '.registerField': {
                    marginBottom: theme.spacing(4),
                },
                '.registerFormControl': {
                    marginBottom: theme.spacing(2),
                },
            }}
        >
            <section className="blueSide">
                <Twitter className="blueSideBigIcon" color="primary" />
                <SideMenu />
            </section>
            <section className="loginSide">
                <div className="loginSideWrapper">
                    <Twitter className="loginSideTwitterIcon" color="primary" />
                    <Typography className="loginSideTitle" variant="h4">
                        Узнайте, что происходит в мире прямо сейчас
                    </Typography>
                    <Typography>
                        <b>Присоединяйтесь к Твиттеру прямо сейчас!</b>
                    </Typography>
                    <br />
                    <Button
                        style={{ marginBottom: '20px', borderRadius: '20px' }}
                        variant="contained"
                        color="primary"
                        fullWidth
                        onClick={handleClickOpenSignUp}
                    >
                        Зарегистрироваться
                    </Button>
                    <Button
                        style={{ borderRadius: '20px' }}
                        variant="outlined"
                        color="primary"
                        fullWidth
                        onClick={handleClickOpenSignIn}
                    >
                        Войти
                    </Button>

                    {/* модальное окно */}
                    <LoginModel
                        handleCloseModal={handleCloseModal}
                        visible={visible}
                        setVisible={setVisible}
                    />

                    {/* модальное окно 2 */}
                    <RegisterModel
                        handleCloseModal={handleCloseModal}
                        visible={visible}
                        setVisible={setVisible}
                    />
                    {/* end */}
                </div>
            </section>
        </Box>
    );
};

export default SignIn;
