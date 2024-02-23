import { Avatar, Box, Menu, MenuItem, Typography, colors } from '@mui/material';
import React, { useState } from 'react';
import { useAppSelector } from '../../store/store';
import { ArrowBack } from '@mui/icons-material';
import { Link } from 'react-router-dom';

const UserSideProfile = () => {
    const userData = useAppSelector((state) => state.userSlice.user);

    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>();

    const handleOpenPopur = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ): void => {
        setAnchorEl(event.currentTarget);
    };

    const handleClosePopur = (): void => {
        setAnchorEl(null);
    };

    const handleSignOut = (): void => {
        window.localStorage.removeItem('token');
    };

    if (!userData) {
        return null;
    }

    return (
        <>
            <Box
                component="div"
                sx={{
                    display: 'flex',
                    gap: 3,
                    cursor: 'pointer',
                    borderRadius: 3,
                    padding: '5px 10px',
                    '&: hover': {
                        backgroundColor: colors.blue[100],
                    },
                }}
                onClick={handleOpenPopur}
            >
                <Avatar src={userData.avatarUrl} />

                <Box
                    component="div"
                    sx={{
                        display: 'flex',
                    }}
                >
                    <Box component="b">
                        {userData.fullName}
                        <Typography sx={{ color: colors.grey[500] }}>
                            @{userData.userName}
                        </Typography>
                    </Box>

                    <ArrowBack />
                </Box>
            </Box>
            <Menu
                sx={{
                    b: '100px',
                    t: 'auto',
                    left: '80px',
                    w: '250px',
                    boxShadow: '1px 1px 10px rgba(0,0,0,0.08)',
                    borderRadius: '20px',
                    border: '1px solid rgba(0,0,0, 0.1)',
                }}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClosePopur}
            >
                <Link to={`/users/rurzh`}>
                    <MenuItem onClick={handleClosePopur}>Profile</MenuItem>
                </Link>
                <Link to={`/users/rurzh`}>
                    <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                </Link>
            </Menu>
        </>
    );
};

export default UserSideProfile;
