import React from 'react';

import { useGetTagsQuery } from '../../store/api/tweets/tweetsApi';

import { grey } from '@mui/material/colors';
import {
    Box,
    CircularProgress,
    Divider,
    List,
    ListItem,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';

import './tags.scss';

const Tags = () => {
    const themes = [
        {
            _id: '659d80c5e3e87a5ac89e99b9',
            name: 'workhistory',
            count: 1234,
            id: '9f52',
        },
        {
            _id: '659d80c5427c753d86629a32',
            name: 'rurzhHell',
            count: 2123,
            id: '427e',
        },
    ];

    return (
        <Paper
            sx={{
                backgroundColor: '#E6ECF0',
                borderRadius: 3,
            }}
        >
            <Paper
                variant="elevation"
                sx={{
                    p: '5px 15px',
                    borderRadius: 3,
                    backgroundColor: '#E6ECF0',
                }}
            >
                <Box component="b">Актуальные темы</Box>
            </Paper>
            <List>
                {themes.map((tag) => (
                    <>
                        <ListItem key={tag._id}>
                            <Link to={`/home/search?q=${tag.name}`}>
                                <ListItemText
                                    sx={{
                                        fontWeight: 800,
                                    }}
                                    primary={`#${tag.name}`}
                                    secondary={
                                        <Typography
                                            component="span"
                                            variant="body2"
                                            color={grey[500]}
                                        >
                                            Твитов: {tag.count}
                                        </Typography>
                                    }
                                />
                            </Link>
                        </ListItem>
                        <Divider component="li" />
                    </>
                ))}
            </List>
        </Paper>
    );
};

export default Tags;
