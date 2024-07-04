## Voraussetzungen

Neben einer Linux-Maschine mit einem 64-Bit-Betriebssystem und Kernel v4 oder höher, musst du **Docker** installiert und in Betrieb haben. Die folgenden Schritte führen dich durch den Installationsprozess.

Los geht's! Melde dich nun per SSH auf deinem Linux-Rechner an.

### Überprüfe dein Betriebssystem

Stelle zuerst sicher, dass du ein 64-Bit-Betriebssystem mit Kernel v4 oder höher hast. Überprüfe dein Betriebssystem und die Architektur, die wie folgt aussehen sollten:

```console
$ uname -a
Linux MyUbuntu 6.8.0-36-generic #36-Ubuntu SMP PREEMPT_DYNAMIC Mon Jun 10 10:49:14 UTC 2024 x86_64 x86_64 x86_64 GNU/Linux

$ dpkg --print-architecture
amd64
```

Der Kernel ist `v6` und somit optimal - `v4` oder `v5` funktionieren aber auch.

Die Architektur ist `amd64`, was bedeutet, dass du ein 64-Bit-Betriebssystem hast. `arm64` wäre eine weitere gängige Architektur für 64-Bit-Betriebssysteme.

Falls du ein 32-Bit-Betriebssystem hast, musst du hier stoppen und prüfen, wie du ein Upgrade durchführen kannst. Wenn die Architektur `armhf` ist, läuft bei dir ein 64-Bit-Kernel mit 32-Bit-Userland, was **nicht** funktionieren wird.

### Bereite Docker vor

Stelle sicher, dass Docker installiert und in Betrieb ist. Überprüfe zuerst deine Docker-Version:

```console
$ docker --version
Docker version 27.0.2, build 912c1dd

$ docker compose version
Docker Compose version v2.28.1
```

Eine ältere Version könnte auch funktionieren.

Falls du Docker noch nicht installiert hast, folge bitte den [offiziellen Anweisungen](https://docs.docker.com/engine/install/) zur Installation.

Vergiss nicht, deinen Benutzer zur `docker` Gruppe hinzuzufügen, damit du nicht für jeden Docker-Befehl `sudo` verwenden musst.

```console
sudo groupadd docker
sudo usermod -aG docker $USER
```

**Wichtig:** Melde dich ab und wieder an, damit deine Gruppenmitgliedschaft neu bewertet wird.

Weitere Informationen findest du in den [post-installation steps](https://docs.docker.com/engine/install/linux-postinstall/) der offiziellen Docker-Dokumentation.
