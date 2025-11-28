import { type IUser } from "@/types/types.js";

export function excludePassword(user: any): IUser {
  const { password, ...userWithoutPassword } = user;
  return userWithoutPassword as IUser;
}
