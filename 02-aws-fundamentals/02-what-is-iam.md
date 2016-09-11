# What is IAM?

The first thing we'll look at is [IAM](https://aws.amazon.com/iam/). IAM stands for "Identity and Access Management" and makes it possible to control the access to your AWS services and resources.

Here are the different methods how you can use IAM to control the access:

## Users

Create different users if you want to grant other users access to your AWS account without sharing your login credentials.

## Groups

Groups make it easy to manage access for multiple users. You could e.g. create a "servers" group with permissions to spin up EC2 instances and add multiple users to this group. This way all the users in this group can create EC2 instances. Changes to permissions in this group affects all users who belong to that group.

## Roles

Roles are similar to users as they hold an AWS identity with a set of permissions.

Roles are often used if you e.g. want to grant access to AWS resources that the user normally doesn't have.

Another scenario would be that you want to grant an application access to your resources without exposing your AWS credentials.

## Policies

With policies you can define permissions for users, groups and roles. Policies are the building blocks to define what action can be performed for what resource.

Let's take a look at a simple policy:

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

You can directly see that policies are defined with the help of the [JSON syntax](http://json.org).

- With **Action** you tell what kind of actions are allowed (in this case "List S3 bucket").
- **Resources** defines what resource this action affects (Here it's the S3 bucket with the name **example**).
- **Effect** can either be `Allow` or `Deny`.

You can read the policy above as follows:

> "Allow to list the stuff in the S3 bucket with the name **example**."

If you attach this policy to a user, this user will be allowed to perform this action. If you attach it to a group all users in that group can perform this action.

## Identity Providers

Identity providers enables you a way to let users gain access to your AWS resources with the help of an external identity provider (IdP). You may have used an external identity provider in the past if you've used your Twitter, GitHub or Facebook account to sign in to another website.

## How Serverless uses IAM

The Serverless framework needs a user with admin access so that it can create AWS resources your Serverless service uses on your behalf (e.g. S3 buckets, DynamoDB tables, ...).

We'll configure this user later on when installing and setting up everything on your local machine.

Furthermore roles and policies are used to e.g. run your Lambda functions with the correct permissions.

Don't get too confused if you don't understand this yet. We'll get into more detail later on.
