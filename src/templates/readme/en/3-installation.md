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

First, copy your personal `.env` file to the clipboard. Then, run `cat > .env` on your Linux machine, paste the clipboard by pressing `Ctrl+V` and lastly save it by pressing `Ctrl+D`.

This seems to be bit tricky, but it's the easiest way to copy the content from clipboard to a file on your Linux machine. If you have a better way (e.g. via text editor), feel free to use it.

### Docker Compose configuration (compose.yml)

Do the same for the `compose.yml` file: Run `cat > compose.yml`, paste the content and save it by pressing `Ctrl+D`.

## Start the Docker containers

Ok, now you have everything in place to start the Docker containers in the background. Run the following command in the folder where you saved the `.env` and `compose.yml` files:

```console
docker compose up -d
```

This command will download the Docker images and start the containers. This might take a while, depending on your internet connection and the performance of your machine. A little Raspberry will take a few minutes for the first start.

Check if all containers are running fine with the following command:

```console
docker compose ps
```

## Open the app in your browser

That's it! You can now open the SOLECTRUS app in your browser by navigating to this URL:

[%{url}](%{url})
