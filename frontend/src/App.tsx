import { Suspense, useEffect } from 'react';
import {
    Route,
    Routes,
    useNavigate,
    Navigate,
    useLocation,
} from 'react-router-dom';
import SignIn from './page/signin/index.tsx';
import Home from './page/home/Home.tsx';
import { useGetMeQuery } from './store/api/user/userApi.ts';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useAppSelector } from './store/store.ts';
function App() {
    const { data: user = [], isLoading } = useGetMeQuery();
    const userInfo = useAppSelector((state) => state.userSlice.user);
    const navigate = useNavigate();
    const location = useLocation();
    console.log(location);
    // useEffect(() => {
    //     if (userInfo == null && isLoading) {
    //         navigate('/signin'); // Если пользователь аутентифицирован, перенаправляем его на домашнюю страницу
    //     } else if (location.pathname == '/signin') {
    //         navigate('/home');
    //     }
    // }, [userInfo, navigate]);

    return (
        <>
            <Suspense
                fallback={
                    <TwitterIcon
                        color="primary"
                        sx={{ w: 50, h: 50, m: 'auto', fontSize: 36 }}
                    />
                }
            >
                <Routes>
                    <Route path="/*" element={<Home />} />

                    <Route
                        path="/signin"
                        element={userInfo ? <Navigate to="/" /> : <SignIn />}
                    />
                </Routes>
            </Suspense>
        </>
    );
}

export default App;
