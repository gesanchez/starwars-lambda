const { expect, describe } = require("@jest/globals");
const { createUser, listUser } = require("../api/students");
const AWS = require('aws-sdk');
jest.mock('aws-sdk');

const put = jest.fn();
AWS.DynamoDB.DocumentClient.prototype.put.mockImplementation((_, cb) => {
  cb(null, {});
});

AWS.DynamoDB.DocumentClient.prototype.scan.mockImplementation((_, cb) => {
  return {
    promise: jest.fn().mockReturnValue({ Items: [{
      firstName: 'Jhon',
      lastName: 'Doe',
      email: 'jhon@mail.com'
    }] })
  }
});

describe('@students #createUser', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('Deberia guardar la informacion de la base de datos', async() => {
    const callback = jest.fn()
    const obj = { firstName: 'aas', lastName: 'asd', email: 'email@mail.com'}
    const result = await createUser(obj, null, callback)
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls.length).toBe(1);
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls[0][0].Item.firstName).toBe(obj.firstName);
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls[0][0].Item.lastName).toBe(obj.lastName);
    expect(AWS.DynamoDB.DocumentClient.prototype.put.mock.calls[0][0].Item.email).toBe(obj.email);
    expect(callback.mock.calls.length).toBe(1);
  });
});


describe('@students #listUser', () => {
  beforeEach(() => {
    jest.resetModules();
  });
  test('Deberia leer la informacion de la base de datos', async() => {
    const callback = jest.fn()
    const result = await listUser(null, null, callback);
    expect(AWS.DynamoDB.DocumentClient.prototype.scan.mock.calls.length).toBe(1);
    expect(callback.mock.calls.length).toBe(1);
  });
})