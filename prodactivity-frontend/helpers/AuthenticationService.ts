import KeychainHelper from './KeychainHelper';
import jwt_decode from 'jwt-decode';
import { TokenType } from '../application/Enums';
import AuthenticationManager from '../managers/AuthenticationManager';

interface JWTExpiration {
    exp: number;
}

export default class AuthenticationService {
    // Checks if the user is currently authenticated
    static authenticateUser = async (): Promise<boolean> => {
        let accessToken = await KeychainHelper.retrieveToken(TokenType.AccessToken);

        // If there is an access token stored, check the expiration and refresh if needed
        if (accessToken) {
            let current_time = new Date().getTime() / 1000;
            let decoded = jwt_decode<JWTExpiration>(accessToken);
            return decoded.exp > current_time ? true : await AuthenticationService.refreshTokens();
        }

        return false;
    };

    // Refreshes the current stored tokens
    static refreshTokens = async (): Promise<boolean> => {
        const authenticationManager = new AuthenticationManager();
        let refreshToken = await KeychainHelper.retrieveToken(TokenType.RefreshToken);
        let userId = await KeychainHelper.retrieveToken(TokenType.UserId);

        // Refresh tokens, if success then the user is authenticated
        if (refreshToken && userId) {
            let authenticationResult = await authenticationManager.refreshTokens(refreshToken, userId);
            return authenticationResult.result ? true : false;
        }

        return false;
    };
}
