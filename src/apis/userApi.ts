import { User } from "../models/user"
import api from "../utils/api"

export const getCurrentUserProfile = async ():Promise<User> => {
    try {
        const res = await api.get('/me')
        return res.data
    } catch (error) {
        throw new Error('fail to fetch user profile')
    }
}