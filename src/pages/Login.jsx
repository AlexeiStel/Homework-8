import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

export function Login() {
    const navigate = useNavigate()
    const auth = useAuth();
    const location = useLocation();

    const from = location.state?.from || "/";

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const username = formData.get('username')

        auth.signin(username, () => {
           
            navigate(from, {
                replce: true
            });
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label>
                    UserName: <input type="text" name="username"/>
                </label>
                <button type="submit">Login</button>
            </form>
        </>
    ) 
}