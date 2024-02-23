import Paper from '@mui/material/Paper';

import {
    Avatar,
    CircularProgress,
    IconButton,
    Typography,
} from '@mui/material';
import ImageList from '../ImageList';
import { Box } from '@mui/system';
import { grey } from '@mui/material/colors';

import CommentIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import RepostIcon from '@mui/icons-material/RepeatOutlined';
import LikeIcon from '@mui/icons-material/FavoriteBorderOutlined';
import ShareIcon from '@mui/icons-material/FileUploadOutlined';
import { Link } from 'react-router-dom';
import { formatData } from '../../utils/formatData';

import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from 'react';
import { useDeleteTweetMutation } from '../../store/api/tweets/tweetsApi';

interface Props {
    twets: [];
    isLoading: boolean;
    isError: boolean;
}

const ITEM_HEIGHT = 48;
export const Tweet = ({
    twets,
    isLoading,
    isError,
}: Props): React.ReactElement => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const [deleteTweet] = useDeleteTweetMutation();

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleRemove = (id: string): void => {
        console.log(id);
        deleteTweet(id);
        setAnchorEl(null);
    };

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
    return twets.map((tweet) => {
        const { user, text, images } = tweet;
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
                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box
                        component="div"
                        sx={{
                            display: 'flex',
                            gap: 1,
                            alignItems: 'center',
                        }}
                    >
                        <Avatar
                            alt={`Аватар пользователя`}
                            src={user.avatarUrl}
                        />
                        <Typography>
                            <b>{user.fullName}</b>
                            <Box component="span" sx={{ color: grey[500] }}>
                                @{user.userName}
                            </Box>
                            &nbsp;
                            <Box component="span" sx={{ color: grey[500] }}>
                                ·
                            </Box>
                            <Box component="span" sx={{ color: grey[500] }}>
                                {formatData(Date(tweet.createdAt))}
                            </Box>
                        </Typography>
                    </Box>
                    <Box
                        component="div"
                        sx={{
                            w: '30px',
                            h: '30px',
                        }}
                    >
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <MoreVertIcon />
                        </IconButton>
                        <Menu
                            id="long-menu"
                            MenuListProps={{
                                'aria-labelledby': 'long-button',
                            }}
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            PaperProps={{
                                style: {
                                    maxHeight: ITEM_HEIGHT * 4.5,
                                    width: '20ch',
                                },
                            }}
                        >
                            <MenuItem onClick={() => handleRemove(tweet._id)}>
                                Удалить
                            </MenuItem>
                            <MenuItem onClick={handleClose}>
                                Редактировать
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>
                <Link to={`/home/tweet/${tweet._id}`}>
                    <Typography
                        variant="body1"
                        gutterBottom
                        sx={{
                            mt: 2,
                            mb: 2,
                        }}
                    >
                        {text.substring(0, 50)}
                        {images.length > 0 && <ImageList images={images} />}
                    </Typography>
                </Link>
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
            </Paper>
        );
    });
};
