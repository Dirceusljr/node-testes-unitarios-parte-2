import { describe, expect, it } from '@jest/globals';
import Editora from '../../models/editora';

describe('Testes relacionados ao modelo Editora', () => {
  const objetoEditora = {
    nome: 'CDC',
    cidade: 'São Paulo',
    email: 'c@c.com',
  };

  it('Deve instanciar uma nova editora', () => {
    const editora = new Editora(objetoEditora);

    expect(editora).toEqual(
      expect.objectContaining(objetoEditora),
    );
  });

  it.skip('Deve salvar a editora no BD', () => {
    const editora = new Editora(objetoEditora);

    editora.salvar().then((dados) => {
      expect(dados.nome).toBe('CDC');
    });
  });

  it('Deve salvar no BD usando a sintaxe moderna', async () => {
    const editora = new Editora(objetoEditora);
    const dados = await editora.salvar();
    const retornado = await Editora.pegarPeloId(dados.id);

    expect(retornado).toEqual(
      expect.objectContaining(
        {
          id: expect.any(Number),
          ...dados,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        },
      ),
    );
  });
});