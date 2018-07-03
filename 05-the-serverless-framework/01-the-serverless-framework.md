# The Serverless framework

With this knowledge in mind we can talk about the Serverless framework.

The [Serverless framework](https://github.com/serverless/serverless) (previously known as JAWS) is a Node.js based [CLI](/xx-glossary/01-glossary.md#cli) which makes it easy for you to manage and deploy your Serverless applications regardless of the cloud provider you have chosen.

It's not rare that you have dozens of functions that access other (provider specific) services such as storage buckets, database tables or even external [APIs](/xx-glossary/01-glossary.md#api). You can of course deploy each and every function by hand. But as your application evolves and you code get's more complicated it's a pain to orchestrate everything.

Serverless makes it easy to organize all the relevant resources your application needs in order to run. Functions are automatically deployed and events are compiled into the syntax the cloud provider understands. You can e.g. add a `http` event to your function and Serverless will create a corresponding API Gateway endpoint when you use [AWS](/xx-glossary/01-glossary.md#aws) or a [HTTP](/xx-glossary/01-glossary.md#http) trigger if you've decided to upload your code to the Amazon Cloud.

Additionally you can still setup your own, custom provider specific resources with the help of the `resources` section in the `serverless.yml` file (but we'll come to that later, so no worry if you don't understand it yet).

This makes it very easy and fast to build modern, serverless web applications. You don't need to think about servers. Just write your function code, add event definitions (and optional custom provider resources) deploy it with the help of Serverless to the cloud provider of your choice.

*Note:* You need to keep in mind that Serverless is a CLI tool which helps you with everything in a way that it automates the compilation steps and the setup of your cloud infrastructure.

Everything the Serverless framework does can be done manually. But this would would make application development way more painful and is "impossible" once your project grows from a "hobby" app to a modern, feature rich application.
