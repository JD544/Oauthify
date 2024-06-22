import axios, { AxiosInstance } from 'axios';

export class API {
    host_url: string;
    apiClient: AxiosInstance;

    constructor(host_url: string) {
        this.host_url = host_url;

        this.apiClient = axios.create({
            baseURL: this.host_url,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }            
        })
    }

    /**
     * Makes a POST request to the specified path with optional data.
     *
     * @param {string} path - The path to send the POST request to.
     * @param {any} data - Optional data to send with the request.
     * @param {AbortSignal} [controllerSignal] - Optional AbortSignal to cancel the request.
     * @return {Promise<T>} A Promise that resolves with the response data.
     */
    public async Post<T>(path: string, data: any, controllerSignal?: AbortSignal): Promise<T> {
        const response = await this.apiClient.post<T>(path, data, { signal: controllerSignal });
        return response.data;
    }
}