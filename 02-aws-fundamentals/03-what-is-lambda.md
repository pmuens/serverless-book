# What is Lambda?

AWS describes [Lambda](https://aws.amazon.com/lambda/details/) as a "data processing service which runs code when it's externally invoked (e.g. through events or other triggers)".

This sounds abstract and hard to understand but believe me. It's not that hard. It simply means that you can zip and upload your code to AWS and Amazon sets up everything for you so that the code can be run.

Lambda was celebrated as a game changer in cloud computing [when it was introduced at re:invent in 2014](https://www.youtube.com/watch?v=9eHoyUVo-yg). And soon you'll see why.

## Advantages

The beauty of Lambda is that you don't have to manage any servers or infrastructure to ensure your code runs smoothly. Amazon takes care of everything. This also means that you don't have to think about security updates for your OS, scalability, availability or everything else.

It doesn't matter if you have 2 users or 1 million who hit your function. No slow responses or downtime due to overwhelming customer engagement.

Another bonus is that you only pay for the time your function runs. This reduces the costs of your application to a fraction of what you've paid before.

The Serverless Team gave [a great example](https://twitter.com/arethoseclams/status/651841396970754048) while presenting JAWS (Serverless was previously named JAWS) [at re:Invent 2015](https://www.youtube.com/watch?v=D_U6luQ6I90).

They analyzed one production ready app (16000 requests / day @ 200ms avg. response time) and calculated how much it would cost when hosting it with EC2 in contrast to Lambda.

The results are astonishing:

| Service | Costs / day |
| --- | --- |
| Two EC2 instances | **$2.97** |
| Lambda | **$0.05** |

This is huge! Imagine how much money big companies can save when switching to a serverless implementation.

## Different runtimes

Lambda supports different runtimes as well. As of the writing of this book Node.js, Python and Java are supported.

This means that you can develop different parts of your application with different programming languages. Maybe your user management is better implemented with the help of Python while another team works on a Node.js / JavaScript implementation of your users status updates. No problem!

## How Serverless uses Lambda

Lambda is a core functionality you'll use (nearly every time) when developing applications. You'll write the core components of your application in a runtime language of your choice and Serverless takes care to minimize, optimize, zip and upload your code to AWS so you don't have to take care of the manual process you have to run through when doing this through the AWS web console.
