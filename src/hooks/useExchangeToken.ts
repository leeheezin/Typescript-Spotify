import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query"
import { exchangeToken } from "../apis/authApi"
import { ExchangeTokenResponse } from "../models/auth"
import { useNavigate } from "react-router-dom"

const useExchangeToken = () => {
    const queryClient:QueryClient = useQueryClient()
    const navigate = useNavigate()
    return useMutation<ExchangeTokenResponse, Error, {code:string; codeVerifier:string;}>({
        mutationFn:({code,codeVerifier})=> exchangeToken(code,codeVerifier),
        onSuccess:(data)=>{
            localStorage.setItem('access_token', data.access_token);
            navigate('/')
            queryClient.invalidateQueries({
                queryKey:["current-user-profile"]
            })
        }
    })
}
export default useExchangeToken;