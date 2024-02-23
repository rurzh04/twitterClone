import DialogModal from '../../../components/Dialog';

import { AlertColor, Button, TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Notification from '../../../components/notification';
import { useRegisterUserMutation } from '../../../store/api/user/userApi';

type Props = {
    handleCloseModal: () => void;
    visible: 'signIn' | 'signOut' | 'signUp';
    setVisible: () => void;
};

interface RegisterFormSchemaI {
    email: string;
    userName: string;
    fullName: string;
    password: string;
    password2: string;
}

const RegisterYup = yup.object().shape({
    email: yup
        .string()
        .email('Неверная почта')
        .required('Введите почту')
        .required(),
    userName: yup
        .string()
        .min(2, 'Минимальная длина имени 2')
        .max(40, 'Максимальная длина имени 40')
        .required(),
    fullName: yup
        .string()
        .min(2, 'Минимальная длина полный имени 2')
        .max(40, 'Максимальная длина полный имени 40')
        .required(),

    password: yup.string().min(6, 'Минимальная длина пароля').required(),
    password2: yup
        .string()
        .min(6, 'Минимальная длина пароля')
        .required()
        .oneOf([yup.ref('password')], 'Пароли не совпадает'),
});

const RegisterModel = ({
    handleCloseModal,
    visible,
    setVisible,
}: Props): React.ReactElement => {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<RegisterFormSchemaI>({
        resolver: yupResolver(RegisterYup),
    });
    const [registerUser, { isError }] = useRegisterUserMutation();
    const onSubmit = async (
        openNotification: (text: string, type: AlertColor) => void,
        data: RegisterFormSchemaI
    ) => {
        try {
            if (isError) {
                openNotification('Ошибка сервера ', 'error');
                return;
            }

            registerUser(data).unwrap();

            openNotification('Регистрация прошла успешно', 'success');
            // setVisible('signOut');
        } catch (error) {
            openNotification('Ошибка при регистраций', 'error');
        }
    };

    return (
        <Notification>
            {(openNotification) => (
                <DialogModal
                    title="Создайте учетную запись"
                    open={visible === 'signUp'}
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
                            name="userName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Name"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    error={!!errors.userName}
                                    helperText={errors.userName?.message}
                                    sx={{
                                        mb: '15px',
                                    }}
                                />
                            )}
                        />
                        <Controller
                            name="fullName"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Full Name"
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    error={!!errors.fullName}
                                    helperText={errors.fullName?.message}
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
                        <Controller
                            name="password2"
                            control={control}
                            defaultValue=""
                            render={({ field }) => (
                                <TextField
                                    sx={{
                                        my: 3,
                                    }}
                                    {...field}
                                    fullWidth
                                    label="Пароль повторно"
                                    type="password"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    variant="outlined"
                                    defaultValue=""
                                    error={!!errors.password2}
                                    helperText={errors.password2?.message}
                                />
                            )}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                        >
                            Войти
                        </Button>
                    </form>
                </DialogModal>
            )}
        </Notification>
    );
};

export default RegisterModel;
