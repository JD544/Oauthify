import { provider } from "../main";
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
         localStorage.setItem("state", state)
         localStorage.setItem("lastProvider", JSON.stringify(currentProvider))
        
         if (mode === 'popup') {          
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
            resolve("You are now being redirected to the OAuth2 provider. Please wait...")
            window.location.assign(oauth_url)
         } else {
            reject("Mode not supported")
            throw new Error(`Mode ${mode} not supported`)         
         }
        })
    }
}