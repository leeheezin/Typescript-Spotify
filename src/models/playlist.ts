import { ApiResponse } from './apiResponse';
import { ExternalUrls, Followers, Image, Owner } from './commonType';
export interface GetCurrentUserPlaylistRequest {
    limit?:number;
    offset?:number;
}
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>
export interface SimplifiedPlaylist {
    collaborative?:boolean;
    description?:string;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    images?:Image[];
    name?:string;
    owner:Owner;
    public?:boolean;
    snapshot_id?:string;
    tracks?:{
        href?:string;
        total?:number;
    }
    type?:string;
    uri?:string;
}
export interface BasePlaylist {
  id: string;         
  name: string;      
  owner: Owner;      
  type: string;    
  uri: string;      
}
export interface Playlist extends BasePlaylist {
    tracks:ApiResponse<PlaylistTrack>;
    followers:Followers;
}
export interface PlaylistTrack {
    added_at?:string|null;
    added_by?:{
        external_urls?:ExternalUrls;
        followers?:Followers;
        href?:string;
        id?:string;
        type?:string;
        uri?:string
    }|null;
    is_local?:boolean;
    // track:track|Episode;
    track:any;
}
export interface CreatePlaylistRequest{
    name:string;
    playlistPublic?:boolean;
    collaborative?:boolean;
    description?:string;
}