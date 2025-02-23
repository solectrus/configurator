## Final thoughts

In the browser you should login as Admin with you chosen password. Login is required to edit settings like energy prices.

SOLECTRUS requires you to register your installation. There is yellow banner on the top of the page, which will guide you through the registration process.

SOLECTRUS contains an auto-update feature by using [Watchtower](https://containrrr.dev/watchtower/). It will automatically update all Docker images referenced in the `compose.yaml` file and restart the containers if necessary. An update check is performed every 24 hours. Other Docker containers on the same machine are **not touched** by Watchtower.

If you want to update the Docker images manually, you can run the following command:

```console
docker compose pull
docker compose up -d
```

If something goes wrong, you should check the logs of the containers:

```console
docker compose logs -n 100 -f
```

In case of any question, please check out the [forum at GitHub Discussions](https://github.com/orgs/solectrus/discussions). In case of a bug, please open an issue at GitHub in the [SOLECTRUS repository](https://github.com/solectrus/solectrus/issues).

## Sponsoring

SOLECTRUS relies on financial support from its users. In return, sponsors gain access to exclusive features. You can find more information on the [sponsorship page](https://solectrus.de/sponsoring/).
