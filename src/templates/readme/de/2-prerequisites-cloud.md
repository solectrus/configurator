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
