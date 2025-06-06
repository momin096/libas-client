import { Outlet } from "react-router-dom";
import NavBar from "../components/shared/NavBar";

const MainLayout = () => {
    return (
        <div>
            <NavBar />
            <Outlet />
        </div>
    );
};

export default MainLayout;