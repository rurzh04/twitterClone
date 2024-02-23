import { Clear } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';

type Props = {
    images: string[];
    removeImage?: (url: string) => void;
};

const ImageList = ({ images, removeImage }: Props) => {
    if (!images.length) {
        return null;
    }

    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                alignItems: 'center',
                mt: '20px',
                flexWrap: 'wrap',
            }}
        >
            {images?.map((url) => (
                <div
                    key={url}
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '6px',
                        marginRight: 10,
                        overflow: 'hidden',
                        backgroundImage: `url(${url})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                >
                    {removeImage && (
                        <IconButton
                            sx={{
                                position: 'relative',
                                top: 5,
                                right: 5,
                                '&: hover': {
                                    backgroundColor: '#fff',
                                },
                            }}
                            onClick={(): void => removeImage(url)}
                            color="primary"
                        >
                            <Clear sx={{ fontSize: '14px' }} />
                        </IconButton>
                    )}
                </div>
            ))}
        </Box>
    );
};

export default ImageList;
