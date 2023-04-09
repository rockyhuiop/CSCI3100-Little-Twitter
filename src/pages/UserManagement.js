import MainPage from "../components/userManagement/MainPage";
import UserManagementProvider from "../components/userManagement/UserManagementContext";

const UserManagement = () => {
    return (
        <UserManagementProvider>
            <MainPage />
        </UserManagementProvider>
    );
};

export default UserManagement;
