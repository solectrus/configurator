# Installationsanleitung

Dies ist dein persönlicher Leitfaden zur Installation von SOLECTRUS auf deinem Rechner, basierend auf deinen Antworten. Er besteht aus drei Teilen:

- Die `README.md` Datei, die du gerade liest
- Die `compose.yml` Datei, mit der die Dienste definiert werden, die in Docker-Containern laufen sollen
- Die `.env` Datei, die die Umgebungsvariablen für die Docker-Container enthält

Du kannst zwischen diesen Teilen über die obigen Links wechseln. Die `compose.yml` und `.env` Dateien können in die Zwischenablage kopiert werden. Das wirst du später brauchen.

**BITTE BEACHTEN:** Der Konfigurator ist in intensiver Entwicklung und beinhaltet die Installation von Beta-Versionen der Docker-Images. Bitte melde alle Probleme, die du über GitHub unter [https://github.com/solectrus/hosting/issues](https://github.com/solectrus/hosting/issues) findest.

Lies jetzt weiter, um die Installation auf deinem Linux-Rechner durchzuführen.

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

## Erstelle Ordner für Konfigurations- und Datenspeicherung

SOLECTRUS benötigt einen Ordner, um die Konfigurationsdateien und Docker-Volumes für die Datenbanken zu speichern. Dieser Ordner muss auf deinem Linux-Rechner erstellt werden, bevor du die Docker-Container startest. Wir wählen `~/solectrus` als Basisordner für diesen Zweck.

Erstelle zuerst die benötigten Ordner mit den folgenden Befehlen:

```console
cd ~
mkdir -p solectrus
cd solectrus

# Erstelle Ordner für Docker-Volumes
mkdir redis postgresql influxdb
```

Passe den letzten Befehl entsprechend an, um die spezifischen Unterordner zu erstellen, die du für die Docker-Volumes benötigst.

## Füge Konfigurationsdateien hinzu

Die Konfiguration von SOLECTRUS besteht aus zwei Dateien: `compose.yml` und `.env`. Die `compose.yml` Datei enthält die Dienste, die in Docker-Containern gestartet werden. Die `.env` Datei enthält die Umgebungsvariablen für die Docker-Container.

Beide Dateien wurden basierend auf deinen Antworten für dich erstellt. Du findest sie über die obigen Links. Sie müssen auf deinen Linux-Rechner kopiert werden, wie in den folgenden Abschnitten beschrieben.

Die folgenden Schritte erklären, wie du die Dateien über die Zwischenablage auf deinen Linux-Rechner kopieren kannst. Alternativ kannst du auch andere Methoden wie `scp` oder ähnliches verwenden. Wichtig ist nur, dass die Dateien auf deinem Linux-Rechner ankommen und dort `.env` und `compose.yml` heißen. Beachte dabei, dass `.env` mit einem Punkt beginnt, was je nach Betriebssystem dazu führen kann, dass die Datei standardmäßig als _versteckt_ gilt und somit ausgeblendet wird.

### Kopiere compose.yml auf deinen Rechner

Kopiere zuerst deine persönliche `compose.yml` Datei in die Zwischenablage, indem du die "Kopieren"-Schaltfläche drückst. Führe dann diesen Befehl auf deinem Linux-Rechner aus:

```console
cat > compose.yml
```

Du wirst eine neue leere Zeile im Terminal mit einem Cursor sehen. Jetzt füge den Inhalt aus der Zwischenablage mit `Strg+V` (auf macOS: `Cmd+V`) ein und speichere ihn, indem du `Strg+D` drückst.

Das mag etwas knifflig erscheinen, aber es ist der einfachste Weg, den Inhalt der Zwischenablage in eine Datei auf deinem Linux-Rechner zu kopieren, ohne auf zusätzliche Werkzeuge angewiesen zu sein. Wenn du eine bessere Methode kennst (z. B. über einen Texteditor), kannst du diese gerne verwenden.

Alternativ kannst du die "Download"-Schaltfläche verwenden. Dadurch kannst du die Datei herunterladen und dann über `scp` oder eine andere Dateiübertragungsmethode auf deinen Linux-Rechner hochladen.

### Kopiere .env auf deinen Rechner

Mache dasselbe für die `.env` Datei: Kopiere den Dateiinhalte in die Zwischenablage und führe diesen Befehl aus:

```console
cat > .env
```

Füge dann erneut die Zwischenablage mit `Strg+V` (auf macOS: `Cmd+V`) ein und speichere sie, indem du `Strg+D` drückst.

Überprüfe, ob die Dateien korrekt erstellt wurden, indem du den folgenden Befehl ausführst:

```console
ls -la
```

Du solltest die folgende Ausgabe sehen:

```console
total 24
drwxr-xr-x 2 root root 4096 Apr  7 09:42 ./
drwx------ 5 root root 4096 Apr  7 09:42 ../
-rw-r--r-- 1 root root 6018 Apr  7 09:42 compose.yml
-rw-r--r-- 1 root root 6032 Apr  7 09:42 .env
```

## Starte die Docker-Container

Ok, jetzt hast du alles, um die Docker-Container im Hintergrund zu starten. Führe den folgenden Befehl in dem Ordner aus, in dem du die `.env` und `compose.yml` Dateien gespeichert hast:

```console
docker compose up -d
```

Dieser Befehl lädt die Docker-Images herunter und startet die Container. Dies kann eine Weile dauern, abhängig von deiner Internetverbindung und der Leistung deines Rechners. Der erste Start kann einige Minuten dauern.

Überprüfe, ob alle Container ordnungsgemäß laufen, indem du den folgenden Befehl ausführst:

```console
docker compose ps
```

Das war's. Du hast SOLECTRUS erfolgreich auf deinem Rechner installiert!

## Öffne die App in deinem Browser

Du kannst jetzt die SOLECTRUS-App in deinem Browser öffnen, indem du zu dieser URL navigierst:

[http://[ip]:3000](http://[ip]:3000)

## Abschluss

Im Browser solltest du dich als Admin mit deinem gewählten Passwort einloggen. Ein Login ist erforderlich, um Einstellungen wie Energiepreise zu bearbeiten.

SOLECTRUS erfordert die Registrierung deiner Installation. Es gibt ein gelbes Banner oben auf der Seite, das dich durch den Registrierungsprozess führt.

SOLECTRUS enthält eine Auto-Update-Funktion durch die Verwendung von [WatchTower](https://containrrr.dev/watchtower/). Es aktualisiert automatisch alle Docker-Images, die in der `compose.yml` Datei referenziert werden, und startet die Container bei Bedarf neu. Ein Update-Check wird alle 24 Stunden durchgeführt. Andere Docker-Container auf derselben Maschine werden von WatchTower **nicht** berührt.

Wenn du die Docker-Images manuell aktualisieren möchtest, kannst du den folgenden Befehl ausführen:

```console
docker compose pull
docker compose up -d
```

Falls etwas schiefgeht, solltest du die Logs der Container überprüfen:

```console
docker compose logs -n 100 -f
```

Bei Fragen schau dir bitte das [Forum bei GitHub Discussions](https://github.com/orgs/solectrus/discussions) an. Bei einem Fehler öffne bitte ein Issue im [SOLECTRUS Repository](https://github.com/solectrus/solectrus/issues) auf GitHub.

## Unterstützung

Um die Entwicklung von SOLECTRUS zu unterstützen, überlege bitte, [eine Spende zu tätigen](https://ko-fi.com/ledermann) oder [Sponsor auf GitHub zu werden](https://github.com/sponsors/solectrus).
