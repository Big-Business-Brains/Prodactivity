export default class AuthenticationViewModel {

    accessToken: string;
    refreshToken: string;
    refreshTokenExpiration: Date;
    
    constructor(accessToken?: string, refreshToken?: string, refreshTokenExpiration?: Date) {
        this.accessToken = accessToken || '';
        this.refreshToken = refreshToken || '';
        this.refreshTokenExpiration = refreshTokenExpiration || new Date();
    }
}