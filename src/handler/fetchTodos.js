"use strict";

const AWS = require("aws-sdk");

const fetchTodos = async (event) => {
        
    const id = v4();
    const { todo } = JSON.parse(event.body);
    const createdAt = new Date();
    
    console.log("This is an id (just logging)", id);

    const newTodo = {
        id, 
        todo,
        createdAt,
        completed: false
    }
    
    const dynamoDb = AWS.DynamoDB.DocumentClient();
    
    await dynamoDb.put({
        TableName: "TodoTable",
        Item: newTodo
    })
    

    return {
    statusCode: 200,
    body: JSON.stringify(newTodo),
  };
};

module.exports = {
  handler: addTodo
}