import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

export function getAllUsers(userRepository: UserRepository) {
  return async (): Promise<User[]> => {
    return await userRepository.getAll();
  };
}
