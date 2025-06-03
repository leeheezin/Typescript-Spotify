import { Button, styled, Typography } from '@mui/material'
import React from 'react'
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from 'react-router';

const StyledNavLink = styled(NavLink)(({theme})=>({
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
  return (
    <Header>
        <StyledNavLink to="/playlist">
            <BookmarkIcon/>
            <Typography variant='h2' fontWeight={700}>Your Library</Typography>
            <Button><AddIcon fill='#6ebf66'/></Button>
        </StyledNavLink>
    </Header>
  )
}
export default LibraryHead