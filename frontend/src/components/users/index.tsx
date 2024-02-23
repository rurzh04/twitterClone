import {
    Avatar,
    Box,
    Button,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Typography,
} from '@mui/material';
import { PersonAdd } from '@mui/icons-material';

const Users = () => {
    return (
        <Paper
            sx={{
                mt: 5,
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
                <Box component="b">Кого читать</Box>
            </Paper>

            <List>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar alt="Aitzhan Arnat" src="" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Dock of Shame"
                        secondary={
                            <Typography component="span" variant="body2">
                                @rurzh
                            </Typography>
                        }
                    />
                    <Button color="primary">
                        <PersonAdd />
                    </Button>
                </ListItem>
                <Divider component="li" />
            </List>
        </Paper>
    );
};

export default Users;
