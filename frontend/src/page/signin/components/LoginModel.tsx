import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogModal from '../../../components/Dialog';
import { Controller, useForm } from 'react-hook-form';
import { AlertColor, Button, TextField } from '@mui/material';
import Notification from '../../../components/notification';
import { useSignInMutation } from '../../../store/api/user/userApi';

type Props = {
    handleCloseModal: () => void;
    visible: 'signIn' | 'signOut' | 'signUp';
    setVisible: () => void;
};

interface LoginFormSchemaI {
    email: string;
    password: string;
}

const LoginFormSchema = yup.object().shape({
    email: yup.string().email('Неверная почта').required('Введите почту'),
    password: yup.string().min(6, 'Минимальная длина пароля').required(),
});

const LoginModel = ({
    handleCloseModal,
    visible,
    setVisible,
}: Props): React.ReactElement => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<LoginFormSchemaI>({
        resolver: yupResolver(LoginFormSchema),
    });
    const [loginUser, { isError }] = useSignInMutation();

    const onSubmit = async (
        openNotification: (text: string, type: AlertColor) => void,
        data: LoginFormSchemaI
    ) => {
        try {
            if (isError) {
                openNotification('Ошибка сервера ', 'error');
                return;
            }
            const getUser = await {
                username: data.email,
                password: data.password,
            };

            loginUser(getUser).unwrap();
            openNotification('Авторизация успешно', 'success');
        } catch (error) {
            openNotification('Неверный логин или пароль', 'error');
        }
    };

    return (
        <Notification>
            {(openNotification) => (
                <DialogModal
                    title="Войти в Твиттер"
                    open={visible === 'signIn'}
                    onClose={handleCloseModal}
                >
                    <form
                        action=""
                        onSubmit={handleSubmit(
                            onSubmit.bind(null, openNotification)
                        )}
                    >
                        <Controller
                            name="email"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Email"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={{
                                        mb: '15px',
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="password"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    type="password"
                                    fullWidth
                                    label="Пароль"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    defaultValue=""
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{}}
                        >
                            Войти
                        </Button>
                    </form>
                </DialogModal>
            )}
        </Notification>
    );
};

export default LoginModel;
