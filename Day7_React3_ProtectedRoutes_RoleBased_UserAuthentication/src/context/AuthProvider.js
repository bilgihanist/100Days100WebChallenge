import { createContext, useState } from "react";

const AuthContext = createContext({}); // create the context

export const AuthProvider = ({ children }) => {                  // create the provider
  const [auth, setAuth] = useState({});                          // create the state variable

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>             {/* provide the state variable to the children  */}
      {children}                                                 {/*render the children */} 
    </AuthContext.Provider>                                         
  );
};

export default AuthContext;                                      // export the context
