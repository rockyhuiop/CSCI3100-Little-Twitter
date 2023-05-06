import { Fragment } from "react";
import CenteredStatus from "../reusable/CenteredStatus";
import AdminHeader from "./AdminHeader";
import SearchBar from "./SearchBar";
import { useUserMangement } from "./UserManagementContext";
import UsersTable from "./UsersTable";

/**
 * The user management page
 * This should be on the UserMangement page instead, but I had to move it here
 * because I need to wrap it in a UserManagement context.
 * The context avoids passing the user lists around. (see that component for more details)
 */
const MainPage = () => {
    const { isLoading, error } = useUserMangement();

    const mainContent = () => {
        if (isLoading) {
            return <CenteredStatus>Loading users...</CenteredStatus>;
        } else if (error) {
            return <CenteredStatus>Cannot load users: {error}</CenteredStatus>;
        } else {
            return (
                <Fragment>
                    <SearchBar />
                    <UsersTable />
                </Fragment>
            );
        }
    };
    return (
        <div>
            <AdminHeader>Manage Users</AdminHeader>
            {mainContent()}
        </div>
    );
};

export default MainPage;
