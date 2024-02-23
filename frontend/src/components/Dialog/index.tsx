import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    IconButton,
} from '@mui/material';

import { Close } from '@mui/icons-material';

type Props = {
    title: string;
    children: React.ReactNode;
    open: boolean;
    onClose: () => void;
};

const DialogModal = ({ title, children, open, onClose }: Props) => {
    if (!open) {
        return null;
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="form-dialog-title"
        >
            <DialogTitle id="form-dialog-title">
                <IconButton onClick={onClose} color="secondary">
                    <Close style={{ fontSize: 26 }} color="primary" />
                </IconButton>
                {title}
            </DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    onClick={onClose}
                    fullWidth
                    style={{
                        backgroundColor: '#1da1f2',
                        borderRadius: '20px',
                        color: '#fff',
                    }}
                >
                    Войти
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DialogModal;
