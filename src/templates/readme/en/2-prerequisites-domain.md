## Setup your domain

You have chosen the domain `%{domain}`. Ensure that this domain points to the IP address you got from Hetzner, which requires a DNS entry. Go to your domain registrar and add an `A` record with the IP address you got from Hetzner. Please note that it can take a while until the DNS changes are propagated.

To check whether this step was successful, use tools such as `dig` or `ping` to check that the name resolution works. Example:

```console
ping %{domain}
```

Don’t continue until the domain points to the correct IP address.

## Notes about using Traefik

Your setup will include [Traefik](https://traefik.io/), which is a popular and free reverse proxy that handles the TSL certificates for your domain. This means that you will be able to access the SOLECTRUS app via `https` without having to worry about setting up certificates yourself.

After all containers have been started, Traefik will automatically fetch (and later renew) a TLS certificate for your Domain, this process will take a few minutes at most. After waiting a little, you should be able to access your domain without getting any security warnings in your browser.

Note that whenever you restart Traefik container, it takes a short while for Ttraefik to be fully available again. Getting "404 page not found" responses immediately after restarting is normal and no cause for concern.

InfluxDB will be available via `https` as well, but requires a different port. It is setup for the URL `https://%{domain}:8086`.
