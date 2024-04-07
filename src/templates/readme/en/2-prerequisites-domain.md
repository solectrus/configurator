## Setup your domain

You have chosen the domain `%{domain}`. Ensure that this domain points to the IP address you got from Hetzner, which requires a DNS entry. Go to your domain registrar and add an `A` record with the IP address you got from Hetzner. Please note that it can take a while until the DNS changes are propagated.

To check whether this step was successful, use tools such as `dig` or `ping` to check that the name resolution works. Example:

```console
ping %{domain}
```

Don’t continue until the domain points to the correct IP address.
