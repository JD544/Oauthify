import { OauthifyProvider } from '../../sys/providers';

export interface Oauth2Props {
  // `oauth_login_btn`
  id: string;
  className: string;
  provider: "Kalicloud" | "Google" | "Github";
  apiKey: string; // Used by many oauth providers
  clientId: string; // Used by Google, Github and Kalicloud
  scope: string;  // Defines the requested information from the provider
  state?: string; // A unique value that can be used to protect against CSRF attacks/ default: uuid()
  mode: "popup" | "redirect"; // Specify if you want to use popup or redirect/ required: true
  responseType: "code" // Specify your response type/ required: true
  redirectUri: string;
  onSuccess: (oauth_data: any) => void;
  onError: (error: any) => void;
}

/**
 * Renders an OAuth2 login button component.
 *
 * @param {Oauth2Props} props - The props object containing the following properties:
 *   - id (string): The ID of the button element.
 *   - className (string): The CSS class name for the button element.
 *   - provider (string): The OAuth2 provider (e.g., "Kalicloud", "Google", "Github").
 *   - apiKey (string): The API key for the OAuth2 provider.
 *   - clientId (string): The client ID for the OAuth2 provider.
 *   - scope (string): The requested scope of information from the provider.
 *   - onSuccess (function): The callback function to be called on successful authentication.
 *     - oauth_data (any): The data returned by the OAuth2 provider on successful authentication.
 *   - onError (function): The callback function to be called on authentication error.
 *     - error (any): The error object returned by the OAuth2 provider on authentication error.
 * @return {JSX.Element} The rendered OAuth2 login button componenst.
 */
export function Oauth2({
  id, 
  className, 
  provider, 
  apiKey, 
  state,
  mode,
  responseType, 
  redirectUri,
  clientId, 
  scope, 
  onSuccess, 
  onError
}: Oauth2Props): JSX.Element {
  const handleDoOauth = () => {
    const oauth = new OauthifyProvider()
    
    oauth.doAuth(provider, clientId, scope, redirectUri, apiKey, state, responseType, mode).then(onSuccess).catch(onError)
  }

  return (
    <button id={id} className={`btn-login ${className} oauth-provider-login`} onClick={handleDoOauth}>Continue with {provider}</button>
  )
}
