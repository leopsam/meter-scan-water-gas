import measureRepositories from './../repositories/measure-repository';
//import bcrypt from "bcrypt";
//import { User } from "../types/user-type";

async function getAllMeasure() {
  return await measureRepositories.getAll();
}

/*export async function createUser(userData: User) {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const createUser = await measureRepositories.getAll({
    ...userData,
    password: hashedPassword,
  });
  if (!createUser) throw new Error("Unable to register user1");

  return createUser;
}*/

export default {
  getAllMeasure,
  //createUser,
};
