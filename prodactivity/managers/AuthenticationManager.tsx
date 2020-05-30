import AuthenticationViewModel from '../models/AuthenticationViewModel';
import { FetchHelper } from '../helpers';

export default class AuthenticationManager {

    baseURL = 'http://localhost:5000/authentication';

    constructor() {
    }

    /**
     * @returns {AuthenticationViewModel} ViewModel containing all info for the login
     */
    async signIn(email: string, password: string): Promise<AuthenticationViewModel | undefined> {
        try {
            let response = await FetchHelper.post(`${this.baseURL}/signIn`, {"email": email, "password": password});

            if (response) {
                var authViewModel: AuthenticationViewModel = Object.assign(new AuthenticationViewModel, response);
                return authViewModel;
            }

            return undefined
        } catch (error) {
            console.log(error);
            return undefined;
        }
    }
}