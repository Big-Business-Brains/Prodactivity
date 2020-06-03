import AuthenticationViewModel from '../models/AuthenticationViewModel';
import { FetchHelper } from '../helpers';
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
    async signIn(email: string, password: string): Promise<Result<AuthenticationViewModel>> {
        try {
            let response = await FetchHelper.post(`${this.baseURL}/signIn`, { email: email, password: password });

            if (response) {
                var authViewModel: AuthenticationViewModel = Object.assign(new AuthenticationViewModel(), response);
                this.storeAuthenticationTokens(authViewModel);
                return { result: authViewModel };
            }

            return { message: 'There has been a problem signing in, try a different email/password and try again.' };
        } catch (error) {
            console.log(error);
            return { message: error.message };
        }
    }

    /**
     * @param {string} refreshToken The current refresh token
     *
     * @returns {AuthenticationViewModel} View Model containing all info for the login
     */
    async refreshTokens(refreshToken: string, userId: string): Promise<Result<AuthenticationViewModel>> {
        try {
            let response = await FetchHelper.post(
                `${this.baseURL}/refresh`,
                { refreshToken: refreshToken, userId: userId },
                await KeychainHelper.retrieveToken(TokenType.AccessToken),
            );

            if (response) {
                console.log(`Refreshed tokens: ${response}`);
                var authViewModel: AuthenticationViewModel = Object.assign(new AuthenticationViewModel(), response);
                this.storeAuthenticationTokens(authViewModel);
                return { result: authViewModel };
            }

            return { message: 'There has been a problem signing in, try a different email/password and try again.' };
        } catch (error) {
            console.log(error);
            return { message: error };
        }
    }

    storeAuthenticationTokens = (authenticationViewModel: AuthenticationViewModel) => {
        KeychainHelper.storeToken(authenticationViewModel.userId, TokenType.UserId);
        KeychainHelper.storeToken(authenticationViewModel.accessToken, TokenType.AccessToken);
        KeychainHelper.storeToken(authenticationViewModel.refreshToken, TokenType.RefreshToken);
    };
}
