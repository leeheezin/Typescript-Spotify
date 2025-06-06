import axios from "axios"
import { REACT_APP_SPOTIFY_BASE_URL } from "../configs/commonConfig"
import { User } from "../models/user"

export const getCurrentUserProfile = async ():Promise<User> => {
    try {
        const res = await axios.get(`${REACT_APP_SPOTIFY_BASE_URL}/me`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("access_token")}`
            }
        })
        return res.data
    } catch (error) {
        throw new Error('fail to fetch user profile')
    }
}