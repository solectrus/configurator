# Installation Guide

This is your personalized guide for installing SOLECTRUS on your machine, created individually based on your answers. It consists of three parts:

- The `README.md` file, which you are currently reading
- The `compose.yaml` file, which contains the services that are started in Docker containers
- The `.env` file, which contains the environment variables for the Docker containers

You can switch between them using the links above. The `compose.yaml` and `.env` can be copied to the clipboard. You will need this later.

**PLEASE NOTE:** This configurator is still quite new. Please report any issues on GitHub at [https://github.com/solectrus/configurator/issues](https://github.com/solectrus/configurator/issues).

Now read on to do the installation on your Linux machine.

## Prerequisites

There are lots of different Synology NAS devices, and they all have different hardware and software. This guide is tested on a Synology NAS DS220+, but should work on some other models as well.

A processor with at least 2 cores is recommended, as well as a RAM upgrade to more than 2GB. A Linux kernel `v4` or higher is recommended, some older Synology devices **may** not work as they have kernel `v3` and cannot be upgraded.

Beside this, you need to have **Docker** installed and running. No other software is required.

The following steps will guide you through the installation process. Now let's get started and log in to your Linux computer via SSH.

### Check your OS

First, ensure you have a 64bit OS with Kernel `v4` or higher. Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux MySyno 4.4.302+ #72806 SMP Thu Sep 5 13:44:44 CST 2024 x86_64 GNU/Linux synology_geminilake_220+

$ dpkg --print-architecture
amd64
```

The kernel is `v4`, which is the recommended minimum. Newer versions such as `v5` or `v6` will of course also work. Older versions like `v3` **may** not work. Unfortunately, Synology does not provide a way to update the kernel.

The architecture is `amd64` which means you are running a 64bit OS. If you are running a 32bit OS, you need to upgrade first - if possible.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 24.0.2, build 610b8d0

$ docker-compose version
Docker Compose version v2.20.1-6047-g6817716
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

SOLECTRUS needs a folder to store the configuration files and Docker volumes for the databases. This folder needs to be created on your Linux machine before you start the Docker containers. We choose `~/solectrus` as the base folder for this purpose.

First, create the required folders with the following commands:

```console
cd ~
mkdir -p solectrus
cd solectrus

# Create folders for Docker volumes
mkdir -p /volume1/docker/solectrus/redis /volume1/docker/solectrus/postgresql /volume1/docker/solectrus/influxdb
```

## Add configuration files

The configuration of SOLECTRUS consists of two files: `compose.yaml` and `.env`. the `compose.yaml` file contains the services that are started in Docker containers. The `.env` file contains the environment variables for the Docker containers.

Both files are created for you based on your answers. You can find them under the links above. They must be copied to your Linux machine, which is described in the following sections.

The following steps explain how to copy these files to your Linux computer using the clipboard. Alternatively, you can use other methods such as `scp` or any other file transfer method. The important thing is that the files arrive on your Linux computer and are named `.env` and `compose.yaml`. Please note that `.env` starts with a dot, which may cause the file to be considered as _hidden_ and thus not displayed by default, depending on your operating system.

### Copy compose.yaml to your machine

First, copy your personal `compose.yaml` file to the clipboard by pressing the "Copy" button. Then, run this command on your Linux machine:

```
cat > compose.yaml
```

You will see a new empty line in the terminal with a cursor. Now, paste the content from clipboard by pressing `Ctrl+V` (on macOS: `Cmd+V`) and save it by pressing `Ctrl+D`.

This may seem a little tricky, but it is the easiest way to copy the contents of the clipboard to a file on your Linux computer without having to rely on any tools. If you know a better way (e.g. via a text editor), feel free to use it.

Alternatively, you can use the "Download" button. This allows you to download the file so that it can then be uploaded to your Linux machine via `scp` or another file transfer method.

### Copy .env to your machine

Do the same for the `.env` file: Copy the file content to the clipboard and run this command:

```console
 cat > .env
```

Then again, paste the clipboard with `Ctrl+V` (on macOS: `Cmd+V`) and save it by pressing `Ctrl+D`.

Check if the files are created correctly by running the following command:

```console
$ ls -la
```

You should see the following output:

```console
total 40
drwxr-xr-x 5 root root 4096 Jan  9 17:01 .
drwx------ 7 root root 4096 Jan  9 16:59 ..
-rw-r--r-- 1 root root 6816 Jan  9 17:01 compose.yaml
-rw-r--r-- 1 root root 8428 Jan  9 17:01 .env
drwxr-xr-x 2 root root 4096 Jan  9 16:59 influxdb
drwxr-xr-x 2 root root 4096 Jan  9 16:59 postgresql
drwxr-xr-x 2 root root 4096 Jan  9 16:59 redis
```

## Start the Docker containers

Ok, now you have everything in place to start the Docker containers in the background. Run the following command in the folder where you saved the `.env` and `compose.yaml` files:

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

[http://192.168.108.42:3001](http://192.168.108.42:3001)

## Final thoughts

In the browser you should login as Admin with you chosen password. Login is required to edit settings like energy prices.

SOLECTRUS requires you to register your installation. There is yellow banner on the top of the page, which will guide you through the registration process.

SOLECTRUS contains an auto-update feature by using [Watchtower](https://containrrr.dev/watchtower/). It will automatically update all Docker images referenced in the `compose.yaml` file and restart the containers if necessary. An update check is performed every 24 hours. Other Docker containers on the same machine are **not touched** by Watchtower.

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

## Sponsoring

SOLECTRUS relies on financial support from its users. In return, sponsors gain access to exclusive features. You can find more information on the [sponsorship page](https://solectrus.de/sponsoring/).
