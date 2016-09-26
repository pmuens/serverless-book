# What is API Gateway?

[API Gateway](https://aws.amazon.com/api-gateway/) is another great service available through AWS.

Nearly every web developer might have already encountered the following task:

> "Could you define a reliable API for our web application so we can interact with it through HTTP?"

## Aside: What is an API?

An [API](https://en.wikipedia.org/wiki/Application_programming_interface) (application programming interface) is a service you'll develop so that other users or external apps can access certain data of your application. Imagine that you've developed the next unicorn ride sharing app and you want to enable other developers to use parts of your data (e.g. the ratings of your drivers) so that they can built other great services around your app.

You can expose the content with different markup languages (the most famous ones are [XML](https://en.wikipedia.org/wiki/XML) or [JSON](https://en.wikipedia.org/wiki/JSON)).

## How API Gateway helps you

But as soon as you've started to develop your API you'll maybe encountered hurdles:

- What about versioning?
- Should it be RESTful?
- How do I manage access?
- How do I rate limit the API?
- Is it scalable?
- How do I implement a RESTful API?
- How do I handle different stages (development, testing, production)?
- ...

API Gateway is Amazons answer to target those pain points. It makes it easy to version APIs, monitor events (like usage of a certain API methods), scale the API independently, roll out APIs for different stages and create RESTful services.

## How Serverless uses API Gateway

In Serverless you can use API Gateway to expose your Lambda functions to the outside through an accessible HTTP endpoint.

However it's important to know that API Gateway and the corresponding `http` event are a served as a plugin you can use to extend your Serverless service and make it more feature rich. They are not a core technology you'll always use. Serverless can work without API Gateway or the `http` event at all.

We'll use API Gateway and the corresponding `http` event heavily throughout this book so it's good to have a basic understanding of the nuts and bolts of API Gateway.
