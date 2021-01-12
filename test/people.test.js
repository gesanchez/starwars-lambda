const { expect, describe } = require("@jest/globals");
const { transform } = require("../adapter/people");

describe('@people Adapter', () => {
  test('Deberia transformar a espanol los campos', () => {
    const model = {
      'birth_year': '25-02-2020',
      'eye_color': 'brown',
      'gender': 'male'
    };
    const expected = {
      'fecha_nacimiento': '25-02-2020',
      'color_ojo': 'brown',
      'genero': 'male'
    }
    expect(transform(model)).toEqual(expected);
  })
  test('Deberia retornar el mismo nombre de campo en caso de que no exista en el mapping', () => {
    const model = {
      'birth_year': '25-02-2020',
      'eye_color': 'brown',
      'gender': 'male',
      'dob': '01/01/1980'
    };
    const expected = {
      'fecha_nacimiento': '25-02-2020',
      'color_ojo': 'brown',
      'genero': 'male',
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