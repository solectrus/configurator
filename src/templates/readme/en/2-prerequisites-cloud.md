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
