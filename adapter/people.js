const { reduce } = require('lodash')

/**
 * transform
 * 
 * @description Metodo para convertir a español los campos de respuesta
 * de; servicio people de swapi
 * @param {Object} response - Objeto de respuesta del servicio people de 
 * swapi
 */
module.exports.transform = (response) => {
  const mapping = {
    'birth_year': 'fecha_nacimiento',
    'eye_color': 'color_ojo',
    'films': 'peliculas',
    'gender': 'genero',
    'hair_color': 'color_cabello',
    'height': 'altura',
    'homeworld': 'planeta',
    'mass': 'masa',
    'name': 'nombre',
    'skin_color': 'color_piel',
    'created': 'creado',
    'edited': 'modificado',
    'species': 'especie',
    'starships': 'naves',
    'url': 'url',
    'vehicles': 'vehiculos'
  }

  return reduce(response, (result, value, key) => {
    result[(mapping[key]) ? (mapping[key]): key] = value
    return result
  }, {})

}