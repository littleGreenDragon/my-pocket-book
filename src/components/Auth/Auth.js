const { getToken } = require("@/util");
const { Navigate } = require("react-router-dom");

function Auth({children}){
    const token = getToken();
    if(token){
        return <>{children}</>
    } else{
        return <Navigate  to={"/"} replace/>
    }
}

export default Auth;