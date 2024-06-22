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
                onSuccess={signIn} 
                onError={Error}
            />
        </div>                 
    )
 }

```

# Authentication Modes
There are two types of authentication modes, `Redirect` and `Popup`.

## Popup
Popup is an mode of authentication, where the user is redirected to a popup window, instead of the default browser window. 

The `Oauth2` component will handle the authentication process, and will return the user's `access_token` and `refresh_token`.

## Redirect
Redirect is an authentication mode where the user is redirected to the `redirectUri`, which is set in the `Oauth2` component. This mode is the most secure and most flexible, but it is also the most streamlined way to use Oauth2. As it does not require additional client side handling.

## Example of an handler (Redirection handler)
```tsx
import React, { useState, useEffect } from'react';
import { useParams } from 'react-router-dom';
import { Oauth2, redirect_mode_hook } from '@JD522/oauthify';

function App(): React.FC {
    const [ error, setError ] = React.useState<string | any>();
    const [ access_token, setAccessToken ] = React.useState<string | any>();
    const [ refresh_token, setRefreshToken ] = React.useState<string | any>(); // If the application supports refresh tokens, most do
    const [ user, setUser ] = React.useState<string | any>();

    const params = useParams();

    const onSuccess = (oauth_data: any) => {
    /**
     * The oauth login was successful
     * 
    */
   }

   const Error = (error: string | any) => {
   setError(error)
   }

    useEffect(() => {
        const { client } = useParams();

        redirect_mode_hook(
        client,
        onSuccess,
        Error
        );

    }, [])

    return (
        <div className="Login-page">
            <h1>Validating the oauth was successful</h1>
            {error && <p>{error}</p>}
        </div>
        )
    }
    ```

    The `redirect_mode_hook` function will perform all the necessary steps for the authentication process under the hood. And sends back the `access_token` and `refresh_token` to the `onSuccess` function if successful.

    You don't have to write your own authentication handler, you just handle the response from the `Oauth2` component in your app.

    Don't forget to pass the `onSuccess` and `onError` props to the `Oauth2` component. This is required, as the `Oauth2` component will handle the authentication process.
    additionally <b>Make sure</b> that the code above is wrapped in the redirect url, so /auth/:client will be the redirect url. *Required*

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
