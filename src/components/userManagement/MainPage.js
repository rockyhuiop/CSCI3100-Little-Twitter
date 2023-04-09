import CenteredStatus from "../reusable/CenteredStatus";
import AdminHeader from "./AdminHeader";
import SearchBar from "./SearchBar";
import { useUserMangement } from "./UserManagementContext";
import UsersTable from "./UsersTable";

const MainPage = () => {
    const { isLoading, users, error } = useUserMangement();

    const mainContent = () => {
        if (isLoading) {
            return <CenteredStatus>Loading users...</CenteredStatus>;
        } else if (users) {
            return <UsersTable />;
        } else {
            return <CenteredStatus>Cannot load users: {error}</CenteredStatus>;
        }
    };
    return (
        <div>
            <AdminHeader>Manage Users</AdminHeader>
            <SearchBar />
            {mainContent()}
        </div>
    );
};

export default MainPage;
