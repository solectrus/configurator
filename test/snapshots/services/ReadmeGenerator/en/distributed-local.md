# Installation Guide

This is your personalized guide for installing the local part of SOLECTRUS on your machine, created individually based on your answers. It consists of three parts:

- The `README.md` file, which you are currently reading
- The `compose.yml` file, which contains the services that are started in Docker containers
- The `.env` file, which contains the environment variables for the Docker containers

You can switch between them using the links above. The `compose.yml` and `.env` can be copied to the clipboard. You will need this later.

**PLEASE NOTE:** The Configurator is under heavy development and involves installing beta versions of Docker images. The guide is currently available in English, with the final version to be available in German as well. Please report any issues you encounter via GitHub at [https://github.com/solectrus/hosting/issues](https://github.com/solectrus/hosting/issues).

Now read on to do the installation on your Linux machine.

## Prerequisites

Beside having a Linux machine with a 64bit OS and Kernel v4 or higher, you need to have **Docker** installed and running. The following steps will guide you through the installation process.

Now let's get started and log in to your Linux computer via SSH.

### Check your OS

First, ensure you have a 64bit OS with Kernel v4 or higher. Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux MyUbuntu 6.8.0-31-generic #31-Ubuntu SMP PREEMPT_DYNAMIC Sat Apr 20 00:40:06 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux

$ dpkg --print-architecture
amd64
```

The kernel is `v6`, which is the latest and greatest - `v4` or `v5` will work as well.

The architecture is `amd64` which means you are running a 64bit OS. `arm64` is another common architecture for 64bit OS.

If you are running a 32bit OS, you need to upgrade. If the architecture is `armhf`, you are running a 64bit Kernel with 32bit userland, which will **not** work.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 26.1.2, build 211e74b

$ docker compose version
Docker Compose version v2.27.0
```

An older version might work as well.

If you don't have Docker installed, please follow the [official instructions](https://docs.docker.com/engine/install/) to install.

Don't forget to add your user to the `docker` group, so you don't need to use `sudo` for every Docker command.

```console
sudo groupadd docker
sudo usermod -aG docker $USER
```

**Important:** Log out and log back in so that your group membership is re-evaluated.

You can read more about this [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the official Docker documentation.

## Add configuration files

The configuration of SOLECTRUS consists of two files: `compose.yml` and `.env`. the `compose.yml` file contains the services that are started in Docker containers. The `.env` file contains the environment variables for the Docker containers.

Both files are created for you based on your answers. You can find them under the links above. They must be copied to your Linux machine, which is described in the following sections.

### Copy compose.yml to your machine

First, copy your personal `compose.yml` file to the clipboard by pressing the "Copy" button. Then, run this command on your Linux machine:

```
cat > compose.yml
```

You will see a new empty line in the terminal with a cursor. Now, paste the content from clipboard by pressing `Ctrl+V` and save it by pressing `Ctrl+D`.

This may seem a little tricky, but it is the easiest way to copy the contents of the clipboard to a file on your Linux computer without having to rely on any tools. If you know a better way (e.g. via a text editor), feel free to use it.

Alternatively, you can use the "Download" button. This allows you to download the file so that it can then be uploaded to your Linux machine via `scp` or another file transfer method.

### Copy .env to your machine

Do the same for the `.env` file: Copy the file content to the clipboard and run this command:

```console
 cat > .env
```

Then again, paste the clipboard with `Ctrl+V` and save it by pressing `Ctrl+D`.

Check if the files are created correctly by running the following command:

```console
$ ls -la
```

You should see the following output:

```console
total 24
drwxr-xr-x 2 root root 4096 Apr  7 09:42 ./
drwx------ 5 root root 4096 Apr  7 09:42 ../
-rw-r--r-- 1 root root 6018 Apr  7 09:42 compose.yml
-rw-r--r-- 1 root root 6032 Apr  7 09:42 .env
```

## Start the Docker containers

Ok, now you have everything in place to start the Docker containers in the background. Run the following command in the folder where you saved the `.env` and `compose.yml` files:

```console
docker compose up -d
```

This command will download the Docker images and start the containers. This might take a while, depending on your internet connection and the performance of your machine. It can take a few minutes for the first start.

Check if all containers are running fine with the following command:

```console
docker compose ps
```

That's it. Your local installation is now up and running and pushes data to your cloud installation.

## Open the app in your browser

You can now open the SOLECTRUS app in your browser by navigating to your cloud installation URL.

## Final thoughts

In the browser you should login as Admin with you chosen password. Login is required to edit settings like energy prices.

SOLECTRUS requires you to register your installation. There is yellow banner on the top of the page, which will guide you through the registration process.

SOLECTRUS contains an auto-update feature by using [WatchTower](https://containrrr.dev/watchtower/). It will automatically update all Docker images referenced in the `compose.yml` file and restart the containers if necessary. An update check is performed every 24 hours. Other Docker containers on the same machine are **not touched** by WatchTower.

If you want to update the Docker images manually, you can run the following command:

```console
docker compose pull
docker compose up -d
```

If something goes wrong, you should check the logs of the containers:

```console
docker compose logs -n 100 -f
```

In case of any question, please check out the [forum at GitHub Discussions](https://github.com/orgs/solectrus/discussions). In case of a bug, please open an issue at GitHub in the [SOLECTRUS repository](https://github.com/solectrus/solectrus/issues).

To support the development of SOLECTRUS, please consider [donating](https://ko-fi.com/ledermann) or [become a sponsor on GitHub](https://github.com/sponsors/solectrus).
