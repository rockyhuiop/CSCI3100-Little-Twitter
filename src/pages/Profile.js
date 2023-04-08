import Banner from "../components/profile/Banner";
import UserInfo from "../components/profile/UserInfo";
import CenteredError from "../components/reusable/error/CenteredError";
import { useProfile } from "../utils/useProfile";

const Profile = () => {
    const { data, error, isLoading } = useProfile();

    if (isLoading) {
        return <p>Trying to load user profile...</p>;
    } else if (error === "Not logged in") {
        return (
            <CenteredError>
                There is no profile to show since the user is not logged in.
            </CenteredError>
        );
    } else if (error) {
        return (
            <CenteredError>Some horrible errors occured: {error}</CenteredError>
        );
    }

    return (
        <div>
            <Banner user={data} />
            <UserInfo user={data} />
        </div>
    );
};

export default Profile;
