import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import Loading from "../../common/components/Loading/Loading";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { IPlaylist, SimplifiedPlaylist } from "../../models/playlist";
import { useInView } from "react-intersection-observer";
const convertToIPlaylist = (simplifiedPlaylist: SimplifiedPlaylist): IPlaylist => {
  return {
    id: simplifiedPlaylist.id || "",  // `id`가 `undefined`일 경우 빈 문자열 처리
    name: simplifiedPlaylist.name || "Unknown Playlist",  // name이 없으면 기본값 설정
    images: simplifiedPlaylist.images || [],  // images가 없으면 빈 배열 처리
    owner: simplifiedPlaylist.owner,  // owner는 필수
    type: simplifiedPlaylist.type || "playlist",  // type이 없으면 기본값 설정
    uri: simplifiedPlaylist.uri || "",  // uri가 없으면 빈 문자열 처리
  };
};

const PlaylistContainer = styled("div")(({ theme }) => ({
  overflowY: "auto",
  maxHeight: "calc(100vh - 240px)",
  height: "100%",
  "&::-webkit-scrollbar": {
    display: "none",
    msOverflowStyle: "none", // IE and Edge
    scrollbarWidth: "none", // Firefox
  },
  [theme.breakpoints.down("sm")]: {
    maxHeight: "calc(100vh - 65px - 119px)",
  },
}));
const Library = () => {
    const { ref, inView } = useInView();
  const {
    data,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage
  } = useGetCurrentUserPlaylists({ limit: 10, offset: 0 });
  const {data:user} = useGetCurrentUserProfile()
  useEffect(()=>{
    if(inView && hasNextPage && !isFetchingNextPage){
        fetchNextPage()
    }
  },[inView])
  if(!user) return <EmptyPlaylist />

  console.log('data',data)
  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <ErrorMessage errorMessage={error.message} />;
  }
   const playlists: IPlaylist[] = data?.pages[0].items.map(convertToIPlaylist) || [];
  return (
    <div>
      {!data ||data?.pages[0].total === 0 ? (
        <EmptyPlaylist />
      ) : (
        <PlaylistContainer>
            {data?.pages.map((page,index)=>(
                <Playlist playlists={playlists} key={index}/>
            ))}
            <div ref={ref}>{isFetchingNextPage && <Loading/>}</div>
        </PlaylistContainer>
      )}
    </div>
  );
};

export default Library;

