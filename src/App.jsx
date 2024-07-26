import { Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { ColorModeContext, useMode } from './theme';
import ScrollToTop from './components/scroll/ScrollToTop';
import SignUp from './components/header/Signup';
import { useSelector } from 'react-redux';
import HomePage from './scenes/HomePage';
import Dashboard from './components/dashBoard/Dashboard'; // Adjust the import path based on your actual file structure
import UserProfile from './scenes/UserProfile';
import Cart from './components/header/Cart';
import BestDeals from './components/hero/BestDeals';
import PurchaseStepper from './scenes/PurchaseStepper';

function App() {
    const [theme, colorMode] = useMode();
    // @ts-ignore
    const user = useSelector((state) => state?.auth);
    // console.log(user);
    const isAdmin = user?.isAdmin;

    return (
        <ColorModeContext.Provider
            // @ts-ignore
            value={colorMode}>
            <ThemeProvider
                // @ts-ignore
                theme={theme}>
                <CssBaseline />
                <ScrollToTop />
                <Routes>
                <Route path="/homepage" element={<HomePage />} />
                <Route path="/homepage/purchase" element={<PurchaseStepper />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/bestdeals" element={<BestDeals />} />
                    <Route path="/homepage/userprofile" element={<UserProfile />} />
                    <Route path="/homepage/cart" element={<Cart />} />
                    <Route
                        path="/dashboard"
                        element={
                            isAdmin ? (
                                isAdmin ? <Dashboard /> : <Navigate to="/homepage" />
                            ) : (
                                <Navigate to="/homepage" />
                            )
                        }
                    />
                    <Route path="*" element={<HomePage />} />

                </Routes>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
