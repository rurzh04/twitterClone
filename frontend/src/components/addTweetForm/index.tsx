import React, { useState } from 'react';
import { styled } from '@mui/system';
import {
    CircularProgress,
    Box,
    Avatar,
    TextareaAutosize,
    Button,
    Alert,
} from '@mui/material';

import { useCreatePostMutation } from '../../store/api/tweets/tweetsApi';
import UploadImages from '../UploadImages';

import { useUploadImageMutation } from '../../store/api/user/userApi';

const Textarea = styled(TextareaAutosize)(
    () => `
    width: 100%;
    height: 45px;
    border: 0;
    font-size: 20px;
    font-weight: 500;
    padding: 12px 0;
    outline:0;
    resize: none;
    `
);

type Props = {
    maxRows: number;
};

export interface ImageObj {
    blobUrl: string;
    file: File;
}

const MAX_LENGTH = 280;
const AddTweetForm = ({ maxRows = 15 }: Props) => {
    const [images, setImage] = useState<ImageObj[]>([]);
    const [uploadimage] = useUploadImageMutation();
    const [createPost, { isLoading, isError }] = useCreatePostMutation();

    const [text, setText] = useState<string>('');
    const textLimitPersent = Math.round((text.length / 280) * 100);
    const textCount = MAX_LENGTH - text.length;

    const handleChangeTextare = (
        e: React.FormEvent<HTMLTextAreaElement>
    ): void => {
        if (e.currentTarget) {
            setText(e.currentTarget.value);
        }
    };

    const handleClickAddTweet = async (e: React.MouseEvent) => {
        e.preventDefault();
        let urls = [];
        for (let i = 0; i < images.length; i++) {
            const file = images[i].file;
            const result = await uploadimage(file); // Дождитесь завершения мутации
            if (result.data) {
                urls.push(result.data);
            }
        }
        const newPost = {
            text,
            images: urls,
        };
        createPost(newPost).unwrap();
        setText('');
        setImage([]);
    };
    return (
        <Box
            component="div"
            sx={{
                display: 'flex',
                flexDirection: 'column',
            }}
        >
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    p: '10px 15px',
                }}
            >
                <Avatar
                    alt={`автор позьзоваетя userAvatar`}
                    src=""
                    sx={{
                        mr: 2,
                        mt: 1,
                    }}
                />
                <Textarea
                    onChange={handleChangeTextare}
                    placeholder="что происходит?"
                    value={text}
                    maxRows={maxRows}
                />
            </Box>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <Box component="div">
                    <UploadImages images={images} onChangeImage={setImage} />
                </Box>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        gap: 2,
                        alignItems: 'center',
                        textAlign: 'center',
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                        }}
                    >
                        {text && (
                            <>
                                <Box component="span">{textCount}</Box>
                                <Box component="div">
                                    <CircularProgress
                                        variant="determinate"
                                        size={20}
                                        thickness={4}
                                        value={
                                            text.length >= MAX_LENGTH
                                                ? 100
                                                : textLimitPersent
                                        }
                                        sx={
                                            text.length >= MAX_LENGTH
                                                ? { color: 'red' }
                                                : undefined
                                        }
                                    />
                                </Box>
                            </>
                        )}
                    </Box>
                    <Button
                        color="primary"
                        variant="contained"
                        disabled={!text || textLimitPersent >= 100}
                        onClick={handleClickAddTweet}
                        sx={{
                            borderRadius: 30,
                            p: '5px 10px 5px 10px',
                            mr: 1,
                        }}
                    >
                        {isLoading ? (
                            <CircularProgress color="primary" size={16} />
                        ) : (
                            'Твитнуть'
                        )}
                    </Button>
                </Box>
            </Box>
            {isError && (
                <Alert aria-label="emoji-plak" severity="error">
                    Ошибка при добавлении твита{' '}
                </Alert>
            )}
        </Box>
    );
};

export default AddTweetForm;
