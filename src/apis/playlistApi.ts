import { CreatePlaylistRequest, GetCurrentUserPlaylistRequest, GetCurrentUserPlaylistResponse, Playlist } from "../models/playlist"
import api from "../utils/api"

export const getCurrentUserPlaylists = async ({limit,offset}:GetCurrentUserPlaylistRequest):Promise<GetCurrentUserPlaylistResponse> => {
    try {
        const res = await api.get(`/me/playlists`,{
            params:{limit,offset}
        })
        console.log('API Response:', res.data);
        return res.data
    } catch (error) {
        throw new Error("fail to fetch current user playlists")
    }
}

export const createPlaylist = async (user_id:string,params:CreatePlaylistRequest):Promise<Playlist> => {
    try {
        const {name,playlistPublic,collaborative,description} = params
        const res = await api.post(`users/${user_id}/playlists`,{
            name,
            pubilc:playlistPublic,
            collaborative,
            description
        })
        return res.data
    } catch (error) {
        throw new Error("fail to create playlist")
    }
}