export const gender = ["male", "female", "other"] as const;

export const role = ["super-admin", "admin", "user"] as const;

export const status = ["active", "inactive", "deactivated", "blocked"] as const;

export const uniqueId = ["email", "phoneNumber"];

const UserConst = { gender, role, status, uniqueId };

export default UserConst;
