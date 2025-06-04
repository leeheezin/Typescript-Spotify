import axios from "axios"
import { REACT_APP_SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { getNewReleasesResponse } from "../models/album"

export const getNewReleases = async (clientCredentialToken:string):Promise<getNewReleasesResponse> => {
    try {
        const res = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/browse/new-releases?limit=6`,{
            headers:{
                Authorization:`Bearer ${clientCredentialToken}`
            }
        })
        return res.data
    } catch (error) {
        throw new Error('fail to fetch new releases')
    }
}