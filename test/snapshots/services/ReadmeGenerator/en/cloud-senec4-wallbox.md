# Installation Guide

This is your personalized guide for installing SOLECTRUS on your machine, created individually based on your answers. It consists of three parts:

- The `README.md` file, which you are currently reading
- The `compose.yaml` file, which contains the services that are started in Docker containers
- The `.env` file, which contains the environment variables for the Docker containers

You can switch between them using the links above. The `compose.yaml` and `.env` can be copied to the clipboard. You will need this later.

**PLEASE NOTE:** This configurator is still quite new. Please report any issues on GitHub at [https://github.com/solectrus/configurator/issues](https://github.com/solectrus/configurator/issues).

Now read on to do the installation on your Linux machine.

## Prerequisites

This guide assumes you have a cloud server running Linux. If you don't have one, Hetzner Cloud is a good choice and it is used in this guide. Hetzner is a German cloud provider with a good price-performance ratio. But of course, you can use any other cloud provider with SSH access as well.

### Order your server at Hetzner

First, sign up on Hetzner:
[https://hetzner.cloud/?ref=NggV8HU9FqCz](https://hetzner.cloud/?ref=NggV8HU9FqCz)

This is a referral link that will give you a credit of €20 (and a small commission for me).

Then order your server:

- Go to [https://console.hetzner.cloud/projects](https://console.hetzner.cloud/projects)
- Select `New project`, name it _SOLECTRUS_ and open the project
- Select `Add server`
  - `Location`: Select a location near you
  - `Image`: Select `Apps`, then `Docker CE`
  - `Type`: The smallest machine is enough, so select `Shared vCPU` with `x86` architecture and then `CX22` **or** `Arm64` architecture and then `CAX11` (both have 2 vCPUs, 4 GB RAM, 40 GB SSD)
  - `Networking`: Select `Public IPv4`
  - `SSH-Key`: If you already have an SSH key, you can add it here to avoid struggling with SSH password. Otherwise, leave it blank to use a password which will be generated for you
- Order (for `€4,51` per month)

Note the IPv4 address of your server, you will need it later.

Log into your brand new Linux machine via SSH by using the given IPv4 address:

```console
ssh root@<your-ip-address>
```

If you used an SSH key, you will be logged in directly. Otherwise, Hetzner sends you an email with the password. Use it to log in and follow the steps to change the password immediately.

## Create folders for configuration and data storage

SOLECTRUS needs a folder to store the configuration files and Docker volumes for the databases. This folder needs to be created on your Linux machine before you start the Docker containers. We choose `~/solectrus` as the base folder for this purpose.

First, create the required folders with the following commands:

```console
cd ~
mkdir -p solectrus
cd solectrus

# Create folders for Docker volumes
mkdir redis postgresql influxdb
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

[http://42.42.42.42:3000](http://42.42.42.42:3000)

Your InfluxDB instance is available via the following URL:

[http://42.42.42.42:8086](http://42.42.42.42:8086)

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
