import { fastify } from 'fastify';
import cors from '@fastify/cors';

import { DatabaseUsuarios } from './database-usuarios.js';
import { DatabaseEventos } from './database-eventos.js';

const database = new DatabaseUsuarios();
const databaseEventos = new DatabaseEventos();
const server = fastify();

server.register(cors, {
    origin: true,
    methods: ["POST", "GET", "PUT", "DELETE"]
})

server.post('/usuarios', async (request, reply) => {

    const { nome, telefone, email, senha, confirmeSenha } = request.body;

    if (senha === confirmeSenha) {
        await database.create({
            nome,
            telefone,
            email,
            senha
        })

        return reply.status(201).send();
    } else {
        return reply.status(400).send();
    }
})


server.get('/login', async (request, reply) => {
    const email = request.query.email;
    const senha = request.query.senha;

    const usuario = await database.login(email, senha);

    if (usuario.count === 0) {
        return reply.status(401).send;
    }
    console.log(usuario[0]);
    return reply.send(usuario[0]);

})

server.post('/senha/:id', async (request, reply) => {
    const usuarioId = request.params.id;
    const { senha, confirmeSenha } = request.body;

    if (senha === confirmeSenha) {
        await database.updateSenha(usuarioId, { senha });
        return reply.status(200).send();
    } else {
        return reply.status(400).send();
    }



});

server.put('/usuarios/:id', (request, reply) => {

    const { nome, telefone, email } = request.body;

    const usuarioId = request.params.id;

    database.update(usuarioId, {
        nome,
        telefone,
        email,
    })

    return reply.status(204).send();

})


server.post('/eventos', async (request, reply) => {

    const { titulo,
        descricaoevento,
        dataevento,
        horarioinicio,
        horariofim,
        localevento,
        tipoevento,
        statusevento,
        nomeusuario,
        usuario_id } = request.body;

    await databaseEventos.create({
        titulo,
        descricaoevento,
        dataevento,
        horarioinicio,
        horariofim,
        localevento,
        tipoevento,
        statusevento,
        nomeusuario,
        usuario_id
    })

    return reply.status(201).send();
})

server.get('/eventos/:id', async (request) => {
    const eventoId = request.params.id;

    const evento = await databaseEventos.listAllWithOneId(eventoId);

    return evento;
})

server.get('/evento/:id', async (request) => {
    const eventoId = request.params.id;
    const evento = await databaseEventos.lisOneEvento(eventoId);
    return evento;
})

server.put('/eventos/:id', async (request, reply) => {

    const { titulo,
        descricaoevento,
        dataevento,
        horarioinicio,
        horariofim,
        localevento,
        tipoevento,
        statusevento
    } = request.body;

    const eventoId = request.params.id;

    await databaseEventos.update(eventoId, {
        titulo,
        descricaoevento,
        dataevento,
        horarioinicio,
        horariofim,
        localevento,
        tipoevento,
        statusevento
    })

    return reply.status(204).send();

})

server.delete('/eventos/:id', async (request, reply) => {

    const eventoId = request.params.id;

    await databaseEventos.delete(eventoId);

    return reply.status(204).send();
})

server.listen({
    host: "0.0.0.0", //Para o render
    port: process.env.PORT ?? 3333,
});