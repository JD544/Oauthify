# Oauthify

 A package for handling Oauth2.0 flows in React, with fully custom oauth flow handlers

 ## Usage

 ```tsx
 import React, { useState } from'react';
 import { Oauth2 } from '@JD522/oauthify';

 function App(): React.FC {
    const [ error, setError ] = React.useState<string | any>();

    const signIn = (oauth_data: any) => {
        /**
         * The oauth login was successful
         */
    }

    const Error = (error: string | any) {
        setError(error)
    }

    return (
        <div className="Login-page">
            <div className="login-error">
                <p>{error}</p>
            </div>
            <Oauth2
                id='<ID>'
                className='<BUTTON_CLASSNAME>'
                provider="<PROVIDER>"
                apiKey="<API_KEY" 
                clientId="<CLIENT_ID>" 
                state="<STATE>"
                redirectUri="<REDIRECT_URI>"
                mode="<MODE>"
                responseType="<RESPONSE_TYPE>"
                scope="<SCOPES>"
                onSuccess={sighnIn} 
                onError={Error}
            />
        </div>                 
    )
 }

````
# Features
 
- Fully customizable
- Fully typed
- Fully documented
- Fully tested
- Easy API authentication under the hood

## Buitin oauth providers

We have included a select few of built in providers, which you can use by passing the provider name as a string.

here is a dedication list of the providers we have included:
> - Google
> - Github
> - Kalicloud (Default)

Each provider will require some sort of `Client ID` and `Client Secret` to be used, some providers also require the use of an `API Key`

By default it will use the Kalicloud provider, but you can change this by passing the provider name as a string, to the `provider` prop.

Redirect URL will also need to be provided, this is the URL that the user will be redirected to after completing the oauth flow.

# Note
This package is still in development, and is not yet ready for production use, be aware that some api usage might not be stable or not yet implemented.