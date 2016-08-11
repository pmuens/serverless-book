# :zap: The Serverless Book

A Book about the [serverless.com](http://serverless.com) framework.

## Table of contents

- [Introduction](#introduction)
- [The serverless architecture](#the-serverless-architecture)
- [The Serverless framework](#the-serverless-framework)
- [Installing Serverless](#installing-serverless)
  - [Installing Node.js](#installing-nodejs)
  - [Installing the Serverless CLI](#installing-the-serverless-cli)
- [Cloud provider setup](#cloud-provider-setup)
  - [Amazon Web Services (AWS)](#amazon-web-services-aws)
    - [Creating an AWS account](#creating-an-aws-account)
    - [Configuring AWS](#configuring-aws)
    - [Setting the AWS API Key & Secret](#setting-the-aws-api-key--secret)
- [Your first Serverless service](#your-first-serverless-service)
  - [Creatig a service](#creating-a-service)
  - [What is serverless.yml](#what-is-serverless-yml)
  - [Deploying a service](#deploying-a-service)
  - [Invoking a function](#invoking-a-function)
  - [Updating function code](#updating-function-code)
  - [Redeploying the service](#redeploying-the-service)
  - [Removing a service](#removing-a-service)
- [Terminologies](#terminologies)
  - [FaaS](#faas)
  - [Resource](#resource)
  - [Service](#service)

---  

## Introduction
Hello and welcome to the Serverless book!

My name is [Philipp](http://github.com/pmuens). I work at [Serverless](http://serverless.com) as one of the core developers and have been involved into the Serverless movement early on. This book is a complete overhaul / rewrite of the ["Learn Serverless"](https://justserverless.github.io/learnserverless-book) book which coveres v0.5.

Feel free to write me an E-Mail or hit me on Twitter if you have any questions!

In this book we'll discover the Serverless framework. It's a very powerful, yet easy to use developer tool to build modern, monstrously scalable web applications with the help of [FaaS](#faas) (function as a service) offerings from the cloud provider of your choice.

We'll start this book by looking into the serverless architecture in general. Questions like "What is the serverless architecture?", "Why does it make software development easier?" or "Why should I care and jump on the Serverless train?" will be answered in this chapter.

After that we talk about the Serverless framework. What is the motivation of the Serverless framework, why was it developed and how does it work?

With this foundation we'll create a first Serverless [service](#service). This service will live through the whole, usual service lifecycle. We'll create it, deploy it, invoke a function from it, update the functions code, redeploy it and remove it. Furthermore we'll look into the configuration files of the Serverless framework to see how we can simply extend our service with e.g. other event sources (such as HTTP).

**UPDATE CONTENT HERE**

**Note:** Do you have any questions? Want to improve this book? Don't hesitate to open up an issue or create a corresponding pull request!

Great to have you aboard! Let's take a deep dive into Serverless!

## The serverless architecture

A traditional web application consists of at least two different parts. There is the client (usually a web browser or an app) which connects to a server and sends requests. The server then gathers the requested data and generates a response which is then send back to the client. This model is called the "client-server" model.

Although new web frameworks come and go the bare bones of a web application is (nearly) always the same. We have some kind of server which sends a responses to a clients requests.

You need to know different stuff if you are a web developer and want to get your next great application out of the door ASAP. There are all the new web development frameworks, there's frontend code, backend code you need to glue and there are of course servers you need to administrate and manage in order to run your product.

But as a web developer with not that much experience in server management and administration you want to focus on your code and don't care about servers, security patches, downtime, load balancing and scaling issues. You just want to focus on your code.

That's where the serverless architecture comes into play. Serverless does not mean "no servers“. It means that you as a developer don't need to think about servers at all. You just upload your code and that's it. Everything else is managed automatically.

No server setup, update or failover management, no scaling issues, no nothing. Just you and your code.

The introduction of AWS Lambda in 2014 made this dream come true.

AWS takes care of everything that needs to be managed in order to run your Lambda code smoothly. Updates, security patches, scalability. Everything is done by [AWS](#aws) for you.

You just have to care about your code.

This coins the idea of a serverless environment: "You don't have to think about servers“. Best of all. Your code will smoothly when you have 2 users and will also do if you have 2 million users. Additionally you only pay for the time your code runs. This will cut down costs dramatically.

However AWS is not the only cloud provider which offers this "Function as a Service" ([FaaS](#faas)) service.

Microsoft has introduced ["Azure functions"](https://azure.microsoft.com/services/functions/), Google is working on ["Google Cloud functions"](https://cloud.google.com/functions/) and IBM has just introduced ["OpenWhisk"](https://developer.ibm.com/openwhisk/).

The [Serverless framework](http://serverless.com) gives you the choice which of those cloud providers you want to use.

If you're familiar with it you can even integrate the provider of your choice into the framework. We'll see later on how this will work.

Excited about the Serverless architecture?

Let's what the [Serverless framework](http://serverless.com) is and how it can help us to deploy our code into the cloud providers infrastructure of our choice.

## The Serverless framework

With this knowledge in mind we can talk about the Serverless framework.

The [Serverless framework](https://github.com/serverless/serverless) (previously known as JAWS) is a Node.js based [CLI](#cli) which makes it easy for you to manage and deploy your Serverless applications regardless of the cloud provider you have chosen.

It's not rare that you have dozens of functions that access other (provider specific) services such as storage buckets, database tables or even external [APIs](#api). You can of course deploy each and every function by hand. But as your application evolves and you code get's more complicated it's a pain to orchestrate everything.

Serverless makes it easy to organize all the relevant resources your application needs in order to run. Functions are automatically deployed and events are compiled into the syntax the cloud provider understands. You can e.g. add a `http` event to your function and Serverless will create a corresponding API Gateway endpoint when you use [AWS](#aws) or a [HTTP](#http) trigger if you've decided to upload your code to the Google Cloud.

Additionally you can still setup your own, custom provider specific resources with the help of the `resources` section in the `serverless.yml` file (but we'll come to that later, so no worry if you don't understand it yet).

This makes it very easy and fast to build modern, serverless web applications. You don't need to think about servers. Just write your function code, add event definitions (and optional custom provider resources) deploy it with the help of Serverless to the cloud provider of your choice.

*Note:* You need to keep in mind that Serverless is a CLI tool which helps you with everything in a way that it automates the compilation steps and the setup of your cloud infrastructure.

Everything the Serverless framework does can be done manually. But this would would make application development way more painful and is "impossible" once your project grows from a "hobby" app to a modern, feature rich application.

## Installing Serverless

Let's dive directly into serverless and the Serverless framework. In order to do so we need to install [Node.js](http://nodejs.org) (as Serverless is a Node.js [CLI](#cli)) and the after that the Serverless CLI. This chapter will show us how we can accomplish this.

### Installing Node.js

The Serverless framework uses [Node.js](http://nodejs.org) under to hood. Because of this we need to install Node.js before we can use Serverless.

Head over to the [Node.js download page](https://nodejs.org/en/download/) and download the most recent Node.js version for your operating system. Serverless needs at least Node.js version 4. However you can also use a newer version.

If you want to install Node.js with the help of a package manager (which we'd recommend) you can take a look at the [Node.js installation instructions for package managers](https://nodejs.org/en/download/package-manager/).

Make sure that Node.js is installed properly by opening up a new terminal window and enter

```node --version```

This should show you the installed Node.js version which should be greater than 4.0.

### Installing the Serverless CLI

Next up we can use [npm](#npm) (the Node package manager which was installed alongside [Node.js](http://nodejs.org)) to install Serverless.

Open up a terminal and enter

```npm install -g serverless```

This downloads the latest Serverless version from the Node.js package registry and installs it globally on our system (The `-g` option ensures that the package is accessible globally).

Let's check if everything was installed successfully.

Enter

```serverless --version```

You should see a version number printed out on the terminal.

That's it. We can now move forward and setup the cloud provider of our choice to finish the setup steps and get started with our first Serverless service.

## Cloud provider setup

In this chapter we'll setup the cloud provider of our choice so that we can use it for our upcoming, first Serverless service.

### Amazon Web Services (AWS)

#### Creating an AWS account

At first you need to create an AWS account (if you haven't already). You can do this on their [signup page](https://aws.amazon.com/free/).

#### Configuring AWS

The next thing we need to do is to create an AWS user which has **administrative access** to your account:

1. Login to your AWS account
2. Go to the **Identity & Access Management (IAM)** page
3. Click on **Users**
4. Click on **Create New Users**
5. Enter *serverless-admin* and click **Create**
6. Click on **Download Credentials** to download the .csv file with the AWS credentials
7. Click **Users** on the left
8. Click on the *serverless-admin* user
9. Go to the **Permissions** tab
10. Click **Attach Policy** and select the **Administrator Access**
11. Click on **Attach Policy**

Done. We've now created an *serverless-admin* user which can do stuff in our AWS account on our behalf (thanks to the **Administrator Access** policy).

**Note:** This setup is not that safe for production environments as it gives the *serverless-admin* user full access to the AWS account. If you deploy your app in a production environment you should definitely reduce the rights for this user.

#### Setting the AWS API Key & Secret

Serverless needs access to the `AWS Access Key ID` and `AWS Secret Access Key` so that it can work with the previously created AWS user.

At first you should download and isntall the AWS CLI. You can read how to do this [here](http://docs.aws.amazon.com/cli/latest/userguide/installing.html).

After you've done this you need to run

```aws configure```

To start the AWS CLI configuartion wizard. Follow this wizard and enter the corresponding `AWS Access Key ID` and `AWS Secret Access Key`.

Once done Serverless is able to use those keys and work with the help of the *serverless-admin* user.

## Your first Serverless service

Now that we have setup everything we can start with our first Serverless service!
A service is a unit which encapsulates one specific area / resource of your overall project / application.

A service can e.g. be an "authentication" service which manages user identities (sign up, sign in, forgot password) or a "comments" service which is responsible to manage comments (create a comment, read comments, update a comment, delete a comment).

You may have heard about the term ["Microservice"](https://en.wikipedia.org/wiki/Microservices) before. That's exactly what Serverless implements.

**Note:** We'll use Amazon Web Services (AWS) as the provider and Node.js / JavaScript as our language of choice. You can use whatever provider / language you want. Just make sure that you pick the correct template which reflects your provider / language choice.

### Creating a service

Let's create our first service which should run on [AWS](#aws) and uses Node.js / JavaScript as the runtime.

Serverless creates service scaffolds for us based on templates. You can see all the available templates [here](https://github.com/serverless/serverless/tree/master/lib/plugins/create/templates).

Behind the scenes it simply copies over the files from the corresponding template directory on our hard drive. That's it.

At first we should create a new directory for our new service so that Serverless can copy over the files into it:

```mkdir my-new-service && cd my-new-service```

We'll pick the `aws-nodejs` template and enter:

```serverless create --template aws-nodejs```

That's it. We should see a success message that Serverless has successfully created our service scaffold.

### What is serverless.yml

Let's look into the files Serverless has created for us.
Next to some other files you see the `serverless.yml` file. This file is a description of your service. Serverless uses this file to understand what your service resources are and how to set them up for you.

When you e.g. want to add a new event (such as an HTTP endpoint) you'll edit this file and re-deploy your service.

Serverless will then parse this file behind the scenes and translates the event syntax into provider specific language so that everything is setup in your cloud provider account without you evenen signing into the web console.

Awesome, isn't it :tada:

If you want to get a deeper knowledge what else you can do with this file you should visit the official documentation about the [`serverless.yml` file](https://github.com/serverless/serverless/blob/master/docs/understanding-serverless/serverless-yml.md).

But don't feel intimidated for now. We'll take a deep dive into it later on!

### Deplyoing a service

Now that we've created our service we want to deploy it to our cloud provider.

It's as simple as running:

```serverless deploy```

You should see prompts on your terminal which will inform you about the deployment process. This might take a few seconds.

### Invoking a function

Let's invoke our function we've just deployed.

The function we want to invoke is called `hello` and was automatically created as a part of the scaffold when we ran the `serverless create` command.

All we need to do is to run the following command to invoke our `hello` function:

```serverless invoke --function hello```

We should now see a greeting from Serverless on our terminal.

### Updating the function code

Curious how this function looks like?

The functions code lives in the `handler.js` file. Open up this file and you should see a message property with the greeting we saw when we invoked your function.

Modify this greeting and save the file.

### Redeploying the service

Now we want to our new greeting to be deployed. How do we do that?

Just run:

```serverless deploy```

Now Serverless will re-deploy our function. A few seconds later we should see a message that our deployment was successfull.

Let's verify that everything ran smoothly.

Run:

```serverless invoke --function hello```

You should now see the message you have just updated recently.

### Removing a service

Awesome! We've just created and deployed our service and invoked, updated re-deployed and re-invoked our function.

Let's clean up everything and remove the whole service.

Just run:

```serverless remove```

to remove the whole service from the cloud providers infrastructure. :dancers:

## Terminologies

### API

Application programming interface. Set of rules on how to interact with a application.

### AWS

Amazon Web Services. Amazons business which offers different cloud services (see [Amazon AWS homepage](http://aws.amazon.com)) for more details.

### CLI

Command-line interface. A way to interact with the computer through e.g. the console.

### FaaS

Function as a service. Functions are independently deployed and run on a fully managed cloud system. The developer simply uploads the code of the function and the cloud provider takes care of the rest.

### HTTP

Hypertext transfer protocol. Protocol to transfer hypermedia information.

### npm

Node package manager which makes it easier to share encapsulated code between [Node.js](http://nodejs.org) applications.

### Resource

Way of grouping logic (e.g. users, posts, ...).

### Service

A collection of functions which belong to the same [resource](#resource).
