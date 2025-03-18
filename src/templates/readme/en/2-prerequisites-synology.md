## Prerequisites

There are lots of different Synology NAS devices, and they all have different hardware and software. This guide is tested on a Synology NAS DS220+, but should work on some other models as well.

A processor with at least 2 cores is recommended, as well as a RAM upgrade to more than 2GB. A Linux kernel `v4` or higher is recommended, some older Synology devices **may** not work as they have kernel `v3` and cannot be upgraded.

Beside this, you need to have **Docker** installed and running. No other software is required.

The following steps will guide you through the installation process. Now let's get started and log in to your Linux computer via SSH.

### Check your OS

First, ensure you have a 64bit OS with Kernel `v4` or higher. Check your OS and architecture, which should look like this:

```console
$ uname -a
Linux MySyno 4.4.302+ #72806 SMP Thu Sep 5 13:44:44 CST 2024 x86_64 GNU/Linux synology_geminilake_220+

$ dpkg --print-architecture
amd64
```

The kernel is `v4`, which is the recommended minimum. Newer versions such as `v5` or `v6` will of course also work. Older versions like `v3` **may** not work. Unfortunately, Synology does not provide a way to update the kernel.

The architecture is `amd64` which means you are running a 64bit OS. If you are running a 32bit OS, you need to upgrade first - if possible.

### Prepare Docker

Ensure Docker is installed and running. First, check your Docker version:

```console
$ docker --version
Docker version 24.0.2, build 610b8d0

$ docker-compose version
Docker Compose version v2.20.1-6047-g6817716
```

If you don't have Docker installed, please install the [Container Manager](https://www.synology.com/dsm/packages/ContainerManager) via the Synology Package Center.

Note that the Docker version on Synology is a little older than the official Docker version. In most cases, this is fine. However, it is important to know that the command `compose` therefore requires a hyphen between `docker` and `compose`. In the following commands, you must therefore replace `docker compose` with `docker-compose`.

To ensure Docker can run without sudo, create a docker group and add yourself to it:

```console
sudo synogroup --add docker
sudo chown root:docker /var/run/docker.sock
sudo synogroup --member docker $USER
```

(adopted from the [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) in the official Docker documentation).
