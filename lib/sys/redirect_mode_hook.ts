import { redirect_mode_hook_type } from "../main";
import { API } from "./api_service";
import {
    providers
} from "./current_providers.json";


/**
 * A function that handles the redirect mode hook for OAuth authentication.
 *
 * @param {string} client_name - The name of the client.
 * @param {(data: any) => void} success_callback - A callback function for successful authentication.
 * @param {(error: any) => void} error_callback - A callback function for errors during authentication.
 * @throws {Error} Throws an error if the required parameters are missing.
 * @return {Promise<void>} Returns a promise that resolves with the result of the handle_redirect function.
 */
const redirect_mode_hook = ({
    client_name,
    success_callback,
    error_callback
}: redirect_mode_hook_type) => {
    const search_params = new URLSearchParams(window.location.search);

    const code = search_params.get("code");
    
    if (!code) {
        throw new Error("Missing required parameters");
    }
    
    return handle_redirect(client_name, code, success_callback, error_callback);
}

/**
 * Handle the redirect flow for OAuth authentication.
 *
 * @param {string} client_name - The name of the client.
 * @param {string} code - The authorization code.
 * @param {(data: any) => void} success_callback - Callback function for successful authentication.
 * @param {(error: any) => void} error_callback - Callback function for errors during authentication.
 */
const handle_redirect = (
     client_name: string,
     code: string,
     success_callback: (data: any) => void,
     error_callback: (error: any) => void
    ) => {
    const provider = providers.find((p) => p.id === client_name);
    
    if (!provider) {
        throw new Error(`Provider ${client_name} not found, please add it to current_providers.json`);
    }

    var code = window.location.search.split("code=")[1];
    let interval = setInterval(() => {
        if (code) {
            // Get data from oauth flow
            const api: API = new API(provider.token_url)

            api.Post(`${provider.token_url}?grant_type=authorization_code&code=${code}`, {
                code: code,
                grant_type: 'authorization_code'
            }).then((data: any) => {
                clearInterval(interval);
                return success_callback(data);

            }).catch((error: Error) => {
                clearInterval(interval);
                return error_callback(error);
            })
        }
    }, 1000);
}

export { redirect_mode_hook }