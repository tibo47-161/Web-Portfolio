# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden hier dokumentiert.

Das Format orientiert sich an [Keep a Changelog](https://keepachangelog.com/de/1.1.0/),
die Versionierung folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unveröffentlicht]

## [0.1.0] – 2026-09-14

Erste versionierte Fassung. Sie fasst den bisherigen Entwicklungsstand zusammen: 39 Commits seit 2024-08-27.

### Behoben

- resolve security vulnerabilities in dependencies

### Geändert

- remove node_modules from tracking and add .gitignore

### Dokumentation

- add professional README
- ADR und SCOPE Dokumentation ergänzt (additiv)

### Weitere Änderungen

- init RoteSeite.de
- init
- bild
- Webportfolio
- website
- init3
- init5
- init 6
- in it
- init(game fertig)
- s
- init db
- init game
- security: replace hardcoded DB passwords with environment variables - Replace password 'Tonnenkraft96' in server.js with process.env.DB_PASSWORD - Replace password 'password' in node.js with process.env.DB_PASSWORD - Add .env.example with DB_PASSWORD placeholder ACTION REQUIRED: Change your database password as it was publicly exposed.
- Add comprehensive test suite: unit, functional, regression, playwright tests

[Unveröffentlicht]: https://github.com/tib019/Web-Portfolio/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/tib019/Web-Portfolio/releases/tag/v0.1.0
