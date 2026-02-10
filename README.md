# Carambar & co - API

API versionnée dédiée à la livraison d’une mini-application de blagues pour la formation CDA Wild Code School. Elle expose tout ce qu’il faut pour que le front GitHub Pages affiche une blague aléatoire ou que l’on gère le catalogue via Postman.

## Stack
- Node.js 18+ (via `pnpm`)
- Express 5
- Sequelize (avec SQLite en local)
- Swagger UI + Swagger JSDoc
- Déploiement AWS (API accessible à `https://api.x402librarian.xyz`)

## Installation locale
1. Cloner le dépôt et se placer dans `cbr-back`
2. `pnpm install`
3. `cp .env.example .env` (si un jour des variables sont ajoutées)
4. `pnpm start` - démarre le serveur sur `http://localhost:3000`
   - Sequelize initialise la base SQLite et insère un jeu de blagues par défaut si elle est vide.

## Endpoints
- `GET /api/v1/blagues` - liste toutes les blagues triées par date de création descendante.
- `GET /api/v1/blagues/:id` - récupère la blague associée à l’identifiant.
- `GET /api/v1/blagues/random` - retourne une blague sélectionnée aléatoirement.
- `POST /api/v1/blagues` - crée une nouvelle blague (JSON avec `question` et `answer`).

### Exemple de requete
```
curl -X POST https://api.x402librarian.xyz/api/v1/blagues \
  -H "Content-Type: application/json" \
  -d '{"question":"Pourquoi le ciel est bleu ?","answer":"Parce que les schtroumpfs ont peint une partie de l arc en ciel"}'
```

### Considérations
- Si la base est vide, `GET /random` répondra `404`. En production, l’endpoint est servi par `https://api.x402librarian.xyz/api/v1/blagues/random`.
- Tous les contrôleurs propagent les erreurs au middleware Express pour une réponse uniforme.

## Documentation
- Swagger UI à `https://api.x402librarian.xyz/api-docs/`
- Définitions des schémas `Joke`, `JokeInput` et `ErrorResponse` incluses dans la doc OpenAPI 3.0.

## Déploiement
- L’API est déployée sur AWS (URL publique mentionnée ci-dessus).
- Lors du démarrage, Sequelize synchronise le modèle `Joke` et applique le dataset initial si besoin.
