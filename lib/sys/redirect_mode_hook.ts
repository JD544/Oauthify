import { redirect_mode_hook_type } from "../main";
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
    
        if (code) {
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
                method: "POST",
                credentials: "include",
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
                        localStorage.setItem("expires_in", data.expires_in);
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
                                    success_callback(infoEndpoint);
                                });
                            } else {
                                error_callback('Could not get user info');
                            }
                        })
                    });
                } else {
                 error_callback('Could not get access token');
                }
            })
        }                      
}

export { redirect_mode_hook }