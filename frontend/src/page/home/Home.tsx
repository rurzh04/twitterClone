import React from 'react';
import SideMenu from '../../components/SideMenu';
import { Tweet } from '../../components/Tweet';

import {
    Grid,
    Paper,
    Container,
    InputAdornment,
    TextField,
    Typography,
    Box,
} from '@mui/material';
import { useGetTwittersQuery } from '../../store/api/tweets/tweetsApi';
import Users from '../../components/users';
import { styled } from '@mui/system';
import theme from '../../theme';

import SearchIcon from '@mui/icons-material/Search';

import AddTweetForm from '../../components/addTweetForm';

import Tags from '../../components/Tags';
import { Route, Routes } from 'react-router-dom';
import FullTweet from '../../components/fullTweet';

import './home.scss';
const SearchTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        borderRadius: 30,
        backgroundColor: '#E6ECF0',
        padding: 0,
        paddingLeft: 15,
        '& .Mui-focused': {
            backgroundColor: '#fff',
            '& fieldset': {
                borderWidth: 1,
                borderColor: theme.palette,
            },
            '& svg path': {
                fill: theme.palette.primary.main,
            },
        },
        '&:hover': {
            '& fieldset': { borderColor: 'transparent' },
        },
        '& fieldset': {
            borderColor: 'transparent',
            borderWidth: 1,
        },
    },
    '& .MuiOutlinedInput-input': {
        padding: '12px 14px 14px 5px',
    },
});

const Home = (): React.ReactElement => {
    const { data: twets = [], isError, isLoading } = useGetTwittersQuery();
    return (
        <Container sx={{ height: '100vh' }} maxWidth="lg">
            <Grid container spacing={3}>
                <Grid sm={1} md={3} item>
                    <SideMenu />
                </Grid>
                <Grid item sm={8} md={6}>
                    <Paper
                        sx={{
                            height: '100%',
                            borderRadius: 0,
                            borderBottom: 0,
                            borderTop: 0,
                        }}
                        variant="outlined"
                    >
                        <Routes>
                            {['/', 'home', 'home/search'].map((path) => (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        <>
                                            <Paper
                                                variant="outlined"
                                                sx={{
                                                    borderTop: 0,
                                                    borderLeft: 0,
                                                    borderRight: 0,
                                                    borderRadius: 0,
                                                    p: '10px 15px',
                                                    '& h6': {
                                                        fontWeight: 800,
                                                    },
                                                }}
                                            >
                                                <Typography variant="h6">
                                                    Твиты
                                                </Typography>
                                            </Paper>
                                            <AddTweetForm maxRows={11} />
                                        </>
                                    }
                                />
                            ))}
                            {/* <Route
                                path="home/tweet/:id"
                                element={
                                    <>
                                        <Paper
                                            variant="outlined"
                                            sx={{
                                                borderTop: 0,
                                                borderLeft: 0,
                                                borderRight: 0,
                                                borderRadius: 0,
                                                display: 'flex',
                                                gap: 1,
                                                p: '10px 15px',
                                                '& h6': {
                                                    fontWeight: 800,
                                                },
                                            }}
                                        >
                                            <IconButton
                                                color="primary"
                                                onClick={() => navigate(-1)}
                                            >
                                                <ArrowBack />
                                            </IconButton>
                                            <Typography variant="h6">
                                                Твитнуть
                                            </Typography>
                                        </Paper>
                                        <AddTweetForm maxRows={11} />
                                    </>
                                }
                            /> */}
                        </Routes>

                        {/*  */}

                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <Tweet
                                        twets={twets}
                                        isError={isError}
                                        isLoading={isLoading}
                                    />
                                }
                            />
                            <Route
                                path="home"
                                element={
                                    <Tweet
                                        twets={twets}
                                        isError={isError}
                                        isLoading={isLoading}
                                    />
                                }
                            />
                            <Route
                                path="home/tweet/:id"
                                element={<FullTweet />}
                            />
                        </Routes>
                    </Paper>
                </Grid>
                <Grid item sm={3} md={3}>
                    <Box component="div">
                        <SearchTextField
                            sx={{
                                m: 2,
                            }}
                            id="demo-helper-text-misaligned"
                            label="Поиск по твиттеру"
                            inputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ),
                            }}
                            fullWidth
                        />
                        <Tags />
                        <Users />
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
