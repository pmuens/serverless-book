# Serverless by example

Now that we've seen how easy it is to create, deploy and manage our own Serverless service we'd like to dig deeper into the world of the Serverless framework and build real world, event driven applications.

These chapters are meant to show you the full power of Serverless. We'll build example applications for different  use cases. This way you'll see that the Serverless framework is a great tool to achieve different goals / work in different environments. The number of different things you can build with Serverless is endless.

Serverless is not only restricted to build web applications or data processing pipelines. Basically everything which can fire an event can trigger your function to execute code you wrote which means that the stuff you can build is only restricted by your imagination!

Let's start with our very first application!

## Building a web app

Our first application is a web application. We'll create a simple todo application in JavaScript / Node.js and deploy it to AWS. Excited and ready? Let's go!

### What we'll build

Before we dive right into code we shoud sketch out briefly what we're about to build here and what the final application will look like.

First of all we need to distinguish between the frontend (the stuff the user will see) and the backend (the business logic which is hidden from the user). We'll create both, but will focus on the backend part here as its the one which is powered by Serverless at the end of the day. Our Serverless backend application will act as an [API](xx-terminologies.md#api) you can talk to via [http](xx-terminologies.md#http). This makes it possible that you can switch out the frontend later on or develop an additional iOS or Android application which will interact through the HTTP interface.

Don't worry if it sounds abstract right now. We'll see the benefits later on when we're done.

What kind of functionality should our application offer?
We should be able to:

- View all our todos in a list
- Create todos
- Read todo
- Update previously created todos
- Delete todos

That's basically it. The functionality which is describes here is often refered to as a [CRUD](xx-terminologies.md#crud) implementation which means "Create", "Read", "Update", "Delete".

Ok. Now that we've defined how our application will look like we want to start with our first part: The backend.

### Creating a Serverless `todos` service

Our backend is (obviously) powered by Serverless. Let's create a todo service by running

```serverless create --template aws-nodejs --path todos```

We've chosen the `aws-nodejs` template as we're about to develop our backend in Node.js / JavaScript. Furthermore we've provided the `--path` option which will create a `todos` directory for us and name the service `todos` for us.

Next up we need to open the `todos` directory with the editor of our choice.

## Building a data processing pipeline
