## Richte deine Domain ein

Du hast die Domain `%{domain}` gewählt. Stelle sicher, dass diese Domain auf die IP-Adresse zeigt, die du von Hetzner erhalten hast. Dazu ist ein DNS-Eintrag notwendig. Gehe zu deinem Domain-Registrar und füge einen `A` Record mit der IP-Adresse hinzu, die du von Hetzner bekommen hast. Bitte beachte, dass es eine Weile dauern kann, bis die DNS-Änderungen übernommen werden.

Um zu überprüfen, ob dieser Schritt erfolgreich war, kannst du Werkzeuge wie `dig` oder `ping` verwenden, um die Namensauflösung zu testen. Beispiel:

```console
ping %{domain}
```

Fahre erst fort, wenn die Domain auf die korrekte IP-Adresse zeigt.

## Hinweise zur Verwendung von Traefik

Dein Setup wird [Traefik](https://traefik.io/) beinhalten, einen beliebten und kostenlosen Reverse-Proxy, der die TLS-Zertifikate für deine Domain verwaltet. Das bedeutet, dass du auf die SOLECTRUS-App über `https` zugreifen kannst, ohne dich selbst um die Einrichtung der Zertifikate kümmern zu müssen.

Nachdem alle Container gestartet wurden, wird Traefik automatisch ein TLS-Zertifikat für deine Domain abrufen (und später regelmäßig verlängern). Dieser Vorgang dauert höchstens ein paar Minuten. Nach einer kurzen Wartezeit solltest du in der Lage sein, auf deine Domain zuzugreifen, ohne Sicherheitswarnungen in deinem Browser zu erhalten.

Beachte, dass es nach dem Neustart des Traefik-Containers eine kurze Weile dauert, bis Traefik wieder vollständig verfügbar ist. Ein paar 404-Fehler direkt nach dem Neustart sind normal und kein Grund zur Sorge.

InfluxDB wird ebenfalls über `https` verfügbar sein, allerdings auf einem anderen Port, du erreicht InfluxDB über `https://%{domain}:8086`.
