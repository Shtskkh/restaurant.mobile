import {createContext, PropsWithChildren, useState} from "react";

type AuthStore = {
    username: string | null;
    token: string | null;
    isLoggedIn: boolean;
    logIn: (username: string, token: string) => void;
    logOut: () => void;
}


export const AuthContext = createContext<AuthStore>({
    username: null,
    token: null,
    isLoggedIn: false,
    logIn: (username: string, token: string) => {
    },
    logOut: () => {
    }
});

export const AuthProvider = ({children}: PropsWithChildren) => {
    
    const [username, setUsername] = useState<string | null>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const logIn = (username: string, token: string) => {
        setUsername(username);
        setToken(token);
        setIsLoggedIn(true);
    }
    const logOut = () => {
        setIsLoggedIn(false);
    }

    return (
        <AuthContext.Provider value={{username, token, isLoggedIn, logIn, logOut,}}>
            {children}
        </AuthContext.Provider>
    )
}