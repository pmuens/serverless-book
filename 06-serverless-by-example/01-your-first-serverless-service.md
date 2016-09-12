# Your first Serverless service

Now that we have setup everything we can start with our first Serverless service!
A service is a unit which encapsulates one specific area / resource of your overall project / application.

A service can e.g. be an "authentication" service which manages user identities (sign up, sign in, forgot password) or a "comments" service which is responsible to manage comments (create a comment, read comments, update a comment, delete a comment).

You may have heard about the term ["Microservice"](https://en.wikipedia.org/wiki/Microservices) before. That's exactly what Serverless implements.

**Note:** We'll use Amazon Web Services (AWS) as the provider and Node.js / JavaScript as our language of choice. You can use whatever provider / language you want. Just make sure that you pick the correct template which reflects your provider / language choice.

## Table of contents

- [The code](#the-code)
- [Creating a service](#creating-a-service)
- [What is serverless.yml?](#what-is-serverlessyml)
- [Deploying a service](#deploying-a-service)
- [Invoking a function](#invoking-a-function)
- [Updating the function code](#updating-the-function-code)
- [Redeploying the service](#redeploying-the-service)
- [Removing the service](#removing-the-service)

---

## The code

The whole code we'll write is available in the ["first-service" code directory](/xx-code/first-service). Just open up this directory to follow along or read through it if you face any problems.

## Creating a service

Let's create our first service which should run on [AWS](/xx-glossary/01-glossary.md#aws) and uses Node.js / JavaScript as the runtime.

Serverless creates service scaffolds for us based on templates. You can see all the available templates [here](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates).

Behind the scenes it simply copies over the files from the corresponding template directory on our hard drive. That's it.

We'll pick the `aws-nodejs` template and enter:

```bash
serverless create --template aws-nodejs --path my-first-service
```

That's it. We should see a success message that Serverless has successfully created our service scaffold in the `my-first-service` directory.

## What is `serverless.yml`?

Let's look into the files Serverless has created for us.

Next to some other files you see the `serverless.yml` file. This file is a description of your service. Serverless uses this file to understand what your service resources are and how to set them up for you.

When you e.g. want to add a new event (such as an HTTP endpoint) you'll edit this file and re-deploy your service.

Serverless will then parse this file behind the scenes and translates the event syntax into provider specific language so that everything is setup in your cloud provider account without you evenen signing into the web console.

Awesome, isn't it :tada:

If you want to get a deeper knowledge what else you can do with this file you should visit the official documentation about the [`serverless.yml` file](https://github.com/serverless/serverless/blob/master/docs/01-guide/02-creating-services.md#serverlessyml).

But don't feel intimidated for now. We'll take a deep dive into it later on!

## Deploying a service

Now that we've created our service we want to deploy it to our cloud provider.

It's as simple as running:

```bash
serverless deploy
```

You should see prompts on your terminal which will inform you about the deployment process. This might take a few seconds.

## Invoking a function

Let's invoke our function we've just deployed.

The function we want to invoke is called `hello` and was automatically created as a part of the scaffold when we ran the `serverless create` command.

All we need to do is to run the following command to invoke our `hello` function:

```bash
serverless invoke --function hello
```

We should now see a greeting from Serverless on our terminal.

## Updating the function code

Curious how this function looks like?

The functions code lives in the `handler.js` file. Open up this file and you should see a message property with the greeting we saw when we invoked your function.

Modify this greeting and save the file.

## Redeploying the service

Now we want to our new greeting to be deployed. How do we do that?

Just run:

```bash
serverless deploy
```

Now Serverless will re-deploy our function. A few seconds later we should see a message that our deployment was successfull.

Let's verify that everything ran smoothly.

Run:

```bash
serverless invoke --function hello
```

You should now see the message you have just updated recently.

## Removing a service

Awesome! We've just created and deployed our service and invoked, updated re-deployed and re-invoked our function.

Let's clean up everything and remove the whole service.

Just run:

```bash
serverless remove
```

to remove the whole service from the cloud providers infrastructure. :dancers:
