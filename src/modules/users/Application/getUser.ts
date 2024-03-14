import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export function getUser(userRepository: UserRepository) {
  return async (userId: User["id"]): Promise<User | undefined> => {
    return await userRepository.get(userId);
  };
}
