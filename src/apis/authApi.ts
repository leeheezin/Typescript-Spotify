import axios from "axios"
import { clidentId, clientSecret } from "../configs/authConfig"
import { ClientCredentialTokenResponse } from "../models/auth"

const encodedBase64 = (data:string):string => {
    if(typeof window !== 'undefined'){
        return btoa(data) //브라우저환경
    } else {
        return Buffer.from(data).toString("base64") //노드환경
    }
}
export const getClientCredentialToken = async ():Promise<ClientCredentialTokenResponse> => {
    try {
        const body = new URLSearchParams({
            grant_type:"client_credentials"
        })
        const res = await axios.post("https://accounts.spotify.com/api/token",body,{
            headers:{
                Authorization:`Basic ${encodedBase64(clidentId+':'+clientSecret)}`,
                "Content-Type":"application/x-www-form-urlencoded"
            }
        })
        return res.data
    } catch (error) {
        throw new Error('fail to fetch client credential token')
    }
}