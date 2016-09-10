# What is S3?

[S3](https://aws.amazon.com/s3/) stands for "Simple Storage Service" and helps you store your data in the Amazon cloud. This data can be everything. Your photos, your code, your zipped music archive. AWS makes sure that the infrastructure is administrated so that you can always access your files without problems.

Furthermore you have "infinite" storage available. This means that you don't have to think about the size before designing your infrastructure. Just upload your data and you are done.


Permission management, revisions and many more is also implemented in S3. You can define who can access what at every time. You have accidentally removed an object from your bucket? No problem. You can restore it easily (although you have to enable it when creating your bucket).

Apart from the web console you can use standardized protocols to upload and access your S3 data.

## Buckets

Buckets give you a way to organize your files. Just create a bucket (e.g. „photos“) and upload everything related there. Permissions, Revisions and other settings can be defined on a bucket level. So you can e.g. share your photos online while keeping your uploaded code files (in your „code“ bucket) a secret.

## How Serverless uses S3

Each service which is created with the help of the Serverless Framework uses an S3 bucket to store the service related artifacts (e.g. the services code, the CloudFormation template etc.) inside a service related S3 bucket. This bucket is automatically managed by Serverless so you don't need to care about it.
