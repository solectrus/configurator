## Voraussetzungen

Es gibt viele verschiedene Synology NAS-Geräte mit unterschiedlicher Hardware und Software. Diese Anleitung wurde auf einem Synology NAS DS220+ getestet, sollte aber auch auf einigen anderen Modellen funktionieren.

Ein Prozessor mit mindestens 2 Kernen wird empfohlen, ebenso wie ein RAM-Upgrade auf mehr als 2GB. Ein Linux-Kernel `v4` oder höher ist erforderlich, einige ältere Synology-Geräte funktionieren nicht, da sie Kernel `v3` haben und nicht aktualisiert werden können.

Neben diesen Anforderungen muss **Docker** installiert und in Betrieb sein. Weitere Software ist nicht erforderlich.

Die folgenden Schritte führen dich durch den Installationsprozess. Los geht's! Melde dich via SSH auf deinem Linux-Rechner an.

### Überprüfe dein Betriebssystem

Stelle zuerst sicher, dass du ein 64-Bit-Betriebssystem mit Kernel `v4` oder höher hast. Überprüfe dein Betriebssystem und die Architektur, die wie folgt aussehen sollten:

```console
$ uname -a
Linux MySyno 4.4.302+ #69057 SMP Mon Nov 13 14:19:30 CST 2023 x86_64 GNU/Linux synology_geminilake_220+

$ dpkg --print-architecture
amd64
```

Der Kernel ist `v4`, was das Minimum ist. Neuere Versionen wie `v5` oder `v6` funktionieren auch. Ältere Versionen wie `v3` funktionieren **nicht**. Leider bietet Synology keine Möglichkeit, den Kernel zu aktualisieren.

Die Architektur ist `amd64`, was bedeutet, dass du ein 64-Bit-Betriebssystem hast. Falls du ein 32-Bit-Betriebssystem hast, musst du zuerst upgraden – falls möglich.

### Bereite Docker vor

Stelle sicher, dass Docker installiert und in Betrieb ist. Überprüfe zuerst deine Docker-Version:

```console
$ docker --version
Docker version 20.10.23, build 876964a

$ docker-compose version
Docker Compose version v2.9.0-6413-g38f6acd
```

Falls du Docker nicht installiert hast, installiere den [Container Manager](https://www.synology.com/dsm/packages/ContainerManager) über das Synology-Paketzentrum.

Beachte, dass die Docker-Version auf Synology etwas älter ist als die offizielle Docker-Version. In den meisten Fällen ist das in Ordnung. Es ist jedoch wichtig zu wissen, dass der Befehl `compose` daher einen Bindestrich zwischen `docker` und `compose` erfordert. In den folgenden Befehlen musst du also `docker compose` durch `docker-compose` ersetzen.

Um sicherzustellen, dass Docker ohne sudo ausgeführt werden kann, erstelle eine Docker-Gruppe und füge dich selbst hinzu:

```console
sudo synogroup --add docker
sudo chown root:docker /var/run/docker.sock
sudo synogroup --member docker $USER
```

(Angepasst von den [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) der offiziellen Docker-Dokumentation).
