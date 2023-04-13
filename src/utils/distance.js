import { formatDistance } from "date-fns";

export const distance = (timeStr) => {
    return formatDistance(new Date(timeStr), new Date());
};
