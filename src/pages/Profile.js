import { useEffect, useState } from "react";
import Banner from "../components/profile/Banner";
import UserInfo from "../components/profile/UserInfo";

function createURLFromBytes(file) {
    const base64 = btoa(
        file.data.data.map((d) => String.fromCharCode(d)).join("")
    );
    return `data:${file.contentType};base64,${base64}`;
}

const Profile = () => {
    const [status, setStatus] = useState("idle");
    const [user, setUser] = useState(null);

    useEffect(() => {
        (async () => {
            setStatus("loading");
            const response = await fetch("/profile", {
                method: "GET",
                headers: {
                    "Content-Type":
                        "application/x-www-form-urlencoded;charset=UTF-8",
                },
            });
            const json = await response.json();
            json.data.avatar = createURLFromBytes(json.data.avatar);
            json.data.banner = createURLFromBytes(json.data.banner);
            setUser(json.data);
            setStatus("done");
        })();
    }, []);

    if (status === "done" && user) {
        return (
            <div>
                <Banner user={user} />
                <UserInfo user={user} />
            </div>
        );
    } else {
        return <div>Trying to load user profile...</div>;
    }
};

export default Profile;
