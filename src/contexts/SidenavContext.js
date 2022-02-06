import { createContext } from 'react';

const SidenavContext = createContext({
    active: false,
    setActive: () => {},
});

export default SidenavContext;
