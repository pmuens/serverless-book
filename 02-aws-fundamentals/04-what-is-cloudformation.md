# What is CloudFormation?

Back in the starting days of AWS you would login to your AWS account and configure everything by hand. You'll create the necessary resources like S3 buckets, policies and users / roles and orchestrate them.

The problem with this approach is that nothing is (obviously) automated. You are not able to share and recreate an infrastructure from scratch without spending a huge amount of time configuring everything.

[CloudFormation](https://aws.amazon.com/cloudformation/) was invented by Amazon to circumvent this limitations.

## How does it look like?

You've already seen a simple example in the S3 section above. Here's the example again in case you can't remember:

```json
{
  "Version": "2012-10-17",
   "Statement": {
    "Effect": "Allow",
    "Action": "s3:ListBucket",
    "Resource": "arn:aws:s3:::example_bucket"
  }
}
```

The CloudFormation templates are defined with the help of JSON. This makes it easy, accessible and understandable if you have experiences with JSON in general. It also makes it very easy to interact with the templates in your favorite programming language.

If you have no experience with JSON you could use the [AWS CloudFormation designer](https://console.aws.amazon.com/cloudformation/designer/home) to design your templates in your browser. The designer generates the JSON which you can then use for further processing.

**Note:** The usage of CloudFormation is free, but you'll have to pay for the resources you'll define in your template.

## How Serverless uses CloudFormation

Serverless is a heavy user of CloudFormation templates. Nearly everything AWS related is defined with the help of CloudFormation. Some of those templates a generated automatically. You can always define new ones on your own. Those are then recognized and execute by Serverless.
