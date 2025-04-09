import { createContext, useContext, useEffect, useState } from "react"
import { getUser, logoutUser } from "../services/authService";
import { authUser } from "../services/authService";
const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    const [user, setUser] = useState(null)

    const updateUser = async () => {
        try {
            const response = await getUser()
            if (response.success) {
                setUser(response.user)
            }
        } catch (err) {
            setUser(null)
            console.error("User update failed:", err)
        }
    }

    useEffect(()=>{
        updateUser()
    }, [])

    const login = async ({loginValue, password}) =>{
            const data = await authUser(loginValue, password);
            if (data.success) {
                await updateUser()
            }
            return {
                success:true,
                message: data.message || 'Login failed'
            }
        
    }
    const logout = async () =>{
        await logoutUser()
        setUser(null)
    }
    return (
        <AuthContext.Provider value={{user,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = ()=> useContext(AuthContext)