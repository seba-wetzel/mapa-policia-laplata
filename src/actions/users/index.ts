import { User } from "@/modules/users/Domain/User";
import { UserRepository } from "@/modules/users/Domain/UserRepository";
import { createPostgresUserRepository } from "@/modules/users/Infrastructure/PostgresUserRepository";

const userRepository: UserRepository = createPostgresUserRepository();

export const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.getAll();
};

export const createUser = async (formData: FormData): Promise<Boolean> => {
  "use server";
  const user = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    role: formData.get("role") as User["role"],
    password: formData.get("password") as string,
    repeatPassword: formData.get("repeatPassword") as string,
  };
  return await userRepository.createUser(user);
};
