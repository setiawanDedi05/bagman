import { api } from "../api"
import { endpoint } from "../endpoints";
import { LoginDto } from "../dto/login-dto"
import { RegisterDto } from "../dto/register-dto";

export const authService = {
    login  : async (credentials: LoginDto) => {
        return api.post(endpoint.auth.login, credentials);
    },
    register : async (user: RegisterDto) => {
        return api.post(endpoint.auth.register, user);
    },
    logout: async () => {
        return api.post(endpoint.auth.logout);
    },
    verifyEmail: async(token: string) => {
        return api.get(`${endpoint.auth.verifyEmail}?token=${token}`)
    }
}