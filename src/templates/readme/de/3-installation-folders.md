## Erstelle Ordner für Konfigurations- und Datenspeicherung

SOLECTRUS benötigt einen Ordner, um die Konfigurationsdateien und Docker-Volumes für die Datenbanken zu speichern. Dieser Ordner muss auf deinem Linux-Rechner erstellt werden, bevor du die Docker-Container startest. Wir wählen `~/solectrus` als Basisordner für diesen Zweck.

Erstelle zuerst die benötigten Ordner mit den folgenden Befehlen:

```console
cd ~
mkdir -p solectrus
cd solectrus

# Erstelle Ordner für Docker-Volumes
mkdir %{folders}
```

Passe den letzten Befehl entsprechend an, um die spezifischen Unterordner zu erstellen, die du für die Docker-Volumes benötigst.
