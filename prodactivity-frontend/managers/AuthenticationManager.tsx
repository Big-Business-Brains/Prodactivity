import AuthenticationViewModel from '../models/AuthenticationViewModel';
import FetchHelper from '../helpers';
import KeychainHelper from '../helpers/KeychainHelper';
import { TokenType } from '../application/Enums';
import RoutineViewModel from '../models/RoutineViewModel';

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
        let response = await FetchHelper.post(`${this.baseURL}/signIn`, AuthenticationViewModel, {
            email: email,
            password: password,
        });

        console.log(`Response: `);
        console.log(response);

        return { message: response.message };
    }

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
        try {
            let responseBody = { email: email, password: password, firstName: firstName, lastName: lastName };
            let response = await FetchHelper.post(`${this.baseURL}/signUp`, responseBody);
            if (response) {
                var authViewModel: AuthenticationViewModel = Object.assign(new AuthenticationViewModel(), response);
                await this.storeAuthenticationTokens(authViewModel);
                return { result: authViewModel };
            }

            return { message: 'There has been a problem signing in, try a different email/password and try again.' };
        } catch (error) {
            console.log(error);
            return { message: error.message };
        }
    };

    /**
     * @param {string} refreshToken The current refresh token
     *
     * @returns {AuthenticationViewModel} View Model containing all info for the login
     */
    refreshTokens = async (refreshToken: string, userId: string): Promise<Result<AuthenticationViewModel>> => {
        try {
            let response = await FetchHelper.post(
                `${this.baseURL}/refresh`,
                { refreshToken: refreshToken, userId: userId },
                await KeychainHelper.retrieveToken(TokenType.AccessToken),
            );

            if (response) {
                var authViewModel: AuthenticationViewModel = Object.assign(new AuthenticationViewModel(), response);
                await this.storeAuthenticationTokens(authViewModel);
                return { result: authViewModel };
            }

            return { message: 'There has been a problem signing in, try a different email/password and try again.' };
        } catch (error) {
            console.log(error);
            return { message: error };
        }
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
