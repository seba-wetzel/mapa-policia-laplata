import { createUser, getAllUsers } from "@/actions/users";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC } from "react";

const UsuariosPage: FC = async () => {
  const users = await getAllUsers();
  return (
    <div className="bg-white">
      <h1>Usuarios</h1>
      <form action={createUser} className="flex flex-row gap-4 ">
        <input type="text" name="name" placeholder="Nombre" />
        <input type="email" name="email" placeholder="Email" />
        <select name="role">
          <option value="admin">Admin</option>
          <option value="user">User</option>
          <option value="author">Author</option>
          <option value="editor">Editor</option>
        </select>
        <input type="password" name="password" placeholder="Password" />
        <input
          type="password"
          name="repeatPassword"
          placeholder="Repeat password"
        />
        <Button type="submit">Crear usuario</Button>
      </form>

      <br />
      <Table className="font-sans">
        <TableCaption>Lista de usuarios registrados.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="]">Nombre</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Email</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UsuariosPage;
