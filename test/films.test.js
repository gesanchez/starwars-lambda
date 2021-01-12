const { expect, describe } = require("@jest/globals");
const { transform } = require("../adapter/films");

describe('@films Adapter', () => {
  test('Deberia transformar a espanol los campos', () => {
    const model = {
      'characters': 'Luke Skywalker',
      'created': '25-02-2020',
      'director': 'George Lucas'
    };
    const expected = {
      'caracteres': 'Luke Skywalker',
      'creado': '25-02-2020',
      'director': 'George Lucas'
    }
    expect(transform(model)).toEqual(expected);
  })
  test('Deberia retornar el mismo nombre de campo en caso de que no exista en el mapping', () => {
    const model = {
      'characters': 'Luke Skywalker',
      'created': '25-02-2020',
      'director': 'George Lucas',
      'dob': '01/01/1980'
    };
    const expected = {
      'caracteres': 'Luke Skywalker',
      'creado': '25-02-2020',
      'director': 'George Lucas',
      'dob': '01/01/1980'
    }
    expect(transform(model)).toEqual(expected);
  })

  test('Deberia retornar {} si el valor ingresado es null o undefined', () => {
    const expected = {}
    expect(transform(null)).toEqual(expected);
    expect(transform(undefined)).toEqual(expected);
  })
})