# What is CloudFormation?

Back in the starting days of AWS you would login to the web console of your AWS account and configure everything by hand. You'll create the necessary resources your application would use (like e.g. Lambda functions, S3 buckets, DynamoDB tables, policies, roles, etc.) and orchestrate them.

The problem with this approach is that nothing is (obviously) automated and reproducable. You are not able to share and recreate an infrastructure from scratch without spending a huge amount of time configuring everything manually.

[CloudFormation](https://aws.amazon.com/cloudformation/) was invented by Amazon to circumvent this limitations.

## How does it look like?

You've already seen a simple example before! Here's the example again in case you can't remember:

```json
{
  "Version": "2012-10-17",
   "Statement": {
    "Effect": "Allow",
    "Action": "s3:ListBucket",
    "Resource": "arn:aws:s3:::example"
  }
}
```

The CloudFormation templates are defined with the help of JSON. This makes it easy, accessible and understandable if you have experiences with JSON in general.

If you have no experience with JSON you could use the [AWS CloudFormation designer](https://console.aws.amazon.com/cloudformation/designer/home) to design your templates in your browser. The designer generates the JSON which you can then use for further processing.

**Note:** The usage of CloudFormation is free, but you'll have to pay for the resources you'll define in your template.

## How Serverless uses CloudFormation

Serverless is a heavy user of CloudFormation. Nearly every resource Serverless uses is defined and deployed with the help of CloudFormation.

Even your event definitions in your `serverless.yml` (which we'll see later on) file are compiled to valid CloudFormation syntax which is merged into the main "Serverless CloudFormation" template and then deployed.
