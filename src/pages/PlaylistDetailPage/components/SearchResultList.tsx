import React, { useState, useEffect } from 'react';
import { Track } from '../../../models/playlist';
import {
  Avatar,
  Button,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  styled,
  Typography,
  Box,
} from "@mui/material";
import Loading from '../../../common/components/Loading/Loading';
import { useInView } from 'react-intersection-observer';

interface SearchResultListProps {
  list: Track[];
  keyword: string;
  isLoading: boolean;
}

const PlayListItemContainer = styled(ListItemButton)(({ theme, selected }) => ({
  gap: "16px",
}));

const PlaylistAvatar = styled(Avatar)({
  width: "60px",
  height: "60px",
  borderRadius: "8px",
});

const TitleText = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#fff",
});

const ArtistText = styled(Typography)({
  fontSize: "14px",
  color: "#ccc", // 가수는 연한 회색
  marginTop: "4px",
});

const AlbumText = styled(Typography)({
  fontSize: "13px",
  textAlign: "left",
  color: "#999",
});

const NoResultText = styled(Typography)({
  fontSize: "16px",
  color: "#fff",
  textAlign: "center",
  marginTop: "20px",
});

// React.forwardRef를 사용하여 ref를 props로 받을 수 있도록 수정
const SearchResultList = React.forwardRef<HTMLDivElement, SearchResultListProps>(({ list, keyword, isLoading }, ref) => {
  const [message, setMessage] = useState<string>('');
  useEffect(() => {
    if (isLoading) {
      setMessage('로딩 중...');
    } else if (!keyword) {
      setMessage('아무것도 입력되지 않았습니다.');
    } else if (list.length === 0) {
      setMessage(`No Result for ${keyword}`);
    } else {
      setMessage('');
    }
  }, [keyword, isLoading, list]);

  return (
    <div>
      {isLoading && <Loading isInfiniteScroll={true} />} {/* 로딩 스피너가 보이도록 수정 */}
      {message && !isLoading && <NoResultText>{message}</NoResultText>}
      {list.map((track) => (
        <PlayListItemContainer key={track.id} ref={ref}>
          <ListItemAvatar>
            {track.album.images[0]?.url ? (
              <PlaylistAvatar src={track.album.images[0].url} alt={track.album.name} />
            ) : (
              "No image"
            )}
          </ListItemAvatar>

          <Box sx={{ flexGrow: 1 }}>
            <TitleText>{track.name}</TitleText>
            <ArtistText>{track.artists?.[0]?.name}</ArtistText>
          </Box>
          <AlbumText>{track.album?.name}</AlbumText>

          <Button variant="outlined" color="secondary" size="medium">
            추가하기
          </Button>
        </PlayListItemContainer>
      ))}
    </div>
  );
});

export default SearchResultList;
