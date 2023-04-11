import { Fragment } from "react";
import CenteredStatus from "../reusable/CenteredStatus";
import AdminHeader from "./AdminHeader";
import SearchBar from "./SearchBar";
import { useUserMangement } from "./UserManagementContext";
import UsersTable from "./UsersTable";

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
