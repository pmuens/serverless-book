# What is Lambda?

AWS describes [Lambda](https://aws.amazon.com/lambda/details/) as follows

> "AWS Lambda is a data processing service which runs code when it's externally invoked (e.g. through events or other triggers)".

This sounds abstract and hard to understand but believe me, it's not that hard. It simply means that you can zip and upload your function code to AWS and Amazon sets up everything for you so that the code can be run.

Lambda was celebrated as a game changer in cloud computing when it was [introduced at re:invent in 2014](https://www.youtube.com/watch?v=9eHoyUVo-yg).

## Advantages

The beauty of Lambda is that you don't have to manage any servers, infrastructure or whatsoever to ensure your code runs smoothly. Amazon takes care of everything. This also means that you don't have to think about security updates for your servers OS, scalability, load balancing, availability, monitoring, you name it.

It doesn't matter if you have 2 users or 1 billion who use your application (and therefore use your Lambda functions). Lambda means no more slow responses or downtime due to overwhelming customer engagement.

Another bonus is that you only pay for the time your function runs. This reduces the costs of your application to a fraction of what you've paid before when serving your app with the help of servers.

The Serverless framework team gave [a great example](https://twitter.com/arethoseclams/status/651841396970754048) while presenting JAWS (Serverless was previously named JAWS) [at re:Invent 2015](https://www.youtube.com/watch?v=D_U6luQ6I90).

They analyzed one production ready app and calculated how much it would cost when hosting it with EC2 in contrast to Lambda.

The results are astonishing:

**Stats:**

- 16000 requests / day
- 200ms avg. response time

**Costs:**

| Service | Costs / day |
| --- | --- |
| Two EC2 instances | **$2.97** |
| Lambda | **$0.05** |

This is huge! Imagine how much money big companies can save when switching to a serverless architecture (and many have already done so).

## Different runtimes

AWS Lambda supports different runtimes as well such as Node.js, Python or Java (more will follow soon).

This means that you can develop different parts of your application with different programming languages. Maybe your user management is better implemented with Python while another team works on a Node.js / JavaScript implementation billing system.

This is no problem and already a best practice!

## How Serverless uses Lambda

Lambda is the core functionality you'll use (nearly every time) when developing serverless applications. You'll write function code of your application in the runtime of your choice and Serverless takes care to zip and upload your code to AWS. 
Everything is setup and configured so you don't have to take care of the manual, time consuming process you have to run through when doing this through the AWS web console.
