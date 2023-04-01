import { useMemo, useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import SearchBar from "../components/admin/SearchBar";
import UsersTable from "../components/admin/UsersTable";

// these are just placeholders
const users = [
    { id: 2811, username: "lorem ipsum 1", handle: "@lorem1" },
    { id: 12811, username: "lorem ipsum 2", handle: "@lorem2" },
    { id: 31516, username: "superman3", handle: "@upserman30" },
    { id: 33188, username: "hello21036h3u", handle: "@hello_36206_egjpi" },
];

const UserManagement = () => {
    const [query, setQuery] = useState("");
    const filtered = useMemo(() => {
        // search case insensitive with flag
        // also allow admins to search with regular expressions
        // instead of stupid exact match strings
        const reg = new RegExp(query, "i");
        return users.filter(
            ({ username, handle, id }) =>
                reg.test(username) ||
                reg.test(handle) ||
                reg.test(id.toString())
        );
    }, [query]);

    const onInputChange = (text) => {
        setQuery(text);
    };

    return (
        <div>
            <AdminHeader>Manage Users</AdminHeader>
            <SearchBar
                placeholder={"Search User"}
                onInputChange={onInputChange}
                value={query}
            />
            <UsersTable users={filtered} />
        </div>
    );
};

export default UserManagement;
