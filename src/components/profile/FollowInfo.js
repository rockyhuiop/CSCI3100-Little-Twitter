import { Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import styles from "./FollowInfo.module.css";

const LIMIT = 3;

const FollowInfo = ({ user }) => {
    const firstFewFollowers = useMemo(() => {
        if (!user.followers.length) {
            return "nobody";
        }
        const size = Math.min(user.followers.length, LIMIT);
        const names = user.followers.slice(0, LIMIT).map((follower, index) => {
            return (
                <Fragment key={`follower-${index}`}>
                    <Link to={`/profile/${follower}`} className={styles.name}>
                        {follower}
                    </Link>
                    {index !== size - 1 ? ", " : ""}
                </Fragment>
            );
        });
        return names;
    }, [user.followers]);

    return <p>Followed by {firstFewFollowers}</p>;
};

export default FollowInfo;
