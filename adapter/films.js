const { reduce } = require('lodash')

/**
 * transform
 * 
 * @description Metodo para convertir a español los campos de respuesta
 * de; servicio films de swapi
 * @param {Object} response - Objeto de respuesta del servicio films de 
 * swapi
 */
module.exports.transform = (response) => {
  const mapping = {
    'characters': 'caracteres',
    'created': 'creado',
    'director': 'director',
    'edited': 'modificado',
    'episode_id': 'episodio_identificador',
    'opening_crawl': 'rastreo',
    'planets': 'planetas',
    'producer': 'productor',
    'release_date': 'fecha_estreno',
    'species': 'especies',
    'starships': 'naves',
    'title': 'titulo',
    'url': 'url',
    'vehicles': 'vehiculos'
  }

  return reduce(response, (result, value, key) => {
    result[(mapping[key]) ? (mapping[key]): key] = value
    return result
  }, {})

}