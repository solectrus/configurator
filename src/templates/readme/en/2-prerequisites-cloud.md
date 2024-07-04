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
