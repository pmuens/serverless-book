# Cloud provider setup

In this chapter we'll setup the cloud provider of our choice so that we can use it for our upcoming, first Serverless service.

## Creating an AWS account

At first you need to create an AWS account (if you haven't already). You can do this on their [signup page](https://aws.amazon.com/free/).

## Configuring AWS

The next thing we need to do is to create an AWS user which has **administrative access** to your account:

1. Login to your AWS account
2. Go to the **Identity & Access Management (IAM)** page
3. Click on **Users**
4. Click on **Create New Users**
5. Enter *serverless-admin* and click **Create**
6. Click on **Download Credentials** to download the .csv file with the AWS credentials
7. Click **Users** on the left
8. Click on the *serverless-admin* user
9. Go to the **Permissions** tab
10. Click **Attach Policy** and select the **Administrator Access**
11. Click on **Attach Policy**

Done. We've now created an *serverless-admin* user which can do stuff in our AWS account on our behalf (thanks to the **Administrator Access** policy).

**Note:** This setup is not that safe for production environments as it gives the *serverless-admin* user full access to the AWS account. If you deploy your app in a production environment you should definitely reduce the rights for this user.

## Setting the AWS API Key & Secret

Serverless needs access to the `AWS Access Key ID` and `AWS Secret Access Key` so that it can work with the previously created AWS user.

At first you should download and isntall the AWS CLI. You can read how to do this [here](http://docs.aws.amazon.com/cli/latest/userguide/installing.html).

After you've done this you need to run

```bash
aws configure
```

To start the AWS CLI configuartion wizard. Follow this wizard and enter the corresponding `AWS Access Key ID` and `AWS Secret Access Key`.

Once done Serverless is able to use those keys and work with the help of the *serverless-admin* user.
