const { expect, describe } = require("@jest/globals");
const { films, people } = require('../api/swapi');
const axios = require('axios');

jest.mock('axios');

describe('@swapi films', () => {
  test('Deberia retornar la data que responde el servicio y los campos traducidos', async() => {
    const users = [{title: 'Clone Attacks', director: 'George Lucas', producer: 'Gary Kurtz, Rick McCallum'}];
    const expected = [{titulo: 'Clone Attacks', director: 'George Lucas', productor: 'Gary Kurtz, Rick McCallum'}];
    axios.get.mockResolvedValue({data: {results: users}});
    const result = await films();
    expect(result).toEqual(expected);
  });
});


describe('@swapi people', () => {
  test('Deberia retornar la data que responde el servicio y los campos traducidos', async() => {
    const users = [{name: 'Luke Skywalker', eye_color: 'browm', gender: 'male'}];
    const expected = [{nombre: 'Luke Skywalker', color_ojo: 'browm', genero: 'male'}];
    axios.get.mockResolvedValue({data: {results: users}});
    const result = await people();
    expect(result).toEqual(expected);
  });
});