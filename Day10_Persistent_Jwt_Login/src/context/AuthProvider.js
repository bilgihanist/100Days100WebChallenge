import { createContext, useState } from "react";

const AuthContext = createContext({}); // create the context

export const AuthProvider = ({ children }) => {                  // create the provider
  const [auth, setAuth] = useState({});                          // create the state variable
  const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>             {/* provide the state variable to the children  */}
      {children}                                                 {/*render the children */} 
    </AuthContext.Provider>                                         
  );
};

export default AuthContext;                                      // export the context
