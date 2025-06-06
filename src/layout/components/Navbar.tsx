import React, { useState } from 'react'
import LoginButton from '../../common/components/LoginButton'
import { Avatar, Box, Button, Typography } from '@mui/material'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'
import profileImage from '../../assets/default.png'

const Navbar = () => {
    const {data:userProfile} = useGetCurrentUserProfile()
    const [logout, setLogout] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('access_token')
        window.location.href = '/'
    }
    return (
        <Box display="flex" justifyContent="flex-end" alignItems="center" height="64px">
            {userProfile ? (
                <Box position="relative">
                    <img
                        src={profileImage}
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
                    {logout && (
                        <Button
                            variant="outlined"
                            size="small"
                            sx={{ position: 'absolute', top: '100%', right: 0,whiteSpace: 'nowrap', backgroundColor:'black',color:'white','&:hover': {
                            backgroundColor: '#333',
                            borderColor: '#333',
                            } }}
                            onClick={handleLogout}
                        >
                            로그아웃
                        </Button>
                    )}
                </Box>
            ) : (
                <LoginButton />
            )}
        </Box>
    )
}

export default Navbar