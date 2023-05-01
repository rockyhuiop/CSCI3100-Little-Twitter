import { formatDistance } from "date-fns";

/**
 * It is a small wrapper around formatDistance, which gives the string
 * representation of the differences between two time stamps. This function
 * assumes the first argument to be the current timestamp.
 *
 * @param {string} timeStr
 * @returns {string} time ago between timeStr and now
 */
export const distance = (timeStr) => {
    return formatDistance(new Date(timeStr), new Date());
};
