import { popup_mode_hook_type } from "../main";
import {
    providers
} from "./current_providers.json";

/**
 * A function that handles the popup mode hook for OAuth authentication.
 *
 * @param {popup_mode_hook_type} param - An object containing the success and error callback functions.
 * @param {(data: { response_type: string, provider: string }) => void} param.success_callback - A callback function for successful authentication.
 * @param {(error: string) => void} param.error_callback - A callback function for errors during authentication.
 * @throws {Error} Throws an error if the success_callback or error_callback is not a function.
 * @throws {Error} Throws an error if the required parameters are missing.
 * @return {void} Returns nothing. Calls the success_callback with the response_type and provider as parameters, or the error_callback with the error message.
 */
export const popup_mode_hook = ({
    success_callback,
    error_callback
}: popup_mode_hook_type) => {
    if (typeof success_callback !== 'function' || typeof error_callback !== 'function') {
        throw new Error('success_callback and error_callback must be functions');
    }

    let response_type = localStorage.getItem("responseType") as string;
    let provider = JSON.parse(localStorage.getItem("lastProvider") || "{}").id as string;

    if (!response_type || !provider) {
        return error_callback("Missing required parameters");
    }

    return handle_authentication(response_type, provider, success_callback, error_callback);
}

/**
 * Handles the authentication process for a given code and client name.
 *
 * @param {string} code - The authorization code.
 * @param {string} client_name - The name of the client.
 * @param {(data: { message: string, provider: string }) => void} success_callback - The callback function to be called on successful authentication.
 * @param {(error: string) => void} error_callback - The callback function to be called on authentication error.
 * @throws {Error} Throws an error if the provider is not found in the providers list.
 * @return {void} Returns nothing.
 */
export const handle_authentication = (
    code: string,
    client_name: string,
    success_callback: (data: { message: string, provider: string }) => void,
    error_callback: (error: string) => void
) => {
    const provider = providers.find((p) => p.id === client_name);

    if (!provider) {
        throw new Error(`Provider ${client_name} not found, please add it to current_providers.json`);
    }

    var client_id = localStorage.getItem('clientId');
    var client_secret = localStorage.getItem('client_secret');
    var redirect_uri = localStorage.getItem('redirectUri');
    var code_verifier = localStorage.getItem('code_verifier');

    let body: {
        code: string,
        grant_type: string,                
        client_id: string | null,
        redirect_uri: string | null,                
        code_verifier?: string | null
        client_secret?: string | null
        scope?: string
    } = {
        code: code,                    
        grant_type: "authorization_code",
        client_id: provider.id !== 'Microsoft' ? client_id! : null!,
        redirect_uri: redirect_uri!,                
    }

    if (provider.id === 'Microsoft') {
        body["code_verifier"] = code_verifier
        body["scope"] = 'openid offline_access'
    }

    if (provider.id === 'Facebook') {
        body["client_secret"] = client_secret
    }

    if (provider.id === 'Google') {
        body["client_secret"] = client_secret                                        
        body["scope"] = 'email'
    }

    let search_params = new URLSearchParams(body as any);

    fetch(provider.token_url, {
        credentials: "include",
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },                
        body: search_params
    }).then((res) => {
        if (res.ok) {
            res.json().then((data) => {                        
                localStorage.setItem("access_token", data.access_token);
                localStorage.setItem("token_type", data.token_type);
                localStorage.setItem("refresh_token", data.refresh_token);
                localStorage.setItem("id_token", data.expires_in);
                localStorage.setItem("authentication_type", "OAuth");   

                // make the call to the profile info endpoint
                fetch(provider.user_endpoint, {
                    method: "GET",             
                    credentials: "include",               
                    headers: {
                        "Authorization": `Bearer ${data.access_token}`,
                    }
                }).then((res) => {
                    if (res.ok) {
                        res.json().then((infoEndpoint) => {
                            localStorage.setItem("user", JSON.stringify(infoEndpoint));
                            return success_callback(infoEndpoint);
                        });
                    } else {
                        return error_callback('Could not get user info');
                    }
                })
            });
        } else {
         return error_callback('Could not get access token');
        }
    })
}

/**
 * Closes the popup window and returns the user to the original window.
 */
const handle_popup_exit = () => {
    localStorage.removeItem("mode");

    if (window.opener && window.opener !== window) {
        window.opener.postMessage({ type: "close" }, "*");     
        localStorage.setItem("responseType", window.location.href.split("code=")[1]);
        return window.close();
    }

    return new Error("Window is not an popup, see docs for more info");
}

/**
 * Checks if the current window is a popup window.
 *
 * @return {boolean} True if the window is a popup, false otherwise.
 */
const isPopup = (): boolean => {
    return window.opener && window !== window.opener;
}

export { handle_popup_exit, isPopup }