# The serverless architecture

A traditional web application consists of at least two different parts. There is the client (usually a web browser or an app) which connects to a server and sends requests. The server then gathers the requested data and generates a response which is then send back to the client. This model is called the "client-server" model.

Although new web frameworks come and go the bare bones of a web application is (nearly) always the same. We have some kind of server which sends a responses to a clients requests.

You need to know different stuff if you are a web developer and want to get your next great application out of the door ASAP. There are all the new web development frameworks, there's frontend code, backend code you need to glue and there are of course servers you need to administrate and manage in order to run your product.

But as a web developer with not that much experience in server management and administration you want to focus on your code and don't care about servers, security patches, downtime, load balancing and scaling issues. You just want to focus on your code.

That's where the serverless architecture comes into play. Serverless does not mean "no servers“. It means that you as a developer don't need to think about servers at all. You just upload your code and that's it. Everything else is managed automatically.

No server setup, update or failover management, no scaling issues, no nothing. Just you and your code.

The introduction of AWS Lambda in 2014 made this dream come true.

AWS takes care of everything that needs to be managed in order to run your Lambda code smoothly. Updates, security patches, scalability. Everything is done by [AWS](xx-terminologies/01-terminologies.md#aws) for you.

You just have to care about your code.

This coins the idea of a serverless environment: "You don't have to think about servers“. Best of all. Your code will smoothly when you have 2 users and will also do if you have 2 million users. Additionally you only pay for the time your code runs. This will cut down costs dramatically.

However AWS is not the only cloud provider which offers this "Function as a Service" ([FaaS](xx-terminologies/01-terminologies.md#faas)) service.

Microsoft has introduced ["Azure functions"](https://azure.microsoft.com/services/functions/), Google is working on ["Google Cloud functions"](https://cloud.google.com/functions/) and IBM has just introduced ["OpenWhisk"](https://developer.ibm.com/openwhisk/).

The [Serverless framework](http://serverless.com) gives you the choice which of those cloud providers you want to use.

If you're familiar with it you can even integrate the provider of your choice into the framework. We'll see later on how this will work.

Excited about the Serverless architecture?

Let's what the [Serverless framework](http://serverless.com) is and how it can help us to deploy our code into the cloud providers infrastructure of our choice.
