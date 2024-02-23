import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserI } from '../api/user/state';

interface IUserState {
    user: UserI | null;
    users: [];
}

const initialState: IUserState = {
    user: null,
};

export const userSlice = createSlice({
    initialState,
    name: 'userSlice',
    reducers: {
        logout: () => initialState,
        setUser: (state, action: PayloadAction<UserI>) => {
            state.user = action.payload;
        },
    },
});

export default userSlice.reducer;
export const { logout, setUser } = userSlice.actions;
