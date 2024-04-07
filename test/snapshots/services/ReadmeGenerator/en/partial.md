# Installation Guide

This is your personalized guide for installing SOLECTRUS on your machine, created based on your answers. The key elements are the two files `compose.yml` and `.env` located in the tabs next to this one. They contain all the information you need for installing and running SOLECTRUS.

**WARNING:** The configurator is under heavy development and involves installing beta versions of Docker images. The guide is currently available in English, with the final version to be available in German as well. Please report any issues you encounter!

## Prerequisites

This guide assumes you have a cloud server running Linux. If you don't have one, Hetzner Cloud is a good choice and it is used in this guide. Hetzner is a German cloud provider with a good price-performance ratio. But of course, you can use any other cloud provider with SSH access as well.

### Order your server at Hetzner

First, sign up on Hetzner:
[https://hetzner.cloud/?ref=NggV8HU9FqCz](https://hetzner.cloud/?ref=NggV8HU9FqCz)

This ia referral link, it will give you a discount of €20.

Then order your server:

- Go to [https://console.hetzner.cloud/projects](https://console.hetzner.cloud/projects)
- Select `New project`, name it _SOLECTRUS_ and open the project
- Select `Add server`
  - `Location`: Select a location near you
  - `Image`: Select `Apps`, then `Docker CE`
  - `Type`: The smallest machine is enough, so select `Arm64` architecture and then `CAX11`
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

That's it!

## Open the app in your browser

You can now open the SOLECTRUS app in your browser by navigating to this URL:

[http://42.42.42.42:3000](http://42.42.42.42:3000)

Your InfluxDB instance is available via the following URL:

[http://42.42.42.42:8086](http://42.42.42.42:8086)

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
