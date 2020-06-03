export default class AuthenticationViewModel {

    userId: string;
    accessToken: string;
    refreshToken: string;
    refreshTokenExpiration: Date;
    
    constructor(userId?: string, accessToken?: string, refreshToken?: string, refreshTokenExpiration?: Date) {
        this.userId = userId || '';
        this.accessToken = accessToken || '';
        this.refreshToken = refreshToken || '';
        this.refreshTokenExpiration = refreshTokenExpiration || new Date();
    }
}