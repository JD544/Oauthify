import { provider } from "../main";
// import { API } from "./api_service";
import { 
    providers,
    scopes,
    restrictScopes
} from "./current_providers.json";

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
     * @param {string} [state] - The optional state for the authentication.
     * @param {string} [responseType='code'] - The optional response type for the authentication.
     * @param {string} [mode='redirect'] - The optional mode for the authentication flow.
     * @return {Promise<any>} A promise that resolves with the authentication data or rejects with an error.
     */
    public doAuth(
        provider: string,
        clientId: string,
        client_secret: string,
        scopes: string, 
        redirectUri: string,
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
         let oauthWindow: Window | Location | null = null;

         // format scopes for url
         const formattedScopes: string = scopes

         if (mode === 'popup') {
            oauthWindow = window.open(`${currentProvider.oauth_url}?client_id=${clientId}&client_secret=${client_secret}${scopes ? `&scope=${formattedScopes}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&apiKey=${apiKey}` : ''}`
            , 'Oauth2', 'width=600,height=600')    
         } else if (mode === 'redirect') {
            window.location.assign(`${currentProvider.oauth_url}?client_id=${clientId}&client_secret=${client_secret}${scopes ? `&scope=${formattedScopes}` : ''}&redirect_uri=${redirectUri}&response_type=${responseType}&state=${state}&apiKey=${apiKey}`)
         } else {
            throw new Error(`Mode ${mode} not supported`)
         }

         if (oauthWindow && mode === 'popup') {                     
            reject('Is going to be redirected to popup')
         // Wait for oauth flow to complete
        //  const interval = setInterval(() => {
        //     if (oauthWindow?.closed) {
        //     clearInterval(interval);
            
        //     // Handle get data from oauth flow
        //     const api: API = new API(currentProvider.token_url)
            
        //     api.Post(`${currentProvider.token_url}?client_id=${clientId}${scopes ? `&scope=${formattedScopes}` : ''}`, {}).then((data: any) => {
        //         resolve(data)
        //     }).catch((error: Error) => {
        //         reject(error)
        //     })
        //     } 
        // }, 1000);
        } else {
            resolve('Is going to be redirected to redirect_uri')
        }
        })
    }
}