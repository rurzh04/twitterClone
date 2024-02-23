import { Alert, AlertColor, Snackbar } from '@mui/material';
import React, { useState } from 'react';

type Props = {
    children: (callback: (text: string) => void) => React.ReactElement;
};

const Notification: React.FC<Props> = ({ children }) => {
    const [open, setOpen] = useState<boolean>(false);
    const [notificationObj, setNotificationObj] = useState<{
        text: string;
        type: AlertColor;
    }>();

    const openNotification = (text: string, type: AlertColor): void => {
        setNotificationObj({
            text,
            type,
        });
        setOpen(true);
    };

    return (
        <>
            {children(openNotification)}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert
                    onClose={() => setOpen(false)}
                    severity={notificationObj?.type}
                >
                    {notificationObj?.text}
                </Alert>
            </Snackbar>
        </>
    );
};

export default Notification;
