---
title: WTH is Container?
description: What is container basically? And should i containerized my app ?
date: '2023-9-19'
categories:
  - Container
  - Docker
  - Linux
published: true
---

## Sharing My Experience with Deploying Applications

I want to share my experience with deploying applications to a production environment. During application development, we often use a localized runtime environment that may differ from the production setup. This difference can lead to unexpected behavior when the application goes live in production. This situation is commonly known as **"IWM"** or **"It Works on My Machine"** Thankfully, this issue can be effectively resolved by utilizing containerization technology.

## So, What Are Containers, Essentially?

Containers are essentially technologies that allow you to package your application into an **isolated** environment. This environment can include the application runtime along with all the necessary files to run your application. This approach reduces the complications when moving the application across different environments like development, staging, and production. By doing this, the application exhibits consistent behavior across environments.

## Are Consistency Across Different Environments the Only Benefit?

Certainly not. Containerization offers more benefits than just consistent behavior. It saves a considerable amount of time during production deployment because containerized applications are essentially packages (container images) that can be instantly run, provided the host machine has one of the containerization engines installed, such as Docker, CRI-O, or ContainerD.

Another advantage of using containers is that the application's processes are isolated from the host. Therefore, in case a vulnerability is discovered in the application, an attacker would only be able to execute code at the container level, providing an additional layer of protection for your host machine.

Additionally, containers make it easier to integrate your existing environments into a single pipeline for tasks like code testing, integration testing, alpha testing, and more. This agility in development benefits the application's lifecycle.

## I've Heard That Containerized Apps Are More Scalable. Is That Correct?

Yes and no. It's a bit more nuanced.

Before delving too deep, let's clarify what scaling applications means. During production, it's possible for your application to experience high traffic, leading to nearly 100% utilization of your hardware resources. In such cases, you can either upgrade the CPU or memory capacity to improve application performance, which is known as Vertical Scaling.

Alternatively, you can create new instances of your application by generating additional identical containers from the same image, referred to as Horizontal Scaling. However, Horizontal Scaling presents some challenges. Not all applications can seamlessly handle horizontal scaling, as it may require additional adjustments. For instance, certain features like web sockets may not work instantly when horizontally scaled. I'll delve deeper into this in my upcoming blog post.

## How Do I Begin My Container Journey?

To start using container technologies, you have several runtime options. A great starting point, in my opinion, is Docker. It's known for its user-friendliness and intuitive nature. You can begin by either installing Docker Desktop or by installing it on your WSL2 system using the following command:

1. Remove existing conflicting packages.

```bash
for pkg in docker.io docker-doc docker-compose podman-docker containerd runc; do sudo apt-get remove $pkg; done;
```

2. Set up Docker's Apt repository.

```bash
# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch="$(dpkg --print-architecture)" signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  "$(. /etc/os-release && echo "$VERSION_CODENAME")" stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update
```

3. Install the Docker packages.

```bash
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
```

4. Create the `docker` group.

```bash
sudo groupadd docker
```

5. Add your user to the docker group.

```bash
sudo usermod -aG docker $USER
```

Congratulations! you now able to start your container journey.
Stay tune on how to containerized your existing application.
If you have any topics to discuss you may kindly send issues [here](https://github.com/thaddeuscleo/devops-narratives/issues)
