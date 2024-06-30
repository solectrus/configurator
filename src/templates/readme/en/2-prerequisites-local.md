## Prerequisites

Beside having a Linux machine with a 64bit OS and Kernel v4 or higher, you need to have **Docker** installed and running. The following steps will guide you through the installation process.

Now let's get started and log in to your Linux computer via SSH.

### Check your OS

First, ensure you have a 64bit OS with Kernel v4 or higher. Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux MyUbuntu 6.8.0-36-generic #36-Ubuntu SMP PREEMPT_DYNAMIC Mon Jun 10 10:49:14 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux

$ dpkg --print-architecture
amd64
```

The kernel is `v6`, which is the latest and greatest - `v4` or `v5` will work as well.

The architecture is `amd64` which means you are running a 64bit OS. `arm64` is another common architecture for 64bit OS.

If you are running a 32bit OS, you need to upgrade. If the architecture is `armhf`, you are running a 64bit Kernel with 32bit userland, which will **not** work.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 27.0.2, build 912c1dd

$ docker compose version
Docker Compose version v2.28.1
```

An older version might work as well.

If you don't have Docker installed, please follow the [official instructions](https://docs.docker.com/engine/install/) to install.

Don't forget to add your user to the `docker` group, so you don't need to use `sudo` for every Docker command.

```console
sudo groupadd docker
sudo usermod -aG docker $USER
```

**Important:** Log out and log back in so that your group membership is re-evaluated.

You can read more about this [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the official Docker documentation.
