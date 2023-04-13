import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Banner from "../components/profile/Banner";
import ProfileHeader from "../components/profile/ProfileHeader";
import UserInfo from "../components/profile/UserInfo";
import CenteredStatus from "../components/reusable/CenteredStatus";
import { useFetch } from "../utils/useFetch";
import { useUser } from "../utils/UserContext";

/*
The flow looks like this:

check if there is a :tweetID param
if yes use that instead of the current user profile

if not use the current user profile
*/
const Profile = () => {
    const { isLoggedIn, user: currentUser } = useUser();
    const { tweetID } = useParams();
    const url = tweetID ? `/user/${tweetID}` : "";
    const {
        data: user,
        isLoading,
        error,
        makeRequest,
        setData,
        resetError,
    } = useFetch(url, {}, true);

    // I don't start the request immediately since the request may not be needed
    // if the user is just wants his profile
    useEffect(() => {
        if (tweetID) {
            makeRequest();
        }
    }, [tweetID, isLoggedIn, makeRequest]);

    useEffect(() => {
        resetError();
    }, [isLoggedIn, resetError]);

    // a safety net: so that it doesn't go to the next lines when error occurs
    if (error) {
        return <CenteredStatus>{error}</CenteredStatus>;
    }

    // no tweetID means he wants his own profile
    // but if he is not logged in nothing can be shown!
    if (!isLoggedIn && !tweetID) {
        return (
            <CenteredStatus>
                There is no profile to show since the user is not logged in yet.
            </CenteredStatus>
        );
    }

    // has tweetID, need to wait for a new profile to be fetched
    if (tweetID && isLoading) {
        return <CenteredStatus>Loading user profile...</CenteredStatus>;
    }

    // no matter we have the tweetID or not, the same profile components
    // are used, except it is populated differently
    const userShown = tweetID ? user : currentUser;

    return (
        <div>
            <ProfileHeader user={userShown} />
            <Banner user={userShown} />
            <UserInfo user={userShown} setData={setData} />
            {/* nobody got time for this */}
            {/* <ProfileTabs user={userShown} /> */}
        </div>
    );
};

export default Profile;
