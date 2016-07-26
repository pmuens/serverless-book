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

### FaaS

Function as a service. Functions are independently deployed and run on a fully managed cloud system. The developer simply uploads the code of the function and the cloud provider takes care of the rest.

### Resource

Way of grouping logic (e.g. users, posts, ...).

### Service

A collection of functions which belong to the same [resource](#resource).
