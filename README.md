# Serverless Book

Book about the serverless.com framework

## Table of contents

- [Introduction](#introduction)
- [The serverless architecture](#the-serverless-architecture)
- [The Serverless framework](#the-serverless-framework)
- [Your first Serverless service](#your-first-serverless-service)
  - [Creatig a service](#creating-a-service)
  - [What is serverless.yml](#what-is-serverless-yml)
  - [What is serverless.env.yml](#what-is-serverless-env-yml)
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

Let's what the [Serverless framework](http://serverless.com) is and how it can help us to deploy our code onto the cloud providers infrastructure of our choice.

## The Serverless framework

## Your first Serverless service

### Creating a service

### What is serverless.yml

### What is serverless.env.yml

### Deplyoing a service

### Invoking a function

### Updating the function code

### Redeploying the service

### Removing a service

## Terminologies

### AWS

Amazon Web Services. Amazons business which offers different cloud services (see [Amazon AWS homepage](http://aws.amazon.com) for more details.

### FaaS

Function as a service. Functions are independently deployed and run on a fully managed cloud system. The developer simply uploads the code of the function and the cloud provider takes care of the rest.

### Resource

Way of grouping logic (e.g. users, posts, ...).

### Service

A collection of functions which belong to the same [resource](#resource).
