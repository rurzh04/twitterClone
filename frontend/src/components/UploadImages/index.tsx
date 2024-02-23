import { useEffect, useRef } from 'react';
import { ImageOutlined } from '@mui/icons-material';
import { Box, IconButton } from '@mui/material';
import { ImageObj } from '../addTweetForm';
import ImageList from '../ImageList';

interface UploadImageProps {
    images: ImageObj[];
    onChangeImage: (callback: (prev: ImageObj[]) => ImageObj[]) => void;
}

const UploadImages = ({ onChangeImage, images }: UploadImageProps) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClickImage = () => {
        if (inputRef.current) {
            inputRef.current.click();
        }
    };
    const handleFileChange = (event: Event) => {
        const target = event.target as HTMLInputElement;
        const file = target.files?.[0];
        if (file) {
            const fileObj = new Blob([file]);
            onChangeImage((prev) => [
                ...prev,
                {
                    blobUrl: URL.createObjectURL(fileObj),
                    file,
                },
            ]);
        }
    };

    const removeImage = (url: string) => {
        onChangeImage((prev) => prev.filter((obj) => url !== obj.blobUrl));
    };

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.addEventListener('change', handleFileChange);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener(
                    'change',
                    handleFileChange
                );
            }
        };
    }, []);

    return (
        <div>
            <ImageList
                images={images.map((obj) => obj.blobUrl)}
                removeImage={removeImage}
            />
            <IconButton onClick={handleClickImage} color="secondary">
                <ImageOutlined
                    sx={{
                        fontSize: '26px',
                    }}
                />
            </IconButton>
            <Box ref={inputRef} component="input" type="file" hidden />
        </div>
    );
};

export default UploadImages;
