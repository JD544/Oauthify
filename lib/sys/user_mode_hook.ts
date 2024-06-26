import { provider } from "../main";

class UserModeHook {
    private user: any;
    private Provider: provider;
    constructor() {
        this.user = JSON.parse(localStorage.getItem("user") || "{}");
        this.Provider = JSON.parse(localStorage.getItem("lastProvider") || "{}");
    }

    /**
     * Returns the user data from the Oauthify provider, when authenticated.
     * @returns {any} The user data.
     * @throws {Error} If the user data is not set.
     * @memberof UserModeHook
     */
    public getUser<T>(): T {
        if (!this.user) 
            throw new Error("Tried to retrieve user data but it was not set");
        return this.user;
    }

    public checkProvider() {
        if (!this.Provider) 
            throw new Error("Tried to retrieve user data but it was not set");
        return this.Provider as provider;
    }


    public checkAuth() {

    }
}

export { UserModeHook }