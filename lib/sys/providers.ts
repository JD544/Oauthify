import { provider, sync_options } from './../main';
// import { API } from "./api_service";
import pkceChallenge from "pkce-challenge";

import { 
    providers,
    scopes,
    restrictScopes
} from "./current_providers.json";
import { popup_mode_hook } from "./popup_mode_hook";

export class OauthifyProvider {
    providers: provider[];
    defaultScopes: string[];
    restrictedScopes: boolean;

    constructor() {
        this.providers = providers;
        this.defaultScopes = scopes;
        this.restrictedScopes = restrictScopes;
    }

    /**
     * Performs the OAuth authentication flow for the specified provider.
     *
     * @param {string} provider - The name of the provider.
     * @param {string} clientId - The client ID for the provider.
     * @param {string} scopes - The requested scopes for the authentication.
     * @param {string} redirectUri - The redirect URI after the authentication.
     * @param {string} [apiKey] - The optional API key for the provider.
     * @param {string} [client_secret] - The optional client secret for the provider.
     * @param {boolean} [serverSync] - The optional server sync setting for the provider.
     * @param {sync_options} [sync_options] - The optional sync options for the provider.
     * @param {string} [state] - The optional state for the authentication.
     * @param {string} [responseType='code'] - The optional response type for the authentication.
     * @param {string} [mode='redirect'] - The optional mode for the authentication flow.
     * @return {Promise<any>} A promise that resolves with the authentication data or rejects with an error.
     */
    public doAuth(
        provider: string,
        clientId: string,        
        scopes: string, 
        redirectUri: string,        
        client_secret: string,
        serverSync?: boolean,
        sync_options?: sync_options,
        apiKey?: string,
        state: string = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),    
        responseType: string = 'code',
        mode: string = 'redirect'        
    ): Promise<any> {
        return new Promise(async (resolve, reject) => {            
         // Get providers from current_providers.json
         const builtinProviders: provider[] = this.providers

         // Find provider in current_providers.json
         const currentProvider: provider | undefined = builtinProviders.find((p) => p.id === provider)

         if (!currentProvider) {
            throw new Error(`Provider ${provider} not found`)
         }  

         // Start sync
         if (serverSync) {
            if (!sync_options?.server_start_url || !sync_options?.server_end_url) 
                throw new Error("You must provide server_start_url and server_end_url in sync_options, see Documentation for more information.");

            fetch(sync_options.server_start_url, {
                method: 'POST',                
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    redirect_uri: redirectUri,
                })
            }).then((response) => {
                if (response.ok) {
                    console.log('Sync started successfully');
                } else {
                    throw new Error(`Failed to start sync: ${response.statusText}`);
                }
            }).catch((error) => {
                throw new Error(`Failed to connect to sync server: ${error.message}, see Documentation for more information.`);
            });
         }  

         // Handle oauth flow
         let oauthWindow: Window | null = null;

         let oauth_url = `${currentProvider.oauth_url}?client_id=${clientId}${provider != 'Google' ? `&client_secret=${client_secret}` : ''}&scope=${scopes}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&apiKey=${apiKey}`

         if (provider === 'Microsoft') {
                var code_challenge = await pkceChallenge();
                localStorage.setItem("code_verifier", code_challenge.code_verifier);
            oauth_url = `${currentProvider.oauth_url}?client_id=${clientId}&scope=${scopes}&redirect_uri=${redirectUri}&response_type=${responseType}&response_mode=query&code_challenge_method=S256&code_challenge=${code_challenge.code_challenge}&state=${state}&apiKey=${apiKey}`
         }

         // store clientId, client_secret and redirectUri in local storage for future use
         localStorage.setItem("clientId", clientId)
         localStorage.setItem("client_secret", client_secret)
         localStorage.setItem("redirectUri", redirectUri)         
         localStorage.setItem("responseType", responseType)
         localStorage.setItem("serverSync", serverSync ? 'true' : 'false')
         localStorage.setItem("sync_endpoint", sync_options?.server_end_url || '')
         localStorage.setItem("state", state)
         localStorage.setItem("lastProvider", JSON.stringify(currentProvider))
        
         if (mode === 'popup') {          
            if (provider === 'Microsoft') {
                throw new Error("Microsoft does not support popup mode, please read the documentation for more information")
            }

            oauthWindow = window.open(oauth_url
            , 'Oauth2', 'popup')    

            if (oauthWindow) {
                let interval = setInterval(() => {
                    if (oauthWindow?.closed) {
                        clearInterval(interval)                                                
                        popup_mode_hook({success_callback: resolve, error_callback: reject})
                    }
                }, 2000);
            }            

         } else if (mode === 'redirect') {
            return window.location.assign(oauth_url)
         } else {
            reject("Mode not supported")
            throw new Error(`Mode ${mode} not supported`)         
         }
        })
    }

    public doAPI(provider: provider, code: string, success_callback: (data: any) => void, error_callback: (error: string) => void) {
            if (!provider)
                return error_callback("The provider is required");

            var client_id = localStorage.getItem('clientId');
            var client_secret = localStorage.getItem('client_secret');
            var redirect_uri = localStorage.getItem('redirectUri');            
            var code_verifier = localStorage.getItem('code_verifier');
            var serverSync = localStorage.getItem('serverSync') === 'true';
            var sync_endpoint = localStorage.getItem('sync_endpoint');

            let body: {
                code: string,
                grant_type: string,                
                client_id?: string | null,
                redirect_uri: string | null,                
                code_verifier?: string | null
                client_secret?: string | null            
                scope?: string
            } = {
                code: code,                    
                grant_type: "authorization_code",                
                redirect_uri: redirect_uri!,                
            }


            if (provider.id === 'Microsoft') {
                body["code_verifier"] = code_verifier            
                body["client_id"] = client_id
                body["scope"] = 'openid offline_access'
            }

            if (provider.id === 'Facebook') {
                body["client_secret"] = client_secret
                body["client_id"] = client_id                
            }

            if (provider.id === 'Google') {
                body["client_secret"] = client_secret
                body["client_id"] = client_id                                        
                body["scope"] = 'email'
            }

            let search_params = new URLSearchParams(body as any);
            
            fetch(provider.token_url, {
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
                        localStorage.setItem("expires_in", data.expires_in);
                        localStorage.setItem("authentication_type", "OAuth");   

                        if (!sync_endpoint)
                            throw new Error("You must set a sync endpoint in order to sync with the server");

                        if (serverSync && sync_endpoint) {
                            let body: {
                                redirect_uri: string | null,
                                client_id?: string | null,
                                client_secret?: string | null
                                user_endpoint_uri: string
                                user_token: string
                            } = {
                                redirect_uri: redirect_uri!,
                                client_id: client_id,
                                client_secret: client_secret,
                                user_endpoint_uri: provider.user_endpoint!,
                                user_token: data.access_token
                            }

                            fetch(sync_endpoint, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/x-www-form-urlencoded",
                                },                
                                body: new URLSearchParams(body as any),
                            }).then((res) => {
                                if (res.ok) {
                                    console.log('Successfully synced the login with the server');
                                } else {
                                    error_callback('There was an error syncing with the server');
                                }
                            })
                        }                            

                        // make the call to the profile info endpoint
                        fetch(provider.user_endpoint, {
                            method: "GET",           
                            headers: {
                                "Authorization": `Bearer ${data.access_token}`,
                            }
                        }).then((res) => {
                            if (res.ok) {
                                res.json().then((infoEndpoint) => {
                                    localStorage.removeItem("code_verifier");
                                    localStorage.removeItem("serverSync");
                                    localStorage.removeItem("clientId");
                                    localStorage.removeItem("client_secret");
                                    localStorage.removeItem("redirectUri");
                                                                        
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