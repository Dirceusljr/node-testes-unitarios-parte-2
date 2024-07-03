import {
  afterEach, beforeEach, describe, expect, it,
  test,
} from '@jest/globals';
import request from 'supertest';
import app from '../../app';

let server;

beforeEach(() => {
  const port = 3000;
  server = app.listen(port);
});

afterEach(() => {
  server.close();
});

describe('GET em /editoras', () => {
  it('Deve retornar uma lista de editoras', async () => {
    const resposta = await request(app)
      .get('/editoras')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200);

    expect(resposta.body[0].email).toBe('e@e.com');
  });
});

let idResposta;

describe('POST em /editoras', () => {
  it('Deve criar uma nova editora', async () => {
    const resposta = await request(app)
      .post('/editoras')
      .expect(201)
      .send({
        nome: 'CDC',
        cidade: 'São Paulo',
        email: 's@s.com',
      });

    idResposta = resposta.body.content.id;
  });

  it('Deve não adicionar nada ao passar um body vazio', async () => {
    await request(app)
      .post('/editoras')
      .send({})
      .expect(400);
  });
});

describe('GET em /editoras/id', () => {
  it('Deve encontrar uma editora específica', async () => {
    await request(app)
      .get(`/editoras/${idResposta}`)
      .expect(200);
  });
});

describe('PUT em /editoras/id', () => {
  test.each([
    ['nome', { nome: 'Casa do Código' }],
    ['cidade', { cidade: 'SP' }],
    ['email', { email: 'cdc@cdc.com' }],
  ])('Deve atualizar o campo %s', async (chave, param) => {
    await request(app)
      .put(`/editoras/${idResposta}`)
      .send(param)
      .expect(204);
  });
});

describe('DELETE em /editoras/id', () => {
  it('Deve deletar uma editora', async () => {
    await request(app)
      .delete(`/editoras/${idResposta}`)
      .expect(200);
  });
});
