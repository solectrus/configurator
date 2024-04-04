# Installation guide

This is your personal guide to install SOLECTRUS on your machine, generated based on your answers to the questions.

## Prerequisites

### Order your server at Hetzner

First, sign up on Hetzner:
[https://hetzner.cloud/?ref=NggV8HU9FqCz](https://hetzner.cloud/?ref=NggV8HU9FqCz)

(This ia referral link, it will give you a discount of €20 - and me too)

Then order your server:

- Go to [https://console.hetzner.cloud/projects](https://console.hetzner.cloud/projects)
- Select "New project", name it "SOLECTRUS", open the project
- Select "Add server"
- Location: Select a location near you
- Image: Select "Apps", then "Docker CE"
- Type: The smallest machine is enough, so select "Arm64" architecture and then "CAX11"
- SSH-Key: If you already have an SSH key, you can add it here to avoid struggling with SSH password. Otherwise, leave it blank.
- Order (for €4,51 per month)

Note the IP address of your server, you will need it later.

Log into your brand new Linux machine via SSH by using the given IP address:

```console
$ ssh root@<your-ip-address>
```

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

This seems to be bit tricky, but it's the easiest way to copy the content from clipboard to a file on your Linux machine. If you have a better way (e.g. via text editor), feel free to use it.

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

## Open the app in your browser

That's it! You can now open the SOLECTRUS app in your browser by navigating to this URL:

[https://solectrus.my-website.de](https://solectrus.my-website.de)

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
