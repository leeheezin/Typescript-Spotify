import { Box, Button, Card, styled, Typography } from '@mui/material'
import React from 'react'
import { NavLink } from 'react-router'
import { getSpotifyAuthUrl } from '../../utils/auth'
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile'


const EmptyPlay = styled(Card)(({theme})=>({
    backgroundColor:theme.palette.background.paper,
    padding:"20px",
    borderRadius:"8px",
}))
const PlayListBtn = styled(Button)({
    textDecoration:"none",
    display:"flex",
    alignItems:"center",
    gap:"20px",
    color:'black',
    backgroundColor:'white',
    padding:"6px 16px",
    fontWeight:"700",
    borderRadius:"20px",
    marginTop:"20px"
})
const EmptyPlaylist = () => {
  const {data:user} = useGetCurrentUserProfile()
  const handleAuthUrl = () => {
    if(!user) getSpotifyAuthUrl()
  }
  return (
    <EmptyPlay>
        <Typography variant='h2' color='white' fontWeight={700}>
        Create your first playlist
        </Typography>
        <Typography fontWeight={500} color='white'>
        It's easy, We'll help you
        </Typography>
        <PlayListBtn variant="contained" color="secondary" onClick={handleAuthUrl}>Create playlist</PlayListBtn>
    </EmptyPlay>
  )
}

export default EmptyPlaylist