# Installationsanleitung

Dies ist dein persönlicher Leitfaden zur Installation von SOLECTRUS auf deinem Rechner, basierend auf deinen Antworten. Er besteht aus drei Teilen:

- Die `README.md` Datei, die du gerade liest
- Die `compose.yaml` Datei, mit der die Dienste definiert werden, die in Docker-Containern laufen sollen
- Die `.env` Datei, die die Umgebungsvariablen für die Docker-Container enthält

Du kannst zwischen diesen Teilen über die obigen Links wechseln. Die `compose.yaml` und `.env` Dateien können in die Zwischenablage kopiert werden. Das wirst du später brauchen.

**BITTE BEACHTEN:** Dieser Konfigurator ist noch recht frisch. Bitte melde etwaige Probleme über GitHub unter [https://github.com/solectrus/configurator/issues](https://github.com/solectrus/configurator/issues).

Lies nun weiter, um die Installation auf deinem Linux-Rechner durchzuführen.

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

## Erstelle Ordner für Konfigurations- und Datenspeicherung

SOLECTRUS benötigt einen Ordner, um die Konfigurationsdateien und Docker-Volumes für die Datenbanken zu speichern. Dieser Ordner muss auf deinem Linux-Rechner erstellt werden, bevor du die Docker-Container startest. Wir wählen `~/solectrus` als Basisordner für diesen Zweck.

Erstelle zuerst die benötigten Ordner mit den folgenden Befehlen:

```console
cd ~
mkdir -p solectrus
cd solectrus

# Erstelle Ordner für Docker-Volumes
mkdir -p /volume1/docker/solectrus/redis /volume1/docker/solectrus/postgresql /volume1/docker/solectrus/influxdb
```

Passe den letzten Befehl entsprechend an, um die spezifischen Unterordner zu erstellen, die du für die Docker-Volumes benötigst.

## Füge Konfigurationsdateien hinzu

Die Konfiguration von SOLECTRUS besteht aus zwei Dateien: `compose.yaml` und `.env`. Die `compose.yaml` Datei enthält die Dienste, die in Docker-Containern gestartet werden. Die `.env` Datei enthält die Umgebungsvariablen für die Docker-Container.

Beide Dateien wurden basierend auf deinen Antworten für dich erstellt. Du findest sie über die obigen Links. Sie müssen auf deinen Linux-Rechner kopiert werden, wie in den folgenden Abschnitten beschrieben.

Die folgenden Schritte erklären, wie du die Dateien über die Zwischenablage auf deinen Linux-Rechner kopieren kannst. Alternativ kannst du auch andere Methoden wie `scp` oder ähnliches verwenden. Wichtig ist nur, dass die Dateien auf deinem Linux-Rechner ankommen und dort `.env` und `compose.yaml` heißen. Beachte dabei, dass `.env` mit einem Punkt beginnt, was je nach Betriebssystem dazu führen kann, dass die Datei standardmäßig als _versteckt_ gilt und somit ausgeblendet wird.

### Kopiere compose.yaml auf deinen Rechner

Kopiere zuerst deine persönliche `compose.yaml` Datei in die Zwischenablage, indem du die "Kopieren"-Schaltfläche drückst. Führe dann diesen Befehl auf deinem Linux-Rechner aus:

```console
cat > compose.yaml
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
total 40
drwxr-xr-x 5 root root 4096 Jan  9 17:01 .
drwx------ 7 root root 4096 Jan  9 16:59 ..
-rw-r--r-- 1 root root 6816 Jan  9 17:01 compose.yaml
-rw-r--r-- 1 root root 8428 Jan  9 17:01 .env
drwxr-xr-x 2 root root 4096 Jan  9 16:59 influxdb
drwxr-xr-x 2 root root 4096 Jan  9 16:59 postgresql
drwxr-xr-x 2 root root 4096 Jan  9 16:59 redis
```

## Starte die Docker-Container

Ok, jetzt hast du alles, um die Docker-Container im Hintergrund zu starten. Führe den folgenden Befehl in dem Ordner aus, in dem du die `.env` und `compose.yaml` Dateien gespeichert hast:

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

[http://192.168.108.42:3001](http://192.168.108.42:3001)

## Abschluss

Im Browser solltest du dich als Admin mit deinem gewählten Passwort einloggen. Ein Login ist erforderlich, um Einstellungen wie Energiepreise zu bearbeiten.

SOLECTRUS erfordert die Registrierung deiner Installation. Es gibt ein gelbes Banner oben auf der Seite, das dich durch den Registrierungsprozess führt.

SOLECTRUS enthält eine Auto-Update-Funktion durch die Verwendung von [Watchtower](https://containrrr.dev/watchtower/). Es aktualisiert automatisch alle Docker-Images, die in der `compose.yaml` Datei referenziert werden, und startet die Container bei Bedarf neu. Ein Update-Check wird alle 24 Stunden durchgeführt. Andere Docker-Container auf derselben Maschine werden von Watchtower **nicht** berührt.

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

SOLECTRUS ist auf finanzielle Unterstützung durch die Nutzer angewiesen. Sponsoren erhalten dafür Zugang zu exklusiven Funktionen. Weitere Informationen findest du auf der [Sponsoring-Seite](https://solectrus.de/sponsoring/).
