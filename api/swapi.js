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
module.exports.films = async (event) => {
  const API_URL = 'https://swapi.py4e.com/api/films'
  const response = await axios.get(API_URL);
  return map(response.data.results, x => adapterFilms.transform(x));
}

/**
 * people
 * 
 * @description Function para integrar con servicio
 * swapi de people
 * @param {*} event 
 */
module.exports.people = async (event) => {
  const API_URL = 'https://swapi.py4e.com/api/people'
  const response = await axios.get(API_URL);
  return map(response.data.results, x => adapterPeople.transform(x));
}