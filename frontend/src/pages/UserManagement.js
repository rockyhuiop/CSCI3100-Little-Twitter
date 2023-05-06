import MainPage from "../components/userManagement/MainPage";
import UserManagementProvider from "../components/userManagement/UserManagementContext";

/**
 * For /manage/users
 * Only admin can access this page
 * see ./components/userManagement/MainPage.js for the structure of it
 */
const UserManagement = () => {
    return (
        <UserManagementProvider>
            <MainPage />
        </UserManagementProvider>
    );
};

export default UserManagement;
