'use strict';

const adapterFilms = require('../adapter/films');
const adapterPeople = require('../adapter/people');
const axios = require('axios');
const { map } = require('lodash');

/**
 * films
 * @description Function para integrar con servicio
 * swapi de people
 * @param {*} event 
 */
module.exports.films = async (event, context, callback) => {
  const API_URL = 'https://swapi.py4e.com/api/films'
  const response = await axios.get(API_URL);
  const result = map(response.data.results, x => adapterFilms.transform(x));
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result)
  });
}

/**
 * people
 * 
 * @description Function para integrar con servicio
 * swapi de people
 * @param {*} event 
 */
module.exports.people = async (event, context, callback) => {
  const API_URL = 'https://swapi.py4e.com/api/people'
  const response = await axios.get(API_URL);
  const result = map(response.data.results, x => adapterPeople.transform(x));
  callback(null, {
    statusCode: 200,
    body: JSON.stringify(result)
  });
}