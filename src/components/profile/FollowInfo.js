import { useMemo } from "react";

const FollowInfo = ({ user }) => {
    const firstFewFollowers = useMemo(() => {
        if (!user.followers.length) {
            return "nobody";
        }
        const names = user.followers.slice(0, 3).reduce((acc, follower) => {
            return acc + follower + ", ";
        }, "");
        return (
            names.slice(0, -2) +
            (user.followers.length > 3 ? " and others" : "")
        );
    }, [user.followers]);

    return <p>Followed by {firstFewFollowers}</p>;
};

export default FollowInfo;
