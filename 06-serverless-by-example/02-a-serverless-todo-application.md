# A Serverless Todo application

Now that we've seen how easy it is to create, deploy and manage our own Serverless service we'd like to dig deeper into the world of the Serverless framework and build real world, event driven applications.

These chapters are meant to show you the full power of Serverless. We'll build example applications for different  use cases. This way you'll see that the Serverless framework is a great tool to achieve different goals / work in different environments. The number of different things you can build with Serverless is endless.

Serverless is not only restricted to build web applications or data processing pipelines. Basically everything which can fire an event can trigger your function to execute code you wrote which means that the stuff you can build is only restricted by your imagination!

Let's start with our very first application!

Our first application is a web application. We'll create a simple todo application in JavaScript / Node.js and deploy it to AWS. Excited and ready? Let's go!

## Aside: Data storage and DynamoDB

Before we get right into coding I'd like to talk about data persistence. One recommendation we have for our todo application is that the data we enter there is stored in a database. You might have heard about databases such as [MySQL](https://www.mysql.com/) or [PostgreSQL](https://www.postgresql.org/) which are so called [RDBMS](xx-terminologies/01-terminologies.md#rdbms) or "relational databases". AWS, our cloud provider of choice offers hosted versions of those databases.

However AWS also runs their own database system called [DynamoDB](https://aws.amazon.com/dynamodb/) which is a so called schemaless / [NoSQL](xx-terminologies/01-terminologies.md#nosql) database. We'll use [DynamoDB](https://aws.amazon.com/dynamodb/) in our application as it scales pretty easy, is rock solid (Amazon runs their own marketplace atop of it) and fits well into the Serverless world.

Don't be intimidated if you've not worked with DynamoDB or other database systems in the past. It's pretty simple and easy to use. I'll promise! :smiley:

## What we'll build

Before we dive right into code we shoud sketch out briefly what we're about to build here and what the final application will look like.

First of all we need to distinguish between the frontend (the stuff the user will see) and the backend (the business logic which is hidden from the user). We'll create both, but will focus on the backend part here as its the one which is powered by Serverless at the end of the day. Our Serverless backend application will act as an [API](xx-terminologies/01-terminologies.md#api) you can talk to via [http](xx-terminologies/01-terminologies.md#http). This makes it possible that you can switch out the frontend later on or develop an additional iOS or Android application which will interact through the HTTP interface.

Don't worry if it sounds abstract right now. We'll see the benefits later on when we're done.

What kind of functionality should our application offer?
We should be able to:

- View all our todos in a list
- Create todos
- Read todo
- Update previously created todos
- Delete todos

That's basically it. The functionality which is describes here is often refered to as a [CRUD](xx-terminologies/01-terminologies.md#crud) implementation which means "Create", "Read", "Update", "Delete".

Ok. Now that we've defined how our application will look like we want to start with our first part: The backend.

## Creating a Serverless `todos` service

Our backend is (obviously) powered by Serverless. Let's create a todo service by running

```bash
serverless create --template aws-nodejs --path todos
```

We've chosen the `aws-nodejs` template as we're about to develop our backend in Node.js / JavaScript. Furthermore we've provided the `--path` option which will create a `todos` directory for us and name the service `todos` for us.

Next up we need to open the `todos` directory with the editor of our choice.

## Creating todos

The first thing we want to build is a way to add new todos to our application so that we can show, edit and remove them later on.
