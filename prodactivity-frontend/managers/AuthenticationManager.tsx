import AuthenticationViewModel from '../models/AuthenticationViewModel';
import FetchHelper from '../helpers';
import KeychainHelper from '../helpers/KeychainHelper';
import { TokenType } from '../application/Enums';

export default class AuthenticationManager {
    baseURL = 'http://localhost:5000/authentication';

    constructor() {}

    /**
     * @param {string} email The user's email address for sign in
     * @param {string} password The user's password for sign in
     *
     * @returns {AuthenticationViewModel} View Model containing all info for the login
     */
    signIn = async (email: string, password: string): Promise<Result<AuthenticationViewModel>> => {
        const response = await FetchHelper.post<AuthenticationViewModel>(`${this.baseURL}/signIn`, {
            email: email,
            password: password,
        });

        if (response.result) {
            await this.storeAuthenticationTokens(response.result);
        }

        return response;
    };

    /**
     * @param {string} email The user's email address for sign up
     * @param {string} password The user's password for sign up
     * @param {string} firstName The user's first name
     * @param {string} lastName The user's last name
     *
     * @returns {AuthenticationViewModel} View Model containing all info for the sign up
     */
    signUp = async (
        email: string,
        password: string,
        firstName: string,
        lastName: string,
    ): Promise<Result<AuthenticationViewModel>> => {
        const response = await FetchHelper.post<AuthenticationViewModel>(`${this.baseURL}/signUp`, {
            email: email,
            password: password,
            firstName: firstName,
            lastName: lastName,
        });

        if (response.result) {
            await this.storeAuthenticationTokens(response.result);
        }

        return response;
    };

    /**
     * @param {string} refreshToken The current refresh token
     *
     * @returns {AuthenticationViewModel} View Model containing all info for the login
     */
    refreshTokens = async (refreshToken: string, userId: string): Promise<Result<AuthenticationViewModel>> => {
        const response = await FetchHelper.post<AuthenticationViewModel>(`${this.baseURL}/refresh`, {
            refreshToken: refreshToken,
            userId: userId,
        });

        if (response.result) {
            await this.storeAuthenticationTokens(response.result);
        }

        return response;
    };

    storeAuthenticationTokens = async (authenticationViewModel: AuthenticationViewModel) => {
        await KeychainHelper.storeToken(authenticationViewModel.userId, TokenType.UserId);
        await KeychainHelper.storeToken(authenticationViewModel.accessToken, TokenType.AccessToken);
        await KeychainHelper.storeToken(authenticationViewModel.refreshToken, TokenType.RefreshToken);
    };

    removeAuthenticationTokens = async () => {
        await KeychainHelper.removeToken(TokenType.UserId);
        await KeychainHelper.removeToken(TokenType.AccessToken);
        await KeychainHelper.removeToken(TokenType.RefreshToken);
    };
}
