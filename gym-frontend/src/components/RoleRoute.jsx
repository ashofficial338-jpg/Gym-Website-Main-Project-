import Navigate from "react-router-dom";

function RoleRoute({children,roles}){

const role=localStorage.getItem("role");

if(!roles.includes(role)){

return <Navigate to="/dashboard"/>

}

return children;

}

export default RoleRoute;