import { sql } from './sql.js';

/*
sql`
    CREATE TABLE usuarios (
        usuario_id TEXT PRIMARY KEY,
        nome TEXT,
        telefone TEXT,
        email TEXT,
        senha TEXT
    );
`.then(() => {
    console.log("Tabela usuarios criada");
}).catch(error => console.log(error));*/

/*
sql`
    CREATE TABLE eventos (
        evento_id TEXT PRIMARY KEY,
        titulo TEXT,
        descricaoEvento TEXT,
        dataEvento TEXT,
        horarioInicio TEXT,
        horarioFim TEXT,
        localEvento TEXT,
        tipoEvento TEXT,
        statusEvento TEXT,
        nomeUsuario TEXT,
        usuario_id TEXT REFERENCES usuarios (usuario_id)
    );
`.then(() => {
    console.log("Tabela usuarios criada");
}).catch(error => console.log(error));
*/