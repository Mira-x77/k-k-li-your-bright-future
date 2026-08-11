# Kékéli: Your Bright Future

Brief projet — Site web Stage Kékéli (pour Lovable)

1. Identité de l'organisation

Nom : Stage Kékéli

Signification : « Kékéli » signifie la lumière en langue éwé

Activité : structure de cours de répétition et d'accompagnement scolaire

Public cible : élèves de collège et de lycée

Localisation : Lomé, République Togolaise

Structure : fondée par deux Associés Fondateurs

Ton de marque suggéré par le nom : lumière, guidance, clarté, réussite scolaire — à exploiter visuellement (dorée/chaude ou lumineuse, sobre, rassurante pour parents et élèves)

2. Objectif du site

Le contrat prévoit un site vitrine et/ou transactionnel, cohérent visuellement avec une application mobile compagnon (même identité graphique, mêmes couleurs/logo).

3. Utilisateurs du site (3 profils à servir)

Élèves — trouver des cours, répétiteurs, s'inscrire

Parents — comprendre l'offre, payer les frais de scolarité, suivre le parcours de l'enfant

Répétiteurs/enseignants — présentation, éventuellement espace dédié

4. Fonctionnalités attendues (déduites du contrat)

Présentation de l'offre pédagogique (niveaux, matières, méthodes)

Section "affiches"/communication visuelle (le contrat mentionne la conception d'affiches — cohérence graphique à prévoir avec ces supports)

Espace de paiement des frais de scolarité — le contrat évoque explicitement le mobile money (MTN/Orange Money) comme moyen de paiement courant au Togo, avec une TAF (Taxe sur les Activités Financières, ~10%) applicable aux transactions mobile money — à anticiper dans le tunnel de paiement

Back-office/tableau de suivi pour les fondateurs (élèves, parents, répétiteurs, paiements — appelées "Données SK" dans le contrat, propriété exclusive de Stage Kékéli)

Formulaire de contact / prise de rendez-vous

Cohérence visuelle avec l'application mobile compagnon (à harmoniser si tu as déjà une charte graphique de ton appli)

5. Contraintes techniques/juridiques à respecter dans le build

Propriété : le code source et tous les éléments créés spécifiquement pour ce site appartiennent à Stage Kékéli dès livraison — donc le site doit être livrable proprement (export complet du code, pas de dépendance verrouillée à un compte personnel)

Comptes techniques : nom de domaine, hébergement, dépôt de code doivent être enregistrables au nom de Stage Kékéli (prévoir la structure du projet Lovable pour un transfert de propriété facile)

Données : les données des élèves/parents/répétiteurs et des paiements doivent rester exportables à tout moment dans un format exploitable (prévoir export CSV/JSON dès la conception du back-office)

Sécurité de base : le contrat garantit une "sécurité de base" et "bon fonctionnement" — authentification correcte si compte utilisateur, HTTPS, protection des données de paiement

6. Ce qui manque encore (à demander aux fondateurs avant de finaliser le prompt Lovable)

Logo et charte graphique existants (couleurs, typographie) — le contrat dit que le site doit être visuellement cohérent avec l'appli, donc il faut la charte de l'appli en référence

Liste précise des matières/niveaux enseignés

Tarifs et grille de frais de scolarité

Photos/contenus réels (le contrat indique que Stage Kékéli doit fournir "en temps utile les contenus, textes, images")

Ton de la marque : plutôt institutionnel/rassurant pour parents, ou dynamique/jeune pour élèves — probablement les deux, à équilibrer par section

7. Suggestion de structure de pages

Accueil (proposition de valeur, "la lumière qui guide vers la réussite")

Notre offre (matières, niveaux, méthodes pédagogiques)

Nos répétiteurs/enseignants

Tarifs & inscription

Espace paiement (mobile money)

Contact / Localisation (Lomé)

Espace parent (suivi, éventuellement connecté à l'appli)

Ce brief est basé sur les éléments explicitement présents dans le contrat de prestation signé avec Stage Kékéli. Les annexes A (cahier des charges détaillé) et les assets de marque doivent compléter ce document avant de lancer le prompt final sur Lovable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b422a2b0-4716-4b95-9541-a6bd9b25dd08).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
