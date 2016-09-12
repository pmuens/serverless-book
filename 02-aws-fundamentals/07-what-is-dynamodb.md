# What is DynamoDB?

[DynamoDB](https://aws.amazon.com/dynamodb/) is a NoSQL database service with nearly infinite scalability and flexibility.

[NoSQL](/xx-glossary/01-glossary.md#nosql) means that you don't have to specify a schema which declares what kind of data you store (like you would do when you use a relational database).

DynamoDB can be operated in different setups. You could for example use DynamoDB to store your data in key-value pairs. We'll use the document setup which means that we'll store JSON objects in our database.

## How Serverless uses DynamoDB

DynamoDB is "just another AWS service" we'll use throughout this book to store data in a database. It's absolutely not a must to use DynamoDB so that the Serverless framework works.
