import React, { createContext } from 'react';

const reducer = (state: any, action: any) => {
    switch (action.type) {
        case 'loginUser':
            return {
                ...state,
                isAuthenticated: action.payload.isAuthenticated,
                name: action.payload.user.name,
            };
        default:
            return state;
    }
};

export const UserContext = React.createContext({ user: { userId: 'not working' } });
export const UserContextProvider = (props: any) => {
    return <UserContext.Provider value={props}>{props.children}</UserContext.Provider>;
};

//   function useCountState() {
//     const context = React.useContext(CountStateContext)
//     if (context === undefined) {
//       throw new Error('useCountState must be used within a CountProvider')
//     }
//     return context
//   }
