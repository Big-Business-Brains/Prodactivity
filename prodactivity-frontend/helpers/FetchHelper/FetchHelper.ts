import { GetParams, JSONResponse } from './interfaces';
import KeychainHelper from '../KeychainHelper';
import { TokenType } from '../../application/Enums';
import { ResponseError } from '../../application/Errors';

export class FetchHelper {
    /**
     * Send a get request to a given URL
     * @param {string} url The URL to send a get request to
     * @param {GetParams} params The parameters to attach to the get request
     *
     */
    static get = async <T>(url: string, params?: GetParams): Promise<Result<T>> => {
        const options: RequestInit = {
            method: 'GET',
            headers: await FetchHelperUtils._headers(),
        };

        if (params) {
            url += FetchHelperUtils._formatGetParams(params);
        }

        try {
            const jsonResponse = await FetchHelperUtils._api(url, options);
            return { result: jsonResponse as T };
        } catch (error) {
            console.log(error);
            return { message: error.message };
        }
    };

    /**
     * Send a post request to a given URL
     * @param {string} url The URL to send a post request to
     * @param {object} body The body to attach to the ost request
     */
    static post = async <T>(url: string, body: object): Promise<Result<T>> => {
        const options: RequestInit = {
            method: 'POST',
            headers: await FetchHelperUtils._headers(),
            body: JSON.stringify(body),
        };

        try {
            const jsonResponse = await FetchHelperUtils._api(url, options);
            return { result: jsonResponse as T };
        } catch (error) {
            console.log(error);
            return { message: error.message };
        }
    };
}

class FetchHelperUtils {
    /**
     * Performs an API call using the specified URL and options
     * @param {string} url The URL to send a request to
     * @param {RequestInit} options The request object to send to the specified URL
     *
     * @returns {JSONResponse} A JSON formatted object retrieved from the URL
     */
    static _api = async (url: string, options: RequestInit): Promise<JSONResponse> => {
        const encodedURL: string = encodeURI(url);

        var response = await fetch(encodedURL, options);
        try {
            // handling responses with no json, only response codes
            try {
                // code will fail and be caught if no JSON response
                var json = JSON.parse(await response.text());
            } catch (err) {
                if (!response.ok) {
                    throw new ResponseError(response.statusText);
                }
                return {};
            }

            // handling json responses
            if (response.ok) {
                return json.result;
            } else {
                throw new ResponseError(json.message);
            }
        } catch (err) {
            throw err;
        }
    };

    /**
     * Formats GET parameters into a query string
     * @param {GetParams} params The GetParams to convert
     *
     * @returns {string} The formatted query string
     */
    static _formatGetParams = (params: GetParams): string => {
        const urlParams: URLSearchParams = new URLSearchParams();

        for (const key in params) {
            const val: any = params[key];

            if (Array.isArray(val)) {
                for (const index in val) {
                    urlParams.append(key, val[index]);
                }
            } else {
                urlParams.append(key, val);
            }
        }

        return urlParams.toString();
    };

    /**
     * Sets the headers for an API call
     * @param {string} contentType The content-type to be returned from the API call
     *
     * @returns {Headers} Object holding the headers for the request
     */
    static _headers = async (contentType: string = 'application/json'): Promise<Headers> => {
        const headers: Headers = new Headers();
        const authToken = await KeychainHelper.retrieveToken(TokenType.AccessToken);

        headers.append('Content-Type', contentType);
        headers.append('Authorization', `Bearer ${authToken}`);
        return headers;
    };
}
