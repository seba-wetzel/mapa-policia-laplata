import { db } from "@/modules/DB";
import { User } from "../Domain/User";
import { UserRepository } from "../Domain/UserRepository";

import {
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from "drizzle-orm/pg-core";

export const UserTable = pgTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull(),
    role: text("role", {
      enum: ["admin", "user", "author", "editor"],
    }).notNull(),
    password: text("password").notNull(),
    created_at: timestamp("created_at").defaultNow().notNull(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.email),
    };
  },
);

export function createPostgresUserRepository(): UserRepository {
  async function get(id: number): Promise<User | undefined> {
    return;
  }

  async function getAll(): Promise<User[]> {
    const selectResult = await db.select().from(UserTable);
    const users: User[] = selectResult.map((row) => ({
      id: row.id,
      name: row.name,
      email: row.email,
      role: row.role,
    }));
    return users;
  }
  //asign function type UserRepository.createUser

  const createUser: UserRepository["createUser"] = async (
    user: Omit<User, "id">,
  ) => {
    if (user.password === undefined) throw new Error("Password is required");
    if (user.password !== user.repeatPassword)
      throw new Error("Passwords do not match");
    //TODO: hash password

    const insertResult = await db.insert(UserTable).values({
      name: user.name,
      email: user.email,
      role: user.role,
      password: user.password,
    });
    return !!!insertResult;
  };

  return {
    get,
    getAll,
    createUser,
  };
}
