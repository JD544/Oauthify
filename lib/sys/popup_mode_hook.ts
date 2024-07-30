import { OauthifyProvider, popup_mode_hook_type } from "../main";
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

    let response_type = localStorage.getItem("oauth_code") as string;
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

    const oauthProvider = new OauthifyProvider();

    return oauthProvider.doAPI(
        provider,
        code,
        success_callback,
        error_callback
    );
}

/**
 * Closes the popup window and returns the user to the original window.
 */
const handle_popup_exit = () => {
    localStorage.removeItem("mode");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get(localStorage.getItem("responseType") || "code");
    localStorage.setItem("oauth_code", code as string);
    if (window.opener && window.opener !== window) {
        window.opener.postMessage({ type: "close" }, "*");     
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