import { Box, Button, styled, Typography } from '@mui/material'
import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router';
import useCreatePlaylist from '../../hooks/useCreatePlaylist';
import useGetCurrentUserProfile from '../../hooks/useGetCurrentUserProfile';
import { getSpotifyAuthUrl } from '../../utils/auth';

const StyledNavLink = styled(Box)(({theme})=>({
    textDecoration:"none",
    color:"white",
    display:"flex",
    alignItems:"center",
    gap:"20px"
}))
const Header = styled("div")({
    width:"100%",
    textAlien:"center",
    padding:"8px",
})

const LibraryHead = () => {
  const {mutate:createPlaylist} = useCreatePlaylist()
  const { data: user } = useGetCurrentUserProfile()
  const handleCreatePlaylist = () => {
    if(user) {
      createPlaylist({name:"나의플레이리스트"})
    } else {
      getSpotifyAuthUrl()
    }
  }
  return (
    <Header>
        <StyledNavLink>
            <BookmarkIcon/>
            <Typography variant='h2' fontWeight={700}>Your Library</Typography>
            <Button onClick={handleCreatePlaylist}><AddIcon fill='#6ebf66'/></Button>
        </StyledNavLink>
    </Header>
  )
}
export default LibraryHead