# A Serverless Todo application

Now that we've seen how easy it is to create, deploy and manage our own Serverless service we'd like to dig deeper into the world of the Serverless framework and build real world, event driven applications.

These chapters are meant to show you the full power of Serverless. We'll build example applications for different  use cases. This way you'll see that the Serverless framework is a great tool to achieve different goals / work in different environments. The number of different things you can build with Serverless is endless.

Serverless is not only restricted to build web applications or data processing pipelines. Basically everything which can fire an event can trigger your function to execute code you wrote which means that the stuff you can build is only restricted by your imagination!

Let's start with our very first application!

Our first application is a web application. We'll create a simple todo application in JavaScript / Node.js and deploy it to AWS. Excited and ready? Let's go!

## Table of contents

- [The code](#the-code)
- [Aside: Data storage and DynamoDB](#aside-data-storage-and-dynamodb)
- [What we'll build](#what-well-build)
- [Creating a Serverless todos service](#creating-a-serverless-todos-service)
- [Creating the DynamoDB todos table](#creating-the-dynamodb-todos-table)
- [Creating the IAM role statements](#creating-the-iam-role-statements)
- [Deploying the first time](#deploying-the-first-time)
- [Creating a package.json file](#creating-a-packagejson-file)
- [Creating todos](#creating-todos)
- [Retrieving all todos](#retrieving-all-todos)
- [Retrieving a single todo](#retrieving-a-single-todo)
- [Updating todos](#updating-todos)
- [Deleting todos](#deleting-todos)

---

## The code

The whole code we'll write is available in the [todo code directory](/xx-code/todos). Just open up this directory to follow along or read through it if you face any problems.

## Aside: Data storage and DynamoDB

Before we get right into coding I'd like to talk about data persistence. One recommendation we have for our todo application is that the data we enter there is stored in a database. You might have heard about databases such as [MySQL](https://www.mysql.com/) or [PostgreSQL](https://www.postgresql.org/) which are so called [RDBMS](/xx-terminologies/01-terminologies.md#rdbms) or "relational databases". AWS, our cloud provider of choice offers hosted versions of those databases.

However AWS also runs their own database system called [DynamoDB](https://aws.amazon.com/dynamodb/) which is a so called schemaless / [NoSQL](/xx-terminologies/01-terminologies.md#nosql) database. We'll use [DynamoDB](https://aws.amazon.com/dynamodb/) in our application as it scales pretty easy, is rock solid (Amazon runs their own marketplace atop of it) and fits well into the Serverless world.

Don't be intimidated if you've not worked with DynamoDB or other database systems in the past. It's pretty simple and easy to use. I'll promise! :smiley:

## What we'll build

Before we dive right into code we shoud sketch out briefly what we're about to build here and what the final application will look like.

First of all we need to distinguish between the frontend (the stuff the user will see) and the backend (the business logic which is hidden from the user). We'll create both, but will focus on the backend part here as its the one which is powered by Serverless at the end of the day. Our Serverless backend application will act as an [API](/xx-terminologies/01-terminologies.md#api) you can talk to via [http](/xx-terminologies/01-terminologies.md#http). This makes it possible that you can switch out the frontend later on or develop an additional iOS or Android application which will interact through the HTTP interface.

Don't worry if it sounds abstract right now. We'll see the benefits later on when we're done.

What kind of functionality should our application offer?
We should be able to:

- View all our todos in a list
- Create new todos
- Update previously created todos
- Delete todos

That's basically it. The functionality which is describes here is often refered to as a [CRUD](/xx-terminologies/01-terminologies.md#crud) implementation which means "Create", "Read", "Update", "Delete".

Ok. Now that we've defined how our application will look like we want to start with our first part: The backend.

## Creating a Serverless `todos` service

Our backend is (obviously) powered by Serverless. Let's create a new Serverless service witht he name `todo` by running

```bash
serverless create --template aws-nodejs --path todos
```

We've chosen the `aws-nodejs` template as we're about to develop our backend in Node.js / JavaScript. Furthermore we've provided the `--path` option which will create a `todos` directory for us (or use an existing directory with the name `todos`) and rename the service to `todos` for us.

Next up we need to open the `todos` directory with the editor of our choice.

## Creating the DynamoDB `todos` table

As already mentioned above we're about to store all our todos in a database. In our case we've decided to use AWS DynamoDB. Serverless has no idea yet that we want to use DynamoDB to persist our todos so we need to define it so that Serverless will recognize it during deployment time and created the necessary DynamoDB table for us.

We can define and create additional resources we want to use with the help of the `resources` section inside of the `serverless.yml` file. So let's open up the `serverless.yml` file inside of our text editor and append the following code to the end of the file:

```yml
resources:
  Resources:
    TodosDynamoDbTable:
      Type: 'AWS::DynamoDB::Table'
      DeletionPolicy: Retain
      Properties:
        AttributeDefinitions:
          -
            AttributeName: id
            AttributeType: S
        KeySchema:
          -
            AttributeName: id
            KeyType: HASH
        ProvisionedThroughput:
          ReadCapacityUnits: 1
          WriteCapacityUnits: 1
        TableName: 'todos'
```

If you're already familiar with CloudFormation you might recognize some similarities here. The code we wrote here is basically the YAML syntax definition of a CloudFormation DynamoDB table template. It starts with the nesting inside of `TodosDynamoDBTable:`

We define that AWS should create a new DynamoDB table with the `TableName: 'todos'`. This table won't be removed when we delete the whole service (`DeletionPolicy: Retain`). It will use 1 read and 1 write capacity unit (this is the unit we have to define so that AWS know what kind of traffic we're about to handle) and the `id` is our hash key (think of it like a `primary key` when coming from SQL).

When we deploy our `todo` service later on Serverless will scan the `serverless.yml` file for the `resources` section for custom resources the user has defined here. It will then translate them from `YAML` to `JSON` and merge them into the core CloudFormation template which is provided by Serverless (and setups everything so that your lambda functions are deployed and can be used correctly). In our case Serverless will see that we're about to create a DynamoDB table. Serverless will then tell AWS to create this `todos` table with the help of the CloudFormation template this table definition is merged into.

## Creating the IAM role statements

We've now defined how our todos are stored. But there's one more step we need to take so that our Lambda functions have the correct permission to insert data into our database.

You might recap from the beginning of the book that access can be managed with the help of IAM roles. We'll now define the IAM roles so that our Lambda functions have the correct permissions to store and manipulate data in our database.

Open up the `serverless.yml` file in your editor and update the `provider` section so that it looks like this:

```yml
provider:
  name: aws
  runtime: nodejs4.3
  iamRoleStatements:
    - Effect: Allow
      Action:
        - dynamodb:DescribeTable
        - dynamodb:Query
        - dynamodb:Scan
        - dynamodb:GetItem
        - dynamodb:PutItem
        - dynamodb:UpdateItem
        - dynamodb:DeleteItem
      Resource: "arn:aws:dynamodb:us-east-1:*:*"
```

This way Serverless knows that it needs to setup permissions for your Lambda function so that they can e.g. `Query` the table or perform the `DeleteItem` operation on DynamoDB tables in the `us-east-1` region.

## Deploying the first time

Let's check if everything works as expected and verify that our DynamoDB database gets created.

Run

```bash
serverless deploy
```

in the root of the service directory. After that login to your AWS account and navigate to the `DynamoDB` section in the `us-east-1` region. You should now see a DynamoDB table with the name `todos`.

Great! We've now setup everything so that we can store, access and manipulate our todos into the DynamoDB database.

## Creating a `package.json` file

Next up we need to create a `package.json` file because we're about to use some npm packages to e.g. create unique `ids` for our todo items in our Lambda functions.

Create a new file called `package.json` in the root of your servie with the following content:

```json
{
  "name": "todos",
  "version": "0.1.0",
  "description": "Todo service built with Serverless",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "MIT",
  "dependencies": {
    "aws-sdk": "^2.5.5",
    "uuid": "^2.0.2"
  }
}
```

You can see that we've added two packages here.

THe firs one is [`aws-sdk`](https://www.npmjs.com/package/aws-sdk) which gives us access to work with AWS services (this is not necessary as Lambda functions automatically have access to the SDKs in the corresponding runtime language).

Additionally we've added the [`uuid`](https://www.npmjs.com/package/uuid) package which will help us generate unique ids we can use as our `id` attribute for our todos.

Next up run

```bash
npm install
```

so that the packages are installed inside our service directory.

You can add any npm package you'd like to use in your Lambda functions here. Servereless will consider those packages when it zips the service and uploads it to S3.

## Creating todos

Let's write our first Lambda function so that we can submit our todo over HTTP and then store it in our database.

We'll implement the create functionality in a 3 step process.

### 1. Updating the `serverless.yml` file

The first thing we'll need to do is to add a new function definition for our `create` functionality in our `serverelss.yml` file.

Open up the `serverelss.yml` file and add the following code to the `functions` section (You can remove the function definition Serverelss has automatically created for you):

```yml
functions:
  create:
    handler: handler.create
    events:
      - http: POST todos
```

Here we'll tell Serverelss that we want to create a new function called `create`. The handler which is the kind of starting point for the function points to the exported `create` function of the `handler.js` file (`handler: handler.create`).

Our function will have one event definition it responds to (`http`). Serverelss will create a new API Gateway endpoint which will react on `POST` requests which are sent to the `/todos` path.

### 2. Implementing the `create` logic

Next up we need to add the logic which will insert our new todo into the database. Create a new file called `todos-create.js` in the root of the service with the following content:

```javascript
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const uuid = require('uuid');

module.exports = (event, callback) => {
  const data = event.body;

  data.id = uuid.v1();
  data.updatedAt = new Date().getTime();

  const params = {
    TableName: 'todos',
    Item: data
  };

  return dynamoDb.put(params, function (error, data) {
    if (error) {
      callback(error);
    } else {
      callback(error, params.Item);
    }
  });
};
```

The code works as follows. At first we'll require all the necessary packages we need. We'll require the AWS SDK, create a new DyanmoDB instance with the help of the AWS SDK and require the `uuid` package so that we can generate unique ids.

After that we export a function which can receive an `event` and a `callback` function.

Inside of this function we'll get the data of the todo we're about to create from the `event` parameter (The data such as the HTTP POST body where the information about the todos is stored will be passed from API Gateway down to the Lambda function and is accessible there).

We then make a DynamoDB call and store the new todo in our `todos` table. At the end we call the `callback` and return either the successfully created todo or an error.

### 3. Updating the `handler.js` file

The last thing we need to do is to update our `handler.js` file. This file is used as a orchestration / organization layer so that AWS can associate the correct pieces of code with the corresponding Lambda function (which we've already defined in the `serverless.yml` file). Furthermore it helps us with the separation of function logic. You'll soon see why it's better to separate the code into different concerns.

Open up the `handler.js` file. remove the `module.exports` definition Serverless has created for us as a starting point.
Then require the function code we've written previously by writing this piece of code at the top of the file:

```javascript
const todosCreate = require('./todos-create.js');
```

Next up add an export `create` statement like this to wire up the handler with the actual function logic:

```javascript
module.exports.create = (event, context, callback) => {
  todosCreate(event, (error, response) => {
    context.done(error, response);
  });
};
```

### Deploying and creating our first todo

Let's test-flight our todo creation functionality.

At first we need to deploy the code. Run

```bash
serverless deploy
```

So that Serverless will zip up our previously written code, creates an API Gateway endpoint based on the `http` event definition we've added to the `serverless.yml` file and sets up everything.

After the deployment succeeds you'll see the created entpoint in the terminal.

Run the following CURL command to create the first todo:

```bash
curl -H "Content-Type: application/json" -X POST -d '{ "body" : "My first todo" }' <your-endpoint-url>
```

The response will be the newly added todo!

Awesome! :dancers: You've just created your first todo with the help of your new Serverless todos service! :tada:

## Retrieving all todos

Now that we have a way to create and store new todos we also want a way to retrieve them. Let's extend our codebase so that we can retrieve all todos available in the database.

### 1. Updating the `serverless.yml` file

Let's add the `readAll` function definition to our `serverless.yml` file so that Serverless knows that we want to use a new Lambda function whichs purpose is to return all the available todos from our DynamoDB database. Furthermore we'll add the `http` event so that we can access our todos through our HTTP API.

Add the following code nested inside of the `functions` definition (on the same level as our `create` function):

```yml
readAll:
  handler: handler.readAll
  events:
    - http: GET todos
```

Let's take a look what this definition means.

We've defined a new function definition with the name `readAll`. This function points to the exported `readAll` method which can be found in the `handler.js` file (`handler: handler.readAll`). A `http` event is added so that we can trigger the Lambda function by issuing a `GET` request against the `todos` path.

### 2. Implementing the `readAll` logic

Let's implement the `getAll` logic for our Lambda function which will read all the todos from our DynamoDB and returns them.

Create a new file called `todos-read-all.js` in the root of the service directory and add the following code:

```javascript
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
  };

  return dynamoDb.scan(params, (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(error, data.Items);
    }
  });
};
```

This code is very simple. At first we require the `aws-sdk` package so that we can create a new DynamoDB instance we can use in our code. Next up we export a function which will retrieve the Lambda `event` and `callback` as arguments.

We then do a `scan` operation against our DynamoDB which will return all the todos available in our database as an Array. We'll return this array with our todo objects in the callback if everything is fine. Otherwise we'll return an error.

**Note:** The `scan` operation scans the whole DynamoDB table which is very inefficient in large scale production apps. You might want to consider the `query` operation in a real world scenario.

### 3. Updating the `handler.js` file

The last thing we need to do is to update the `handler.js` file so that it points to our recently created `readAll` implementation.

First up we need to import our `readAll` function. Open up the `handler.js` file and add the following code at the top of the file:

```javascript
const todosReadAll = require('./todos-read-all.js');
```

Next up add the following code at the bottom of the file which will call the imported `readAll` function with the parameters the Lambda function receives:

```javascript
module.exports.readAll = (event, context, callback) => {
  todosReadAll(event, (error, response) => {
    context.done(error, response);
  });
};
```

That's everything we need to do to get our todos out of the database!

### Deploying and retrieving all todos

Let's test this functionality. Run

```bash
serverless deploy
```

to deploy the new code. You should see the new `GET` endpoint on your terminal once the service is successfully re-deployed.

Copy the url and run the following command in your terminal:

```bash
curl <your-endpoint-url>
```

Now you should see all the todos you've already created! :tada:

## Retrieving a single todo

We've just added a way to retrieve all our todos. But what if we want to retrieve a single todo item?

We could implement a way where we'll retrieve all todo items at first and then filter out the item we'd like to get. But that's a very inefficient practice. It's even more inefficient when the amount of todo items increases.

Let's add a new logic so that we can retrieve a single todo item with the help of the `id` attribute we'll always add when creating the todo beforehand.

### Updating the `serverless.yml` file

At first we should add a new function definition to our `serverless.yml` file. We already have a `readAll` function so we add a new function definition with the name `readOne`. This definition should be nested inside of the `functions` section:

```yml
readOne:
  handler: handler.readOne
  events:
    - http: GET todos/{id}
```

This code is quite similar to the other code we've already added previously. However the `http` event introduces a new feature which is slightly different. Let's take a look at the different parts in detail.

We create a new function which goes by the name `readOne`. Next up we tell Serverless that the logic can be found in the `handler.js` file where we export the `readOne` function. At the end we tell Serverless that we want to access our Lambda function through an HTTP API. A `GET` request against the `todos/{id}` path should return the corresponding todo item.

The path definition here might look a little bit odd. But it's quite easy to understand what's going on here. We simply say that our path contains a variable with the name `id`. So `todos/1` for example would mean that we want to access the todo item with the `id` 1. This `id` variable is accessible in the `event` property we'll soon use when we implement our `readOne` logic.

### Implementing the `readOne` logic

Let's implement the logic which will read the todo item out of the database with the help of the `id` attribute.

Create a new file called `todos-read-one.js` in the root of the service and add the following code:

```javascript
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName: 'todos',
    Key: {
      id: event.path.id
    }
  };

  return dynamoDb.get(params, (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(error, data.Item);
    }
  });
};
```

This code is quite similar to the code of the `readAll` function logic. We import the `aws-sdk` and create a new DynamoDB instance. Next up we export a function which will perform a `get` operation. This get operation will search in our `todos` table for specific todo we want to retrieve based in the `id` attribute.

We can access the `id` attribute form the URL because it lives in the `event` property Lambda automatically gives us access to.

After that we return the todo item. An error is returned if something went wrong.

### 3. Updating the `handler.js` file

The last step is to update the `handler.js` file so that Lambda knows where it can access the `readOne` function.

At first import the `readOne` function at the top of the `handler.js` file:

```javascript
const todosReadOne = require('./todos-read-one.js');
```

Next up add the export statement for the `readOne` function at the bottom of the file:

```javascript
module.exports.readOne = (event, context, callback) => {
  todosReadOne(event, (error, response) => {
    context.done(error, response);
  });
};
```

### Deploying and retrieving a todo

Run

```bash
serverless deploy
```

in the root of the service to deploy the recently added functionality.

You should see the new `GET` endpoint in the terminal after the deployment succeeds.

Copy this URL and replace `{id}` with a corresponding value of a todo you've created recently (you might use copy over an `id` from the output of the `readAll` `curl` call).

Run

```bash
curl <your-endpoint-url>
```

and you should see the single todo item printed out on the screen! :dancers:

## Updating todos

Creating and retrieving todos is great but what if we introduce a typo or want to change our todo a little bit? It's time to add an update functionality!

### 1. Updating the `serverless.yml` file

At first we need to tell Serverless that we want to add a new Lambda function which will handle the update process for us. We do this by adding the following code which should be nested inside of the `functions` definition in the `serverless.yml` file:

```yml
update:
  handler: handler.update
  events:
    - http: PUT todos/{id}
```

Here we say that an `update` function should be added. The corresponding code is accessible in the `handler.js` file and is exported with the name `update`.

The `http` event definition makes it possible to update the todo item with the `PUT` method at the `todos/{id}` path.

### 2. Implementing the `update` logic

Let's implement the actual logic which will update the todo item in our database.

Create a file called `todos-create.js` in the root of the directory and add the following code:

```javascript
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const data = event.body;

  data.id = event.path.id;
  data.updatedAt = new Date().getTime();

  const params = {
    TableName : 'todos',
    Item: data
  };

  return dynamoDb.put(params, (error, data) => {
    if (error) {
      callback(error);
    } else {
      callback(error, params.Item);
    }
  });
};
```

As usual we import the `aws-sdk` and create a new DynamoDB instance. After that we export a function which receives the `event` and `callback` arguments from the Lambda function. We extract the new `body` and the `id` of the todo item with the help of the `event` property (the `id` is the `id` we'll embde inside of the URL like we've already done when implementing the `readOne` functionality). We also update the timestamp of the `updatedAt` attribute with the current time.

A `put` request is issued against our DynamoDB which will overwrite the existing todo entry in our database.

We'll return the new todo item or return an error if something unexpected happend.

### 3. Updating the `handler.js` file

The last thing we need to do is to update the `handler.js` file so that it points to our `update` logic.

At first we need to import the `update` functionality by adding the following code to the top of the `handler.js` file:

```javascript
const todosUpdate = require('./todos-update.js');
```

Next up we add the `export` definition at the bottom of the file which will use the `update` logic and makes it accessible in our Lambda function:

```javascript
module.exports.update = (event, context, callback) => {
  todosUpdate(event, (error, response) => {
    context.done(error, response);
  });
};
```

### Deploying and updating a todo

Let's test our update function!

At first run

```
serverless deploy
```

to re-deploy the service. You should see a new `PUT` endpoint in the terminal once the deployment finishes.

Copy this URL, replace the `{id}` with a valid todo `id` and run he following command in your terminal:

```bash
curl -H "Content-Type: application/json" -X PUT -d '{ "body" : "Updated todo" }' <your-endpoint-url>
```

Awesome! You've successfully updated a todo item! :tada:

## Deleting todos

The final functionality we would like to add is the possibility to delete todo items. Let's implement this to finish our first Serverless service!

### 1. Updating the `servereless.yml` file

Let's add the `delete` function definition to the `serverless.yml` file by nesting it inside of the `functions` definition:

```yml
delete:
  handler: handlers.delete
  events:
    - http: DELETE todos/{id}
```

Here we define that Serverless should create a new Lambda function with the name `delete`. The `delete` function logic is exported in the `handler.js` file. Furthermore the `http` event adds an endpoint. The delete Lambda function is triggered when we access the `todos/{id}` path with the `DELETE` method.

### 2. Implementing the `delete` logic

Next up we create a `todos-delete.js` file in the root of the service directory and add the following code:

```javascript
'use strict';

const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = (event, callback) => {
  const params = {
    TableName : 'todos',
    Key: {
      id: event.path.id
    }
  };

  return dynamoDb.delete(params, function (error, data) {
    if (error) {
      callback(error);
    } else {
      callback(error, params.Key);
    }
  });
};
```

We import the `aws-sdk` at the top and create a new DynamoDB instance. After that we export a function which will receive the `event` and the `callback` argument from the Lambda function. Next up we extract the todo `id` from the `event` (which will take the `id` from the URL) and perform a `delete` operation on the DynamoDB database which will delete the corresponding todo item based on the todos `id` attribute.

The `id` of the removed todo or an error is returned (if something goes wrong) with the help of the callback function.

### 3. Updating the `handler.js` file

The last step is to import the function logic at the top of the `handler.js` file:

```javascript
const todosDelete = require('./todos-delete.js');
```

and then add a new function export at the bottom of the `handler.js` file so that Lambda knows how to use the recently added `delete` functionality:

```javascript
module.exports.delete = (event, context, callback) => {
  todosDelete(event, (error, response) => {
    context.done(error, response);
  });
};
```

That's it. Now we should be able to delete todo items!

### Deploying and deleting a todo

Let's deploy and test our new functionality!

Run

```bash
serverless deploy
```

to re-deploy the service. You should see a new `DELETE` endpoint once the deployment is done.

Copy this url and replace `{id}` with a valid todo `id`.

Next up run

```bash
curl -X DELETE <your-endpoint-url>
```

to delete a todo. The `id` of the deleted todo item will de returned and displayed on the terminal.
