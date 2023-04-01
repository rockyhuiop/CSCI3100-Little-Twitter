import AdminHeader from "../components/admin/AdminHeader";
import SearchBar from "../components/admin/SearchBar";

const UserManagement = () => {
    return (
        <div>
            <AdminHeader>Manage Users</AdminHeader>
            <SearchBar placeholder={"Search User"} />
        </div>
    );
};

export default UserManagement;
