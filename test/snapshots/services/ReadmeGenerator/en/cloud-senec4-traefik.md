# Installation Guide

This is your personalized guide for installing SOLECTRUS on your machine, created individually based on your answers. It consists of three parts:

- The `README.md` file, which you are currently reading
- The `compose.yml` file, which contains the services that are started in Docker containers
- The `.env` file, which contains the environment variables for the Docker containers

You can switch between them using the links above. The `compose.yml` and `.env` can be copied to the clipboard. You will need this later.

**PLEASE NOTE:** This configurator is still quite new. Please report any issues on GitHub at [https://github.com/solectrus/configurator/issues](https://github.com/solectrus/configurator/issues).

Now read on to do the installation on your Linux machine.

## Prerequisites

This guide assumes you have a cloud server running Linux. If you don't have one, Hetzner Cloud is a good choice and it is used in this guide. Hetzner is a German cloud provider with a good price-performance ratio. But of course, you can use any other cloud provider with SSH access as well.

### Order your server at Hetzner

First, sign up on Hetzner:
[https://hetzner.cloud/?ref=NggV8HU9FqCz](https://hetzner.cloud/?ref=NggV8HU9FqCz)

This is a referral link, it will give you (and me) a discount of €20.

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

## Setup your domain

You have chosen the domain `solectrus.my-website.de`. Ensure that this domain points to the IP address you got from Hetzner, which requires a DNS entry. Go to your domain registrar and add an `A` record with the IP address you got from Hetzner. Please note that it can take a while until the DNS changes are propagated.

To check whether this step was successful, use tools such as `dig` or `ping` to check that the name resolution works. Example:

```console
ping solectrus.my-website.de
```

Don’t continue until the domain points to the correct IP address.

## Notes about using Traefik

Your setup will include [Traefik](https://traefik.io/), which is a popular and free reverse proxy that handles the TSL certificates for your domain. This means that you will be able to access the SOLECTRUS app via `https` without having to worry about setting up certificates yourself.

After all containers have been started, Traefik will automatically fetch (and later renew) a TLS certificate for your Domain, this process will take a few minutes at most. After waiting a little, you should be able to access your domain without getting any security warnings in your browser.

Note that whenever you restart Traefik container, it takes a short while for Ttraefik to be fully available again. Getting "404 page not found" responses immediately after restarting is normal and no cause for concern.

InfluxDB will be available via `https` as well, but requires a different port. It is setup for the URL `https://solectrus.my-website.de:8086`.

## Create folders for configuration and data storage

SOLECTRUS needs a folder to store the configuration files and Docker volumes for the databases. This folder needs to be created on your Linux machine before you start the Docker containers. We choose `~/solectrus` as the base folder for this purpose.

First, create the required folders with the following commands:

```console
cd ~
mkdir -p solectrus
cd solectrus

# Create folders for Docker volumes
mkdir redis postgresql influxdb traefik
```

## Add configuration files

The configuration of SOLECTRUS consists of two files: `compose.yml` and `.env`. the `compose.yml` file contains the services that are started in Docker containers. The `.env` file contains the environment variables for the Docker containers.

Both files are created for you based on your answers. You can find them under the links above. They must be copied to your Linux machine, which is described in the following sections.

The following steps explain how to copy these files to your Linux computer using the clipboard. Alternatively, you can use other methods such as `scp` or any other file transfer method. The important thing is that the files arrive on your Linux computer and are named `.env` and `compose.yml`. Please note that `.env` starts with a dot, which may cause the file to be considered as _hidden_ and thus not displayed by default, depending on your operating system.

### Copy compose.yml to your machine

First, copy your personal `compose.yml` file to the clipboard by pressing the "Copy" button. Then, run this command on your Linux machine:

```
cat > compose.yml
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

That's it. You have successfully installed SOLECTRUS on your machine!

## Open the app in your browser

You can now open the SOLECTRUS app in your browser by navigating to this URL:

[https://solectrus.my-website.de](https://solectrus.my-website.de)

Your InfluxDB instance is available via the following URL:

[https://solectrus.my-website.de:8086](https://solectrus.my-website.de:8086)

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
