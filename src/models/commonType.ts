export interface ExternalUrls{
    spotify:string;
}
export interface Image{
    url:string; height:number|null; widht: number|null;
}
export interface Restriction{
    reason?:string;
}
export interface Followers{
    href?:string|null;
    total?:number;   
}
export interface Explicit_content{
    filter_enabled?:boolean;
    filter_locked?:boolean;
}