# Installing Serverless

Let's dive directly into serverless and the Serverless framework. In order to do so we need to install [Node.js](http://nodejs.org) (as Serverless is a Node.js [CLI](xx-terminologies/01-terminologies.md#cli)) and the after that the Serverless CLI. This chapter will show us how we can accomplish this.

## Installing Node.js

The Serverless framework uses [Node.js](http://nodejs.org) under to hood. Because of this we need to install Node.js before we can use Serverless.

Head over to the [Node.js download page](https://nodejs.org/en/download/) and download the most recent Node.js version for your operating system. Serverless needs at least Node.js version 4. However you can also use a newer version.

If you want to install Node.js with the help of a package manager (which we'd recommend) you can take a look at the [Node.js installation instructions for package managers](https://nodejs.org/en/download/package-manager/).

Make sure that Node.js is installed properly by opening up a new terminal window and enter

```bash
node --version
```

This should show you the installed Node.js version which should be greater than 4.0.

## Installing the Serverless CLI

Next up we can use [npm](xx-terminologies/01-terminologies.md#npm) (the Node package manager which was installed alongside [Node.js](http://nodejs.org)) to install Serverless.

Open up a terminal and enter

```bash
npm install -g serverless
```

This downloads the latest Serverless version from the Node.js package registry and installs it globally on our system (The `-g` option ensures that the package is accessible globally).

Let's check if everything was installed successfully.

Enter

```bash
serverless --version
```

You should see a version number printed out on the terminal.

That's it. We can now move forward and setup the cloud provider of our choice to finish the setup steps and get started with our first Serverless service.
