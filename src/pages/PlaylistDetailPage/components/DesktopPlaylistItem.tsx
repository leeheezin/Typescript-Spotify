import React, { forwardRef } from 'react'
import { Episode, PlaylistTrack, Track } from '../../../models/playlist';
import { ListItemButton, styled, TableCell, TableRow } from '@mui/material';

interface DesktopPlaylistItemProps{
    index:number;
    item:PlaylistTrack
}
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
  borderBottom:'none',
}));
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom:'none',
}));
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);  
  return date.toLocaleDateString('en-CA');  
};
const formatDuration = (durationMs: number): string => {
  const minutes = Math.floor(durationMs / 60000); 
  const seconds = Math.floor((durationMs % 60000) / 1000);
  return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};
const DesktopPlaylistItem = forwardRef<HTMLTableRowElement, DesktopPlaylistItemProps>(({ item, index }, ref)  => {
    const isEpisode = (track:Track|Episode):track is Episode => {
        return "description" in track
    }   
    return (
        <StyledTableRow ref={ref}>
            <StyledTableCell>
                {index}
            </StyledTableCell>
            <StyledTableCell>
                {item.track.name || 'No name'}
            </StyledTableCell>
            <StyledTableCell>
                {isEpisode (item.track) ? "N/A" : item.track.album?.name}
            </StyledTableCell>
            <StyledTableCell>
                {item.added_at ? formatDate(item.added_at) : 'Unknown'}
            </StyledTableCell>
            <StyledTableCell>
                {item.track.duration_ms ? formatDuration(item.track.duration_ms) :'Unknown'}
            </StyledTableCell>
        </StyledTableRow>
    )
})

export default DesktopPlaylistItem