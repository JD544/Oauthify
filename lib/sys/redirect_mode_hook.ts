import { OauthifyProvider, redirect_mode_hook_type } from "../main";
import {
    providers
} from "./current_providers.json";
// import pkceChallenge from "pkce-challenge";

/**
 * A function that handles the redirect mode hook for OAuth authentication.
 *
 * @param {(data: any) => void} success_callback - A callback function for successful authentication.
 * @param {(error: any) => void} error_callback - A callback function for errors during authentication.
 * @throws {Error} Throws an error if the required parameters are missing.
 * @return {Promise<void>} Returns a promise that resolves with the result of the handle_redirect function.
 */
const redirect_mode_hook = ({
    success_callback,
    error_callback
}: redirect_mode_hook_type) => {
    const search_params = new URLSearchParams(window.location.search);
    let response_type = localStorage.getItem("responseType");

    const code = search_params.get(response_type as string || "code");
    
    if (!code) {
        throw new Error("Missing required parameters");
    }

    const provider = window.location.pathname.split("/")[1][0].toUpperCase() + window.location.pathname.split("/")[1].slice(1);
    
    return handle_redirect(provider, code, success_callback, error_callback);
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
   
    const oauth = new OauthifyProvider();
        if (code) {
            return oauth.doAPI(
                provider,
                code,
                success_callback,
                error_callback
            )
        }                      
}


export { redirect_mode_hook }