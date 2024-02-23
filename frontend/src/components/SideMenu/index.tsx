import React, { useState } from 'react';

import AddTweetForm from '../addTweetForm';
import ModalBlock from '../ModalBlock';

import theme from '../../theme';
import { Typography, Button, Hidden, Box, IconButton } from '@mui/material';

import TwitterIcon from '@mui/icons-material/Twitter';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';
import MessageIcon from '@mui/icons-material/MessageOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import SearchIcon from '@mui/icons-material/Search';
import CreateIcon from '@mui/icons-material/Create';

import './sideMenu.scss';
import { Link } from 'react-router-dom';
import UserSideProfile from '../userSideProfile';

const SideMenu: React.FC = (): React.ReactElement => {
    const [visibleTweet, setVisibleTweet] = useState<boolean>(false);

    const handleClickOpenAddTweet = () => {
        setVisibleTweet(true);
    };

    const onCloseAddTweet = () => {
        setVisibleTweet(false);
    };

    return (
        <Box
            component="ul"
            sx={{
                position: 'fixed',
                top: 0,
            }}
        >
            <Box className="sideMenuList">
                <Link to="/home">
                    <IconButton
                        aria-label=""
                        sx={{
                            m: '15px 0',
                        }}
                        color="primary"
                    >
                        <TwitterIcon color="primary" sx={{ fontSize: 36 }} />
                    </IconButton>
                </Link>
            </Box>
            <Box className="sideMenuListItem" component="li">
                <SearchIcon className="sideMenuListItemIcon" />
                <Hidden smDown>
                    <Typography className="sideMenuListItemLabel" variant="h6">
                        Поиск
                    </Typography>
                </Hidden>
            </Box>
            <Box className="sideMenuListItem" component="li">
                <NotificationsIcon className="sideMenuListItemIcon" />
                <Hidden smDown>
                    <Typography className="sideMenuListItemLabel" variant="h6">
                        Уведомления
                    </Typography>
                </Hidden>
            </Box>
            <Box className="sideMenuListItem" component="li">
                <MessageIcon className="sideMenuListItemIcon" />
                <Hidden smDown>
                    <Typography className="sideMenuListItemLabel" variant="h6">
                        Сообщения
                    </Typography>
                </Hidden>
            </Box>
            <Box className="sideMenuListItem" component="li">
                <BookmarkBorderOutlinedIcon className="sideMenuListItemIcon" />
                <Hidden smDown>
                    <Typography className="sideMenuListItemLabel" variant="h6">
                        Закладки
                    </Typography>
                </Hidden>
            </Box>
            <Box className="sideMenuListItem" component="li">
                <ListAltOutlinedIcon className="sideMenuListItemIcon" />
                <Hidden smDown>
                    <Typography className="sideMenuListItemLabel" variant="h6">
                        Список
                    </Typography>
                </Hidden>
            </Box>
            <Box className="sideMenuListItem" component="li">
                <PermIdentityOutlinedIcon className="sideMenuListItemIcon" />
                <Hidden smDown>
                    <Typography className="sideMenuListItemLabel" variant="h6">
                        Профиль
                    </Typography>
                </Hidden>
            </Box>
            <Box
                sx={{
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    mt: theme.spacing(3),
                }}
                component="li"
            >
                <Button
                    onClick={handleClickOpenAddTweet}
                    sx={{
                        borderRadius: 30,
                    }}
                    variant="contained"
                    fullWidth
                    color="primary"
                >
                    <Hidden smDown>Твитнуть</Hidden>
                    <Hidden smUp>
                        <CreateIcon />
                    </Hidden>
                </Button>
                <ModalBlock
                    onClose={onCloseAddTweet}
                    visible={visibleTweet}
                    title=""
                >
                    {/* <Box component="div"> */}
                    <AddTweetForm maxRows={15} />
                    {/* </Box> */}
                </ModalBlock>
            </Box>
            <Box
                component="li"
                sx={{
                    listStyle: 'none',
                    p: 0,
                    m: 0,
                    mt: theme.spacing(7),
                }}
            >
                <UserSideProfile />
            </Box>
        </Box>
    );
};

export default SideMenu;
