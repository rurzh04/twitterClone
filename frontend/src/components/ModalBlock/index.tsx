import { Box, Modal } from '@mui/material';
type Props = {
    onClose: () => void;
    visible: boolean;
    title: string;
    children: JSX.Element;
};

import CloseIcon from '@mui/icons-material/Close';
import theme from '../../theme';

const ModalBlock = ({ onClose, visible, title, children }: Props) => {
    return (
        <Modal
            open={visible}
            onClose={onClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box
                component="div"
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 590,
                    minHeight: 200,

                    bgcolor: 'background.paper',
                    borderRadius: 3,
                    boxShadow: 24,
                    pt: 2,
                    px: 4,
                    pb: 3,
                }}
            >
                <Box
                    component="div"
                    sx={{
                        minHeight: '20%',
                        borderBottom: '1px solid #000',
                        mb: 1,
                    }}
                >
                    <CloseIcon color="primary" />
                </Box>
                {children}
            </Box>
        </Modal>
    );
};

export default ModalBlock;
