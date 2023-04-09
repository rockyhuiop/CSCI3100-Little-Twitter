import Banner from "../components/profile/Banner";
import ProfileTabs from "../components/profile/ProfileTabs";
import UserInfo from "../components/profile/UserInfo";
import CenteredStatus from "../components/reusable/CenteredStatus";
import { useUser } from "../utils/UserContext";
const Profile = () => {
    const { isLoggedIn, user, isProfileLoading } = useUser();

    if (isProfileLoading) {
        return <CenteredStatus>Loading user profile...</CenteredStatus>;
    }

    if (!isLoggedIn) {
        return (
            <CenteredStatus>
                There is no profile to show since the user is not logged in yet.
            </CenteredStatus>
        );
    }

    return (
        <div>
            <Banner user={user} />
            <UserInfo user={user} />
            <ProfileTabs user={user} />
        </div>
    );
};

export default Profile;
