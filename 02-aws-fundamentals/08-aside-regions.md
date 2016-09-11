# Aside: Regions

AWS services can be deployed in different regions. Those regions are split up geographically. You should choose a region near to you or your users to keep response time low and your app performance snappy.

Furthermore regions make it possible to create a redundant and fault tolerant infrastructure. It's no problem if the datacenter in Oregon is on fire if you have another deployment in Ireland.

Serverless makes it easy to deploy your Lambdas into multiple regions so that your application is spread across the globe.
Take a look [here](https://aws.amazon.com/about-aws/global-infrastructure/) if you want to learn more about AWS and the available regions.
