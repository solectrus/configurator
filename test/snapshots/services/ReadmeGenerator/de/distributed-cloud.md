# Installationsanleitung

Dies ist dein persönlicher Leitfaden zur Installation des entfernten Teils von SOLECTRUS auf deinem Cloud-Server, basierend auf deinen Antworten. Er besteht aus drei Teilen:

- Die `README.md` Datei, die du gerade liest
- Die `compose.yml` Datei, mit der die Dienste definiert werden, die in Docker-Containern laufen sollen
- Die `.env` Datei, die die Umgebungsvariablen für die Docker-Container enthält

Du kannst zwischen diesen Teilen über die obigen Links wechseln. Die `compose.yml` und `.env` Dateien können in die Zwischenablage kopiert werden. Das wirst du später brauchen.

**BITTE BEACHTEN:** Der Konfigurator ist in intensiver Entwicklung und beinhaltet die Installation von Beta-Versionen der Docker-Images. Bitte melde alle Probleme, die du über GitHub unter [https://github.com/solectrus/hosting/issues](https://github.com/solectrus/hosting/issues) findest.

Lies jetzt weiter, um die Installation auf deinem Linux-Rechner durchzuführen.

## Voraussetzungen

Diese Anleitung geht davon aus, dass du einen Cloud-Server mit Linux hast. Falls nicht, ist Hetzner Cloud eine gute Wahl, die in dieser Anleitung verwendet wird. Hetzner ist ein deutscher Cloud-Anbieter mit einem guten Preis-Leistungs-Verhältnis. Natürlich kannst du auch jeden anderen Cloud-Anbieter mit SSH-Zugang nutzen.

### Bestelle deinen Server bei Hetzner

Zuerst registriere dich bei Hetzner:
[https://hetzner.cloud/?ref=NggV8HU9FqCz](https://hetzner.cloud/?ref=NggV8HU9FqCz)

Dies ist ein Empfehlungslink, der dir (und mir) einen Rabatt von 20 € gibt.

Dann bestelle deinen Server:

- Gehe zu [https://console.hetzner.cloud/projects](https://console.hetzner.cloud/projects)
- Wähle `Neues Projekt`, nenne es _SOLECTRUS_ und öffne das Projekt
- Wähle `Server hinzufügen`
  - `Standort`: Wähle einen Standort in deiner Nähe
  - `Image`: Wähle `Apps`, dann `Docker CE`
  - `Typ`: Die kleinste Maschine reicht aus, also wähle `Arm64` Architektur und dann `CAX11`
  - `Netzwerk`: Wähle `Public IPv4`
  - `SSH-Schlüssel`: Falls du bereits einen SSH-Schlüssel hast, kannst du ihn hier hinzufügen, um Probleme mit dem SSH-Passwort zu vermeiden. Andernfalls lass das Feld leer, um ein Passwort zu verwenden, das für dich generiert wird
- Bestelle (für `4,51 €` pro Monat)

Notiere die IPv4-Adresse deines Servers, du wirst sie später benötigen.

Logge dich via SSH in deine brandneue Linux-Maschine ein, indem du die angegebene IPv4-Adresse verwendest:

```console
ssh root@<deine-ip-adresse>
```

Falls du einen SSH-Schlüssel verwendet hast, wirst du direkt eingeloggt. Andernfalls sendet Hetzner dir eine E-Mail mit dem Passwort. Verwende dieses Passwort, um dich einzuloggen und folge den Schritten, um das Passwort sofort zu ändern.

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

[http://42.42.42.42:3000](http://42.42.42.42:3000)

Deine InfluxDB-Instanz ist über die folgende URL erreichbar:

[http://42.42.42.42:8086](http://42.42.42.42:8086)

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
