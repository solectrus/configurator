# Installation Guide

This is your personalized guide for installing SOLECTRUS on your machine, created based on your answers. The key elements are the two files `compose.yml` and `.env` located in the tabs next to this one. They contain all the information you need for installing and running SOLECTRUS.

**WARNING:** The configurator is under heavy development and involves installing beta versions of Docker images. The guide is currently available in English, with the final version to be available in German as well. Please report any issues you encounter!

## Prerequisites

There are lots of different Synology NAS devices, and they all have different hardware and software. This guide is tested on a Synology NAS DS220+, but should work on some other models as well.

A CPU with at least 2 cores is recommended, as well as a RAM upgrade to more than 2GB. A Linux Kernel `v4` or higher is required, some older Synology devices don't work because they are on Kernel `v3` and cannot be updated.

Beside this, you need to have **Docker** installed and running. No other software is required.

The following steps will guide you through the installation process. Now let's get started and log in to your Linux computer via SSH.

### Check your OS

First, ensure you have a 64bit OS with Kernel `v4` or higher. Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux MySyno 4.4.302+ #69057 SMP Mon Nov 13 14:19:30 CST 2023 x86_64 GNU/Linux synology_geminilake_220+

$ dpkg --print-architecture
amd64
```

The kernel is `v4`, which is the minium required. Newer versions like `v5` or `v6` will work as well. Older versions like `v3` will **not** work. Sadly, Synology does not provide a way to upgrade the kernel.

The architecture is `amd64` which means you are running a 64bit OS. If you are running a 32bit OS, you need to upgrade first - if possible.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 20.10.23, build 876964a

$ docker-compose version
Docker Compose version v2.9.0-6413-g38f6acd
```

If you don't have Docker installed, please install the [Container Manager](https://www.synology.com/dsm/packages/ContainerManager) via the Synology Package Center.

Note that the Docker version on Synology is a little older than the official Docker version. In most cases, this is fine. However, it is important to know that the command `compose` therefore requires a hyphen between `docker` and `compose`. In the following commands, you must therefore replace `docker compose` with `docker-compose`.

To ensure Docker can run without sudo, create a docker group and add yourself to it:

```console
sudo synogroup --add docker
sudo chown root:docker /var/run/docker.sock
sudo synogroup --member docker $USER
```

(adopted from the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the official Docker documentation).

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
