import * as Keychain from 'react-native-keychain';
import { TokenType } from '../application/Enums';

export default class KeychainHelper {
    /**
     * Store a token inside the keychain to be accessed securely later.
     * @param {string} token The token to be stored in the keychain
     * @param {TokenType} tokenType The type of token to be stored
     */
    static storeToken = async (token: string, tokenType: TokenType) => {
        await Keychain.setInternetCredentials(`prodactivity_${tokenType}`, tokenType, token);
    };

    /**
     * Retrieve a stored token inside the keychain.
     * @param {TokenType} tokenType The type of token to be stored
     *
     * @returns { Promise<string | undefined> } The retrieved string or undefined if nothing is found
     */
    static retrieveToken = async (tokenType: TokenType): Promise<string | undefined> => {
        const retrievedCredentials = await Keychain.getInternetCredentials(`prodactivity_${tokenType}`);
        if (retrievedCredentials) {
            return retrievedCredentials.password;
        }

        return undefined;
    };

    /**
     * Removes a stored token inside the keychain.
     * @param {TokenType} tokenType The type of token to be stored
     */
    static removeToken = async (tokenType: TokenType) => {
        await Keychain.resetInternetCredentials(`prodactivity_${tokenType}`);
    };
}
