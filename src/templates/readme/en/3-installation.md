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

[%{url}](%{url})
