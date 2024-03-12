import { Button } from "@/components/ui/button";
import { FC } from "react";

const Denuncia: FC = () => {
  return (
    <div>
      <h1>Denuncia</h1>
      <form></form>
      <div>
        <label htmlFor="denuncia">Denuncia</label>
        <textarea id="denuncia" name="denuncia" />
      </div>
      <div>
        <label htmlFor="nome">Nome</label>
        <input id="nome" name="nome" type="text" />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" type="email" />
      </div>
      <div>
        <label htmlFor="telefone">Telefone</label>
        <input id="telefone" name="telefone" type="tel" />
      </div>
      <div>
        <Button type="submit">Enviar</Button>
      </div>
    </div>
  );
};
export default Denuncia;
