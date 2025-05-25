import app from "../firebase/firebase.init";
import { getAuth } from "firebase/auth";
import AuthContext from "./AuthContext";

const auth = getAuth(app)


const AuthProvider = ({ children }) => {


    const authInfo = {
        name: 'name'
    }


    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;