"use strict";

const { v4 } = require("uuid");
const AWS = require("aws-sdk");

const addTodo = async (event) => {
        
    const id = v4();
    const { todo } = JSON.parse(event.body);
    const createdAt = new Date().toISOString;
    
    console.log("This is an id (just logging)", id);

    const newTodo = {
        id, 
        todo,
        createdAt,
        completed: false
    }
    
    const dynamoDb = new AWS.DynamoDB.DocumentClient();
    
    await dynamoDb.put({
        TableName: "TodoTable",
        Item: newTodo
    }).promise()
    

    return {
        statusCode: 200,
        body: JSON.stringify(newTodo)
    };
};

module.exports = {
  handler: addTodo
}