import User from "../models/UserSchema";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string | undefined) => {
  try {
    const user = await User.findOne({ where: { id } });
    return user;
  } catch {
    return null;
  }
};
