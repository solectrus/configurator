# Installation Guide

This is your personalized guide for installing SOLECTRUS on your machine, created based on your answers. The key elements are the two files `compose.yml` and `.env` located in the tabs next to this one. They contain all the information you need for installing and running SOLECTRUS.

**WARNING:** The configurator is under heavy development and involves installing beta versions of Docker images. The guide is currently available in English, with the final version to be available in German as well. Please report any issues you encounter!

## Prerequisites

Beside having a Raspberry Pi with a 64bit OS and Kernel v4 or higher, you need to have **Docker** installed and running. The following steps will guide you through the installation process.

Now let's get started and log in to your Raspi via SSH.

### Check your OS

First, ensure you have a 64bit OS with Kernel v4 or higher. Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux MyRaspi 6.1.21-v8+ #1642 SMP PREEMPT Mon Apr  3 17:24:16 BST 2023 aarch64 GNU/Linux

$ dpkg --print-architecture
arm64
```

The kernel is `v6`, which is the latest and greatest - `v4` or `v5` will work as well.

The architecture is `arm64` which means you are running a 64bit OS. If you are running a 32bit OS, you need to upgrade. If the architecture is `armhf`, you are running a 64bit Kernel with 32bit userland, which will **not** work.'

The easiest way to setup a brand new OS is to use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) and install Raspberry Pi OS Lite (Debian Bookworm, 64bit) on a SD card.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 26.0.0, build 2ae903e

$ docker compose version
Docker Compose version v2.25.0
```

An older version might work as well. If you don't have Docker installed, please follow the [official instructions](https://docs.docker.com/engine/install/debian/) to install.

Don't forget to add your user to the `docker` group, so you don't need to use `sudo` for every Docker command.

```console
sudo groupadd docker
sudo usermod -aG docker $USER
```

**Important:** Log out and log back in so that your group membership is re-evaluated.

You can read more about this [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the official Docker documentation.

## Create folders for configuration and data storage

Choose a folder where you want to store the configuration and Docker volumes. This guide assumes you have a folder `/~/solectrus` which is located in the home folder of the current user. You can create this folder with the required subfolders with the following commands:

```console
cd ~
mkdir -p solectrus
cd solectrus
mkdir redis postgresql influxdb
```

## Add configuration files

There are two configuration files, `.env` and `compose.yml`, that you need to create. The `.env` file contains the environment variables for the Docker containers, and the `compose.yml` file contains the Docker Compose configuration.

Both are individually generated for you by the Configurator. You can find them in the tabs beside. Copy both files to your Linux machine via the clipboard.

### Environment variables (.env)

First, copy your personal `.env` file to the clipboard. Then, run this command on your Linux machine:

```console
 cat > .env
```

Now paste the clipboard by pressing `Ctrl+V` and lastly save it by pressing `Ctrl+D`.

This may seem a little tricky, but it is the easiest way to copy the contents of the clipboard to a file on your Linux computer without having to rely on any tools. If you know a better way (e.g. via a text editor), feel free to use it.

### Docker Compose configuration (compose.yml)

Do the same for the `compose.yml` file: Copy the file content to the clipboard and run this command:

```
cat > compose.yml
```

Then, paste the content and save it by pressing `Ctrl+D`.

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

That's it. You have successfully installed SOLECTRUS on your machine!

## Open the app in your browser

You can now open the SOLECTRUS app in your browser by navigating to this URL:

[http://192.168.108.42:3000](http://192.168.108.42:3000)

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
