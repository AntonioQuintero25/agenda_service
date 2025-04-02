import { randomUUID } from "node:crypto";
import { sql } from "./sql.js";

export class DatabaseUsuarios {

    async list() {
        let usuarios;
        usuarios = await sql`select * from usuarios`;
        return usuarios;
    }

    async login(email, senha) {
        let usuario;
        if (email && senha) {
            usuario = await sql`select * from usuarios where email = ${email} and senha = ${senha}`;
        }

        return usuario;
    }

    async listOne(usuarioId) {
        let usuarios;
        usuarios = await sql`select * from usuarios where usuario_id = ${usuarioId}`;
        return usuarios;
    }

    async create(usuario) {
        const usuarioId = randomUUID();

        const {
            nome,
            telefone,
            email,
            senha } = usuario;

        await sql`insert into usuarios (usuario_id, nome, telefone, email, senha) values (${usuarioId}, ${nome}, ${telefone}, ${email}, ${senha})`;
    }

    async update(id, usuario) {
        const {
            nome,
            telefone,
            email } = usuario;

        await sql`update usuarios set 
            nome = ${nome}, 
            telefone = ${telefone}, 
            email = ${email} 
            WHERE usuario_id = ${id}`;
    }

    async updateSenha(id, usuario) {
        const {
            senha } = usuario;
        await sql`update usuarios set 
            senha = ${senha}
            WHERE usuario_id = ${id}`;
    }

    async delete(id) {
        await sql`delete from usuarios where usuario_id = ${id}`;
    }

}