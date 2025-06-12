import { ApiResponse } from './apiResponse';
import { ExternalUrls, Followers, Image, Owner } from './commonType';
export interface GetCurrentUserPlaylistRequest {
    limit?:number;
    offset?:number;
}
export type GetCurrentUserPlaylistResponse = ApiResponse<SimplifiedPlaylist>

export interface BasePlaylist {
    collaborative?:boolean;
    description?:string|null;
    external_urls?:ExternalUrls;
    href?:string;
    id?:string;
    images?:Image[];
    name?:string;
    owner:Owner;
    public?:boolean;
    snapshot_id?:string; 
    type?:"playlist";
    uri?:string;
}
export interface Playlist extends BasePlaylist {
    tracks:ApiResponse<PlaylistTrack>;
    followers:Followers;
}
export interface SimplifiedPlaylist extends BasePlaylist {
    tracks?:{
        href?: string;
        total?:number;
    }
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
    track:Track|Episode;
}
export interface Track {
    album:{
        album_type:string;
        total_tracks:number;
        available_markets:string[];
        external_urls:{
            spotify:string;
        }
        href:string;
        id:string;
        images:{
            url:string;
            height:number;
            width:number;
        }[];
        name:string;
        release_date:string;
        release_date_precision:string;
        restrictions:{
            reason:string;
        };
        type:string;
        uri:string;
        artists: {
            external_urls: { spotify: string };
            href: string;
            id: string;
            name: string;
            type: "artist";
            uri: string;
        }[];
    };
    artists?:{
        external_urls: {
        spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: "artist";
        uri: string;
    }[];
    available_markets?:string[];
    disc_number?:number;
    duration_ms?:number;
    explicit?:boolean;
    external_ids?:{
        isrc:string;
        ean:string;
        upc:string;
    }
    external_urls?: {
        spotify: string;
    };
    href?: string;
    id?: string;
    is_playable:boolean;
    linked_from?:{};
    restrictions?:{
        reason:string;
    };
    name?:string;
    popularity?:number;
    preview_url?:string|null;
    track_number?:number;
    type?:"track";
    uri?:string;
    is_local?:boolean;
}
export interface Episode {
    audio_preview_url:string|null;
    description:string;
    html_description:string;
    duration_ms:number;
    explicit:boolean;
    external_urls?: {
        spotify: string;
    };
    href:string;
    id:string;
    images:Image[];
    is_externally_hosted:boolean;
    is_playable:boolean;
    language:string[];
    name:string;
    release_date:string;
    release_date_precision:string;
    resume_point?:{
        fully_played:boolean;
        resume_position_ms:number;
    }
    type:"episode";
    uri:string;
    restrictions?:{
        reason:string;
    };
    show:Show
}
export interface Show {
        available_markets:string[];
        copyrights:{
            text:string;
            type:string;
        }[];
        description:string;
        html_description:string;
        explicit:boolean;
        external_urls: {
            spotify: string;
        };
        href:string;
        id:string;
        images:Image[];
        is_externally_hosted:boolean;
        languages:string[];
        media_type:string;
        name:string;
        publisher:string;
        type:"show";
        uri:string;
        total_episodes:number;
}
export type SimplifiedEpisode = Omit<Episode, "show">
export interface CreatePlaylistRequest{
    name:string;
    playlistPublic?:boolean;
    collaborative?:boolean;
    description?:string;
}
export interface GetPlaylistRequest{
    playlist_id:string;
    market?:string;
    fields?:string;
    additional_types?:string;
}
export interface GetPlaylistItemsRequest extends GetPlaylistRequest {
    offset?:number;
    limit?:number;
}
export type GetPlaylistItemsResponse = ApiResponse<PlaylistTrack>

export interface SimplifiedAudioBook {
  authors: {
    name: string;
  }[];
  available_markets: string[];
  copyrights: {
    text: string;
    type: string;
  }[];
  description: string;
  html_description: string;
  edition?: string;
  explicit: boolean;
  external_urls:ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  languages: string[];
  media_type: string;
  name: string;
  narrators: {
    name: string;
  }[];
  publisher: string;
  type: "audiobook";
  uri: string;
  total_chapters: number;
}
