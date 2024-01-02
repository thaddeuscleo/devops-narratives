---
title: Containerized Your App Now!
description: It's time to deploy your app in the form of container.
date: '2023-9-20'
categories:
  - CI/CD
  - Container
  - Docker
  - Linux
  - NodeJS
published: true
---

Improve the following text grammar and make it simple to understand:

## How do I put my app into a container?

Before moving your current application into a container, it's crucial to grasp the difference between a container and a container image. In simple terms, think of a container as a live version of a container image. Without the container image, your app won't function because all of its source code is stored inside the container image. So, the first step is to create the container image.

## What are the step in creating Container Image?

First, prepare the project you want to put into a container image. In this guide, we'll use an empty NestJS project for the demonstration.

1. Create a new NestJS Project using the CLI..
   ```bash
    # Install Nestjs CLI
    npm i -g @nestjs/cli

    # Create the project with the name "container-image"
    nest new container-demo
    cd container-demo
    npm i
   ```
2. Create a file named Dockerfile. The Dockerfile will contain all the commands for creating the image.
   ```bash
   touch Dockerfile
   ```
3. Paste the following code into the `Dockerfile`:
   ```docker
   # FROM keyword specifies the base image to use. In this example, we use FROM node:18-alpine, which includes a
   # preinstalled Node.js runtime.
   # ---
   # note: base image is like your starting template
   FROM node:18-alpine
   
   # The ENV keyword sets environment variables inside the container. 
   # In this case, the image is built in a CI environment, so additional 
   # environment variables are set in the Dockerfile.
   ENV CI=true
   ENV NODE_ENV production
    
   # Expose Port 3000 (will open the specified port, in this case port 3000)
   EXPOSE 3000

   # WORKDIR keyword wil change the working 
   # directory within the container.
   # ---
   # note: similar to, cd /usr/src/app
   WORKDIR /usr/src/app

   # The COPY keyword copies files from the local environment into the container.
   # ---
   # In this example we are copying the application dependency manifests to the container during build time.
   # A wildcard is used to ensure copying both package.json AND package-lock.json (when available).
   COPY --chown=node:node package*.json ./

   # The RUN keyword executes commands during build time.
   # ---
   # Here, we are installing the app dependencies using the `npm ci` (clean install) command instead of `npm install`
   RUN npm ci

   # Bundle app source
   COPY --chown=node:node . .

   # Build NestJS
   RUN npm run build

   # CMD keyword will be executed when the container started
   # ---
   # When the container started, it will run the NestJS app
   CMD ["node", "dist/main.js"]
   ```
4. To build/create the container image using the Dockerfile we can run the following command:
   ```bash
   docker build -t docker-demo:1.0.0 .
   ```
   the `-t` argument will label the container image with the name `docker-demo` with version `1.0.0`
5. To verify whether the image is created or not. We can check using the following command:
   ```bash
   docker image ls
   ```
6. As we can see we already have a container named `docker-demo` with the version `1.0.0`. To start the container rn the following command:
   ```bash
   docker run -n demo-test -p 3000:3000 docker-demo:1.0.0 
   ```
   check whether the container is already running or not:
   ```bash
   docker ps -a
   ```