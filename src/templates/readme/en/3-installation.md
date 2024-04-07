## Create folders for configuration and data storage

Choose a folder where you want to store the configuration and Docker volumes. This guide assumes you have a folder `/~/solectrus` which is located in the home folder of the current user. You can create this folder with the required subfolders with the following commands:

```console
cd ~
mkdir -p solectrus
cd solectrus
mkdir %{folders}
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
