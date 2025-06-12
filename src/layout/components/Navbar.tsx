import React, { useState, useEffect } from 'react';
import LoginButton from '../../common/components/LoginButton';
import { Box } from '@mui/material';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import profileImage from '../../assets/default.png';
import LogoutButton from '../../common/components/LogoutButton';

const Navbar = () => {
    const { data: userProfile } = useGetCurrentUserProfile();
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!localStorage.getItem("access_token"));
    const [logout, setLogout] = useState(false);

    const userProfileImage = userProfile?.images?.[0]?.url || profileImage;

    // 로그아웃 처리
    const handleLogout = () => {
        localStorage.removeItem("access_token");
        setIsLoggedIn(false); 
        window.location.href = '/'
    };

    useEffect(() => {
        // 로그인 상태 변경을 감지
        setIsLoggedIn(!!localStorage.getItem("access_token"));
    }, [isLoggedIn]);

    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
            {isLoggedIn ? (
                <Box position="relative">
                    <img
                        src={userProfileImage}
                        alt="User profile"
                        onClick={() => setLogout(prev => !prev)}
                        style={{
                            cursor: 'pointer',
                            width: 40,
                            height: 40,
                            borderRadius: '50%',
                            objectFit: 'cover'
                        }}
                    />
                    {logout && <LogoutButton handleLogout={handleLogout} />}
                </Box>
            ) : (
                <LoginButton />
            )}
        </Box>
    );
}

export default Navbar;
