# What is API Gateway?

[API Gateway](https://aws.amazon.com/api-gateway/) is another great service available through AWS. Nearly everyone who has developed an application before was confronted with the task to define an API.

## Aside: What is an API?

An [API](https://en.wikipedia.org/wiki/Application_programming_interface) (application programming interface) is a service you'll develop so that other users /applications can access certain data of your application. Imagine that you've developed the next social network and you want to enable other developers to use the data of your network to build cool new applications around them.

You can expose the content with different markup languages (the most famous ones are [XML](https://en.wikipedia.org/wiki/XML) or [JSON](https://en.wikipedia.org/wiki/JSON)).

## How API Gateway helps you

But as soon as you've started to develop your API you'll maybe encountered hurdles. What about versioning? Should it be RESTful? How do I implement a RESTful API? How do I handle different stages (development, testing, production)?

API Gateway is Amazons answer to target those pain points. It makes it easy to version APIs, monitor events (like usage of a certain API method), scale the API independently, roll out APIs for different stages and create RESTful services.

## How Serverless uses API Gateway

In Serverless you can use API Gateway to expose your lambda functions to the outside through an accessible HTTP endpoint. API Gateway is an event you can define and use in Serverless but not a core technology which is necessary so that Serverless can work. However we'll use API Gateway and the corresponding `http` event heavily throughot this book so it's good to have a solid understanding of the nuts and bolts of API Gateway.
