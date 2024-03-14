export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  role: "admin" | "user" | "author" | "editor";
  password?: string;
  repeatPassword?: string;
}
