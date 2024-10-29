# Oauthify

 A package for handling Oauth2.0 flows in React, with fully custom oauth flow handlers

 ## Installation
 Install the package using npm:
 ```bash
    npm install @kalicloud/oauthify
 ```
 or using yarn:
 ```bash
 yarn add @kalicloud/oauthify
 ```

## Build
Build the package using the following command:
 ```bash
 npm run build
 ```

 ## Usage

 ```tsx
 import React, { useState } from'react';
 import { Oauth2 } from '@kalicloud/oauthify';

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
                clientSecret="<CLIENT_SECRET>"
                syncAuthOnServer={true} // This will sync the authentication status with the server (Optional)
                syncOptions={{server_start_url: "http://localhost:3000/social/start", server_end_url: "http://localhost:3000/social/end"}} // This will tell Oauthify where to start and end the authentication process
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

````
# Allowed parameters
| Parameter | Type | Description | defaultValue | Required |
| --- | --- | --- | --- | --- |
| id | string | The id of the oauth provider | | true |
| className | string | The class name of the oauth provider | | false |
| provider | string | The name of the oauth provider | kalicloud | true |
| apiKey | string | The api key of the oauth provider (Required by some) | | false |
| clientId | string | The client id of the oauth provider | | true |
| clientSecret | string | The client secret of the oauth provider | | true |
| state | string | A unique identifier for the request | Generated for you | false |
| redirectUri | string | The redirect uri of the oauth provider | | true |
| mode | string | The mode of the oauth provider | popup | true |
| responseType | string | The response type of the oauth provider | code | true |
| scope | string | The scope of the oauth provider | | true |
| syncAuthOnServer | boolean | Whether to sync the authentication status with the server | false | false |
| syncOptions | object | The options for the syncAuthOnServer | | false |
| onSuccess | function | The function to be called when the oauth login is successful | | true |
| onError | function | The function to be called when the oauth login fails | | true |



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
import { Oauth2, redirect_mode_hook, user_hook } from '@kalicloud/oauthify';

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

        const user = new user_hook()

        // Get the oauth Provider
        const provider = user.checkProvider()

        // Get the provider's name
        const name = provider.id

        alert(`You have now logged in with: ${name} and your email is: ${oauth_data.email}`)
        setUser(oauth_data.email)
}

const Error = (error: string | any) => {
setError(error)
}

    useEffect(() => {    
        redirect_mode_hook({
            onSuccess,
            Error
            });
    }, [])

    return (
        <div className="Login-page">
            <h1>Validating the oauth was successful</h1>
            {error && <p>{error}</p>}
            {user && <p>You are now authticated as: {user}</p>}
        </div>
        )
    }
````

The `redirect_mode_hook` function will perform all the necessary steps for the authentication process under the hood. And sends back the `User Information` to the `onSuccess` function if successful.

You don't have to write your own authentication handler, you just handle the response from the `redirect_mode_hook` component in your app.

Don't forget to pass the `onSuccess` and `onError` props to the `redirect_mode_hook` component. This is required, as the `redirect_mode_hook` component will handle the authentication process.
additionally <b>Make sure</b> that the code above is wrapped in the redirect url, so `/:client/redirect` (The client must be the first param in the url!) will be the redirect url. *Required*

## Example of an handler (Popup handler)

```tsx
import React, { useEffect } from'react';
import { user_hook, isPopup, handle_popup_exit } from '@kalicloud/oauthify';

function App(): React.FC {
    useEffect(() => {
        // Popup mode
        if (isPopup()) {
            handle_popup_exit()
        } 
    }, [])

    return (
        <h1>This window will close now...</h1>
    )
}

export default App;
```

The `handle_popup_exit` function will perform all the necessary steps for the authentication process under the hood. And sends back the `User Information` to the `onSuccess` function from the caller window if successful. The current window will close after the authentication process is finished.

# Diagram and Flowchart
![image](https://github.com/user-attachments/assets/da445fc1-156c-45d5-a3a1-85d5674f34fa)


# Authentication Synchronization
You may want to use Oauthify to authenticate your users on your own server backend, once Oauthify has successfully authenticated the user via the Oauth2 provider.

This is now possible within the brand new `v1.3.2` version of Oauthify.

You can now authenticate the user on your own server backend so the user can access protected routes on the server.

for servide-side implementation, please refer to: [Oauth2 Server](https://github.com/JD544/Oauth2_Server)

# What's new
> - `v1.3.2` Server Synchronization support
> - Provider `Kalicloud` is now updated and supported with the brand new authentication endpoints.
> - updated the `README.md` file with more detailed instructions.
> - Popup mode is supported, with custom hooks for maximum flexibility and customization.
> - Mutiple auth methods are supported,
> - Added Redirection hook, which will perform all the necessary steps for the authentication process under the hood. And sends back the `user_information` to the `onSuccess` function if successful.
> - Added support for `client_secret`
> - Added support for unique `state` to be validated to prevent CSRF attacks.
> - Added support for `response_type` which is used to determine the type of response that the application will receive.
> - Added support for `scope` which is used to determine what data the application will access.

# Features
 
- Fully customizable
- Fully typed
- Fully documented
- Fully tested
- Easy API authentication under the hood
- Easy to use
- No manual interaction required/ handling

## Coming soon
    - Add support for more providers
    - Add support for Logout functionality
    - Add support for Auth Status Check    
    - Add support for Refreshing Tokens 
    - Add support for Custom Oauth2.0 Implementations

## Builtin oauth providers

We have included a select few of built in providers, which you can use by passing the provider name as a string.

here is a dedication list of the providers we have included:
> - Google
> - Microsoft
> - Facebook
> - Kalicloud (Default)

Each provider will require some sort of `Client ID` and `Client Secret` to be used, some providers also require the use of an `API Key`

By default it will use the Kalicloud provider, but you can change this by passing the provider name as a string, to the `provider` prop.

Redirect URL will also need to be provided, this is the URL that the user will be redirected to after completing the oauth flow.

### List of Providers that I won't support in the future, unless they update their APIs and Authentication Standards.
> - Github
> - Twitch

# Roadmap
> - Add more hooks to handle the authentication process and user experience
> - Custom Components For each provider

# Note
This package is still in development, and is not yet ready for production use, be aware that some api usage might not be stable or not yet implemented.
