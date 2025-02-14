import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider"

export function AuthStatus() {
    const auth = useAuth();
    const navigate = useNavigate() ;  
    
    const handleSignout = () => {
        auth.signout(() => {
            navigate("/")
        })
    }
    
    if (auth.user === null) {
        return <p>Not logged in</p>
    }

    return (
        <p>
            Welcome user {auth.user}
            <button onClick={handleSignout}>Sign out</button>
        
        </p>
    )
}