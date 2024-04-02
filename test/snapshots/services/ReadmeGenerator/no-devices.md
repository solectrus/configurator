# Installation guide

This guide demonstrates how to run all components of SOLECTRUS

## Prerequisites

Log into your Linux machine via SSH.

### Check your OS

Ensure you have a 64bit OS with Kernel v4 or higher

Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux raspberrypi 6.1.21-v8+ #1642 SMP PREEMPT Mon Apr  3 17:24:16 BST 2023 aarch64 GNU/Linux

$ dpkg --print-architecture
arm64
```

The kernel is `v6`, which is the latest and greatest - `v4` or `v5` will work as well.

The architecture is `arm64` which means you are running a 64bit OS. If you are running a 32bit OS, you need to upgrade. If the architecture is `armhf`, you are running a 64bit Kernel with 32bit userland, which will **not** work.'

If you have a Raspberry Pi: The easiest way to setup a brand new OS is to use the [Raspberry Pi Imager](https://www.raspberrypi.com/software/) and install Raspberry Pi OS Lite (Debian Bookworm, 64bit) on a SD card.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 26.0.0, build 2ae903e

$ docker compose version
Docker Compose version v2.25.0
```

If you don't have Docker installed, follow the [official instructions](https://docs.docker.com/engine/install/debian/) to install.

Don't forget to add your user to the `docker` group, so you don't need to use `sudo` for every Docker command.

```console
sudo groupadd docker
sudo usermod -aG docker $USER
```

Log out and log back in so that your group membership is re-evaluated.

You can read more about this [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the official Docker documentation.

## Create folders for configuration and data storage

Choose a folder where you want to store the configuration and Docker volumes. This guide assumes you have a folder `/home/$USER/solectrus` which is used for Docker volumes. You can create this folder with the required subfolders with the following commands:

```console
cd /home/$USER
mkdir -p solectrus
cd solectrus
mkdir redis postgresql influxdb
```

## Add configuration files

There are two configuration files, `.env` and `compose.yml`, that you need to create. The `.env` file contains the environment variables for the Docker containers, and the `compose.yml` file contains the Docker Compose configuration.

Both are individually generated for you by the Configurator. You can find them in the tabs beside. Copy both files to your Linux machine via the clipboard. The following steps will use the `nano` editor to create the files, because this editor is pre-installed on most Linux distributions. But you can use any editor you like (which supports clipboard pasting).

### Environment variables (.env)

First, copy your personal `.env` file to the clipboard. Then, paste it into a new file on your Linux machine:

```console
nano .env
```

When the editor opens, paste the configuration file into. Save and exit the editor by pressing `Ctrl+S` and `Ctrl+X`.

### Docker Compose configuration (compose.yml)

Do the same for the `compose.yml` file:

```console
nano compose.yml
```

Again, when the editor opens, paste the configuration file into. Save and exit the editor by pressing `Ctrl+S` and `Ctrl+X`.

## Start the Docker containers

Ok, now you have everything in place to start the Docker containers in the background. Run the following command in the folder where you saved the `.env` and `compose.yml` files:

```console
docker compose up -d
```

Check if all containers are running fine with the following command:

```console
docker compose ps
```

In case of errors, you can check the logs of the containers:

```console
docker compose logs -n 100 -f
```

## Open the app in your browser

That's it! You can now open the SOLECTRUS app in your browser by navigating to this URL:

[http://[ip]:3000](http://[ip]:3000)
