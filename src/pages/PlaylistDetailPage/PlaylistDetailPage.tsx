import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router";
import useGetPlaylist from "../../hooks/useGetPlaylist";
import MusicNoteIcon from "@mui/icons-material/MusicNote";
import {
  Box,
  Grid,
  ListItemButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import useGetPlaylistItems from "../../hooks/useGetPlaylistItems";
import DesktopPlaylistItem from "./components/DesktopPlaylistItem";
import { PAGE_LIMIT } from "../../configs/commonConfig";
import { useInView } from "react-intersection-observer";
import Loading from "../../common/components/Loading/Loading";

interface PlaylistItemProps {
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  inFetchingNextPage?: boolean;
}
const PlayListWrap = styled("div")({
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  msOverflowStyle: "none",
});
const PlaylistHeader = styled(Grid)({
  display: "flex",
  alignItems: "center",
  background: " linear-gradient(transparent 0, rgba(0, 0, 0, .5) 100%)",
  padding: "16px",
});
const ImageGrid = styled(Grid)(({ theme }) => ({
  [theme.breakpoints.down("sm")]: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
  },
}));
const AlbumImage = styled("img")(({ theme }) => ({
  borderRadius: "8px",
  height: "auto",
  width: "100%",

  [theme.breakpoints.down("md")]: {
    maxWidth: "200px",
  },
}));
const ResponsiveTypography = styled(Typography)(({ theme }) => ({
  fontSize: "3rem",
  textAlign: "left",

  [theme.breakpoints.down("md")]: {
    fontSize: "1rem",
  },
}));
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  height: "calc(100% - 235px)",
  maxHeight:"470px",
  borderRadius: "8px",
  overflowY: "auto",
  "&::-webkit-scrollbar": {
    display: "none",
  },
  msOverflowStyle: "none", // IE and Edge
  scrollbarWidth: "none", // Firefox
}));
const StyledTableHead = styled(TableHead)({
  position: "sticky", // 스크롤 시 헤더 고정
  top: 0, // 상단 고정
  zIndex: 1, // 다른 요소들보다 위에 고정되도록 설정
  background: "#121212",
  borderBottom: "1px solid #ccc",
});
const DefaultImage = styled(Box)({
  backgroundColor: "#282828",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "8px",
  minWidth: "128px",
  height: "20vh",
  width: "20vh",
  boxShadow:
    "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
});
const PlaylistDetailPage: React.FC<PlaylistItemProps> = () => {
  const { id } = useParams<{ id: string }>();
  const { ref, inView } = useInView();
  const [isInfiniteScroll, setIsInfiniteScroll] = useState(false);
  if (!id) {
    return <Navigate to="/" />;
  }
  const { data: playlist } = useGetPlaylist({ playlist_id: id });
  const {
    data: playlistItem,
    isLoading: isPlaylistItemLoading,
    error: playlistItemError,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useGetPlaylistItems({ playlist_id: id, limit: PAGE_LIMIT });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);
  useEffect(() => {
    if (inView) {
      setIsInfiniteScroll(true); // 무한 스크롤이 활성화되면 true
    } else {
      setIsInfiniteScroll(false); // 무한 스크롤이 끝나면 false
    }
  }, [inView]);
  return (
    <PlayListWrap>
      <PlaylistHeader container spacing={7}>
        <ImageGrid size={{ sm: 12, md: 2 }}>
          {playlist?.images ? (
            <AlbumImage
              src={playlist?.images[0].url}
              alt="playlist_cover.jpg"
            />
          ) : (
            <DefaultImage>
              <MusicNoteIcon fontSize="large" />
            </DefaultImage>
          )}
        </ImageGrid>
        <Grid size={{ sm: 12, md: 10 }}>
          <Box>
            <ResponsiveTypography variant="h1" color="white">
              {playlist?.name}
            </ResponsiveTypography>

            <Box display="flex" alignItems="center">
              <img
                src="https://i.scdn.co/image/ab67757000003b8255c25988a6ac314394d3fbf5"
                width="20px"
              />
              <Typography
                variant="subtitle1"
                color="white"
                ml={1}
                fontWeight={700}
              >
                {playlist?.owner?.display_name
                  ? playlist?.owner.display_name
                  : "unknown"}
              </Typography>
              <Typography variant="subtitle1" color="white">
                • {playlist?.tracks?.total} songs
              </Typography>
            </Box>
          </Box>
        </Grid>
      </PlaylistHeader>
      {playlist?.tracks?.total === 0 ? (
        <Typography>search</Typography>
      ) : (
        <StyledTableContainer>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Album</TableCell>
                <TableCell>Date added</TableCell>
                <TableCell>Duration</TableCell>
              </TableRow>
            </StyledTableHead>

            <TableBody>
              {playlistItem?.pages.map((page, pageIndex) =>
                page.items.map((item, Itemindex) => {
                  return (
                    <DesktopPlaylistItem
                      item={item}
                      key={pageIndex * PAGE_LIMIT + Itemindex + 1}
                      index={pageIndex * PAGE_LIMIT + Itemindex + 1}
                      ref={Itemindex === page.items.length - 1 ? ref : null}
                    />
                  );
                })
              )}
            </TableBody>
          </Table>
          {isFetchingNextPage && <Loading isInfiniteScroll={isInfiniteScroll}/>}
        </StyledTableContainer>
      )}
    </PlayListWrap>
  );
};

export default PlaylistDetailPage;
