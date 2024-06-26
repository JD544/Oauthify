export { Oauth2 } from './components/button/oauth_login_btn'
export { OauthifyProvider } from './sys/providers'
export { API } from './sys/api_service'
export { redirect_mode_hook } from './sys/redirect_mode_hook'
export { UserModeHook as user_hook } from './sys/user_mode_hook'

/**
 * Type definitions for the Oauthify library.
 */

export type provider = {
    id: string,
    oauth_url: string,
    token_url: string
}

export type redirect_mode_hook_type = {
    success_callback: (data: any) => void,
    error_callback: (error: any) => void
}

export type Oauth2Props = {
    id: string,
    className: string,
    provider: "Kalicloud" | "Google" | "Microsoft" | "Facebook",
    apiKey: string,
    clientId: string,
    client_secret: string,
    scope: string,
    state?: string,
    mode: "popup" | "redirect",
    responseType: "code",
    redirectUri: string,
    onSuccess: (oauth_data: any) => void,
    onError: (error: any) => void
}