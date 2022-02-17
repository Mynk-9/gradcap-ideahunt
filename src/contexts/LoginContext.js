import { createContext } from 'react';

const LoginContext = createContext({
    loginData: null,
    setLoginData: () => {},
});

export default LoginContext;
