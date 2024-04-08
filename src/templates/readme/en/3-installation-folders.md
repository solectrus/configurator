## Create folders for configuration and data storage

SOLECTRUS needs a folder to store the configuration files and Docker volumes for the databases. This folder needs to be created on your Linux machine before you start the Docker containers. We choose `~/solectrus` as the base folder for this purpose.

First, create this folder and the required subfolders with the following commands:

```console
cd ~
mkdir -p solectrus
cd solectrus
mkdir %{folders}
```