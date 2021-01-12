'use strict';

const uuid = require('uuid');
const AWS = require('aws-sdk'); 
const qs = require('qs');
const Validator = require('../schemas/students');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

/**
 * createUser
 * 
 * @description Funcion para crear un nuevo estudiante
 * @param {*} event 
 */
module.exports.createUser = async (event) => {
  const { firstName, lastName, email } = qs.parse(event);
  try {
    const value = await Validator.validateAsync({firstName, lastName, email});
    const timestamp = new Date().getTime();
    const data = {
      id: uuid.v1(),
      firstName: firstName,
      lastName: lastName,
      email: email,
      submittedAt: timestamp,
      updatedAt: timestamp,
    };
    const candidateInfo = {
      TableName: process.env.STUDENT_TABLE,
      Item: data,
    };
    await dynamoDb.put(candidateInfo).promise()
    return data
  }
  catch (err) {
    return err.details;
  }
}

/**
 * listUser
 * 
 * @description Funcion para listar estudiantes
 * @param {*} event 
 */
module.exports.listUser = async (event) => {
    const candidateInfo = {
      TableName: process.env.STUDENT_TABLE,
      ProjectionExpression: "id, firstName, lastName, email"
    };
    const data = await dynamoDb.scan(candidateInfo).promise()
    return data.Items;
}