import { GetParams, JSONResponse } from './interfaces';

// HELPER FUNCTIONS

// Actually makes the fetch call and throws an Error if our status code is bad
const _api = async (url: string, options: RequestInit): Promise<JSONResponse | undefined> => {
    const encodedURL: string = encodeURI(url);

    var response = await fetch(encodedURL, options);
    try {
        var json = await response.json();
        if (response.ok) {
            return json.result;
        } else {
            throw new ResponseError(json.message);
        }
    } catch (err) {
        throw err;
    }
};

// Formats GETParams into a query string
const _formatGetParams = (params: GetParams): string => {
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

// Creates our headers for the HTTP requests
const _headers = (authToken?: string, contentType: string = 'application/json'): Headers => {
    const headers: Headers = new Headers();
    headers.append('Content-Type', contentType);

    if (authToken) {
        headers.append('Authorization', `Bearer ${authToken}`);
    }

    return headers;
};

// Custom error class whenever an API gives us an error status code
class ResponseError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ResponseError';
    }
}

// "PUBLIC" FUNCTIONS

// This module provides some extra utility ontop of the barebones Fetch method

// Helper method to make a POST call using JSON
const post = async (url: string, body: object, authToken?: string): Promise<JSONResponse | undefined> => {
    const options: RequestInit = {
        method: 'POST',
        headers: _headers(authToken),
        body: JSON.stringify(body),
    };

    return await _api(url, options);
};

// Helper method to make a GET call using JSON
const get = async (url: string, params?: GetParams, authToken?: string): Promise<JSONResponse | undefined> => {
    const options: RequestInit = {
        method: 'GET',
        headers: _headers(authToken),
    };

    if (params) {
        url += _formatGetParams(params);
    }

    return await _api(url, options);
};

const FetchHelper = {
    post,
    get,
};

export { FetchHelper };
