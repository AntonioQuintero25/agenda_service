import { randomUUID } from "node:crypto";
import { sql } from "./sql.js";

export class DatabaseEventos {

    #eventos = new Map();

    list(search) {
        /*Converte uma estrutura de dados que não é um Array para um Array*/
        return Array.from(this.#eventos.entries()).map((eventosArray) => {
            const id = eventosArray[0];

            const data = eventosArray[1];

            return {
                id,
                ...data,
            }

        }).filter(evento => {
            if (search) {
                return evento.usuarioId.includes(search)
            }

            return true;
        });
    }

    async listAllWithOneId(usuarioId) {
        let eventos = await sql`select * from eventos where usuario_id = ${usuarioId}`;
        return eventos;
    }

    async lisOneEvento(eventoId) {
        let evento = await sql`select * from eventos where evento_id = ${eventoId}`;
        return evento;
    }

    async create(evento) {
        const eventoId = randomUUID();

        const { titulo,
            descricaoevento,
            dataevento,
            horarioinicio,
            horariofim,
            localevento,
            tipoevento,
            statusevento,
            nomeusuario,
            usuario_id } = evento;

        await sql`insert into eventos 
        (evento_id, 
        titulo, 
        descricaoevento, 
        dataevento, 
        horarioinicio, 
        horariofim, 
        localevento, 
        tipoevento, 
        statusevento, 
        nomeusuario, 
        usuario_id) values 
            (${eventoId}, 
            ${titulo}, 
            ${descricaoevento}, 
            ${dataevento}, 
            ${horarioinicio}, 
            ${horariofim},
            ${localevento},
            ${tipoevento},
            ${statusevento},
            ${nomeusuario},
            ${usuario_id})`;
    }

    async update(id, evento) {
        const { titulo,
            descricaoevento,
            dataevento,
            horarioinicio,
            horariofim,
            localevento,
            tipoevento,
            statusevento
        } = evento;

        await sql`update eventos set 
        titulo = ${titulo}, 
        descricaoevento = ${descricaoevento}, 
        dataevento = ${dataevento},
        horarioinicio = ${horarioinicio},
        horariofim = ${horariofim},
        localevento = ${localevento},
        tipoevento = ${tipoevento},
        statusevento = ${statusevento}
        WHERE evento_id = ${id}`;
    }

    async delete(id) {
        await sql`delete from eventos where evento_id = ${id}`;
    }

}