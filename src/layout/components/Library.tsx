import React from 'react'
import EmptyPlaylist from './EmptyPlaylist'
import LibraryHead from './LibraryHead'
import { Box, styled } from '@mui/material'

const ContentBox = styled(Box)(({theme})=>({
    borderRadius:"8px",
    backgroundColor:theme.palette.background.paper,
    color:theme.palette.text.primary,
    width:"100%"
}))
const Library = () => {
  return (
    <ContentBox>
        <EmptyPlaylist/>
    </ContentBox>
  )
}

export default Library