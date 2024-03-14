import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export function createUser(userRepository: UserRepository) {
  return async (user: Omit<User, "id">): Promise<Boolean> => {
    return await userRepository.createUser(user);
  };
}
