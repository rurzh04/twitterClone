import React from 'react';

import { Link, useParams } from 'react-router-dom';
import { useGetTwitterIDQuery } from '../../store/api/tweets/tweetsApi';
import {
    Avatar,
    Box,
    CircularProgress,
    IconButton,
    Paper,
    Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';

import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepostIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/FileUploadOutlined';

const FullTweet: React.FC = (): React.ReactElement => {
    const { id = '' }: string = useParams();
    const { data: tweet = [], isError, isLoading } = useGetTwitterIDQuery(id);

    if (isLoading) {
        return (
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    m: 'auto',
                }}
            >
                <CircularProgress />
            </Box>
        );
    } else if (isError) {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    return (
        <Paper
            variant="outlined"
            sx={{
                display: 'flex',
                flexDirection: 'column',

                borderTop: 0,
                borderLeft: 0,
                borderRight: 0,
                borderRadius: 0,
                p: '10px 15px',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: 'rgb(245,248,250)',
                },
                '& h6': {
                    fontWeight: 800,
                },
            }}
        >
            <Link to={`/home/tweet/${tweet._id}`}>
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        gap: 1,
                        alignItems: 'center',
                    }}
                >
                    <Avatar alt={`Аватар пользователя`} src={tweet._id} />
                    <Typography>
                        <b>{tweet.user.fullName}</b>
                        &nbsp;
                        <Box component="div">
                            <Box component="span" sx={{ color: grey[500] }}>
                                @{tweet.user.userName}
                            </Box>
                            <Box component="span" sx={{ color: grey[500] }}>
                                ·
                            </Box>
                            <Box component="span" sx={{ color: grey[500] }}>
                                {tweet.createdAt}
                            </Box>
                        </Box>
                    </Typography>
                </Box>
                <Typography
                    gutterBottom
                    sx={{
                        mt: 2,
                        mb: 2,
                        fontSize: 24,
                        lineHeight: 1.5,
                    }}
                >
                    {tweet.text}
                </Typography>

                <Box
                    component="div"
                    sx={{
                        width: 450,
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box component="div">
                        <IconButton>
                            <CommentIcon sx={{ fontSize: 20 }} />
                            <Box
                                sx={{
                                    fontSize: 18,
                                    marginLeft: 0.5,
                                }}
                                component="span"
                            >
                                1
                            </Box>
                        </IconButton>
                    </Box>
                    <Box component="div">
                        <IconButton>
                            <RepostIcon sx={{ fontSize: 20 }} />
                            <Box
                                sx={{
                                    fontSize: 18,
                                    marginLeft: 0.5,
                                }}
                                component="span"
                            >
                                1
                            </Box>
                        </IconButton>
                    </Box>
                    <Box component="div">
                        <IconButton>
                            <LikeIcon sx={{ fontSize: 20 }} />
                            <Box
                                sx={{
                                    fontSize: 18,
                                    marginLeft: 0.5,
                                }}
                                component="span"
                            >
                                1
                            </Box>
                        </IconButton>
                    </Box>
                    <Box component="div">
                        <IconButton>
                            <ShareIcon sx={{ fontSize: 20 }} />
                            <Box
                                sx={{
                                    fontSize: 18,
                                    marginLeft: 0.5,
                                }}
                                component="span"
                            >
                                1
                            </Box>
                        </IconButton>
                    </Box>
                </Box>
            </Link>
        </Paper>
    );
};

export default FullTweet;
