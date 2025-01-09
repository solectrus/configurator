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
