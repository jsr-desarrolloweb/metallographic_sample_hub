import React, { createContext } from 'react'


// AuthStateContext: This context object will contain the authentication token and user details

// AuthDispatchContext: We will use this context object to pass the dispatch method given
// to us by the useReducer that we will be creating later to manage the state.
// This makes it easy to provide the dispatch method to components that need it.

const AuthStateContext = createContext()
const AuthDispatchContext = createContext()


export function useAuthState() {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
      throw new Error("useAuthState must be used within a AuthProvider");
    }
   
    return context
  }
   
export function useAuthDispatch() {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }

    return context
}


export const AuthProvider = ({ children }) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
   
    return (
      <AuthStateContext.Provider value={user}>
        <AuthDispatchContext.Provider value={dispatch}>
          {children}
        </AuthDispatchContext.Provider>
      </AuthStateContext.Provider>
    );
  };