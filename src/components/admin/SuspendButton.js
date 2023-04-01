import { useState } from "react";
import Button from "../reusable/Button";

const SuspendButton = ({ user }) => {
    // this should be based on the current user
    // now this is just a placeholder
    const [suspensionStatus, setSuspensionStatus] = useState(false);
    const toggleSuspend = () => {
        setSuspensionStatus(!suspensionStatus);
    };

    return (
        <Button
            size="small"
            variant={"outlined"}
            scheme={"secondary"}
            onClick={toggleSuspend}
        >
            {suspensionStatus ? "Unsuspend" : "Suspend"}
        </Button>
    );
};

export default SuspendButton;
