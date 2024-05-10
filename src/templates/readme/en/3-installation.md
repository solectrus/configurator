## Add configuration files

The configuration of SOLECTRUS consists of two files: `compose.yml` and `.env`. the `compose.yml` file contains the services that are started in Docker containers. The `.env` file contains the environment variables for the Docker containers.

Both files are created for you based on your answers. You can find them under the links above. They must be copied to your Linux machine, which is described in the following sections.

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
