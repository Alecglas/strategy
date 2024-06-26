import { useState } from 'react';
import UserContext from './UserContext.jsx';

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const updateUser = (newUser) => {
        setUser(newUser);
    };

    return (
        <UserContext.Provider value={{ user, updateUser }}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
