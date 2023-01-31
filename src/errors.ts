export const ERRORS = {
  NOT_AUTHENTICATED: 1,
  USERS_DOES_NOT_EXIST: 2,
  PASSWORD_INCORRECT: 3,
};

export const ERROR_MAPPINGS = {
  [ERRORS.NOT_AUTHENTICATED]: "You must be logged in before doing that action.",
  [ERRORS.USERS_DOES_NOT_EXIST]: "This user cannot be found.",
  [ERRORS.PASSWORD_INCORRECT]: "The password is incorrect.",
};
