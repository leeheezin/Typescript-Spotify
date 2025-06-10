import { Button, Card, styled, Typography } from "@mui/material";
import React, { useEffect } from "react";
import ErrorMessage from "../../common/components/ErrorMessage";
import Playlist from "./Playlist";
import EmptyPlaylist from "./EmptyPlaylist";
import Loading from "../../common/components/Loading/Loading";
import useGetCurrentUserPlaylists from "../../hooks/useGetCurrentUserPlaylists";
import useGetCurrentUserProfile from "../../hooks/useGetCurrentUserProfile";
import { SimplifiedPlaylist } from "../../models/playlist";
import { useInView } from "react-intersection-observer";


interface PlaylistProps {
  data?:any;
  fetchNextPage?:()=>void;
  hasNextPage?:boolean;
  inFetchingNextPage?:boolean;
}

const PlaylistContainer = styled("div")(({ theme }) => ({
    position: "relative",
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
const Library:React.FC<PlaylistProps> = () => {
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
    },[inView,hasNextPage])
    if(!user) return <EmptyPlaylist />

    console.log('data',data)
    if (isLoading) {
        return <Loading />;
    }
    if (error) {
        return <ErrorMessage errorMessage={error.message} />;
    }
    return (
    <div>
        {!data ||data?.pages.length > 0 ? (
            <PlaylistContainer>
                {data?.pages.map((page,index)=>(
                    <Playlist playlists={page.items || []} key={index}/>
                ))}
                <div ref={ref}>{isFetchingNextPage && hasNextPage && <Loading/>}</div>
            </PlaylistContainer>
        ) : (
            <EmptyPlaylist />
        )}
    </div>
    );
};

export default Library;

