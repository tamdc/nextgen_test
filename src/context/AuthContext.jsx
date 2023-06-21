import { createContext, useContext, useState } from "react";
import { fakeAuth } from "../services/authen";
import { useLocation, useNavigate } from "react-router-dom";

const AuthContext = createContext(null)

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null)
    const navigate = useNavigate()
    const location = useLocation()
    const handleLogin = async ({email, password}) => {
        const tk = await fakeAuth({email, password})
        setToken(tk)
        const origin = location.state?.from?.pathname || '/portfolios'
        console.log('location', location)
        navigate(origin)
    }
    const handleLogout = () => {
        setToken(null)
    }
    return (
        <AuthContext.Provider value={{
            token,
            onLogin: handleLogin,
            onLogout: handleLogout
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)

export default AuthProvider
