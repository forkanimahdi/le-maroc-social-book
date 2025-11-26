## Le Maroc Social 2030 — Guide fonctionnel (Client)

Ce document présente de façon synthétique l’expérience complète proposée par la plateforme « Le Maroc Social 2030 ». Il a vocation à servir de référence pour les équipes métiers et partenaires.

---

### 1. Vision générale

La plateforme se structure autour de trois piliers :

1. **Mobilisation citoyenne** : collecte d’idées, inscriptions Think Tank, participation à l’événement de lancement, abonnement à la newsletter.
2. **Relation directe avec Oumaima** : mise en relation via la boîte à idées, la section « Contact » et la gestion des messages entrants.
3. **Pilotage & suivi** : dashboard administrateur, statistiques consolidées, processus d’approbation et envoi de communications (newsletters, confirmations, rejets, etc.).

---

### 2. Composants front-office

| Module | Description | Points clés |
|--------|-------------|-------------|
| **Hero & Navigation** | Accueil du site, call-to-action vers le livre, les groupes, l’événement de lancement. | – Navigation fluide « one-page » <br> – Ouverture d’un modal pour la réservation à l’événement |
| **Livre & Extraits** | Présentation du livre, onglets colorés (Présentation / Extraits / Messages clés). | – Respect des codes royaux (Rouge, Vert, Or) <br> – Téléchargement du résumé exécutif |
| **Author / Biographie** | Biographie d’Oumaima Mhijir + carrousel photo. | – Affichage des réseaux officiels : Facebook, Instagram, LinkedIn, Email <br> – Portfolio téléchargeable |
| **Think Tank & Groupes** | Formulaire d’inscription aux groupes de travail (Jeunesse, Femmes, etc.). | – Travail 100 % Inertia useForm <br> – Emails automatiques (accusé de réception, approbation) |
| **Boîte à idées (IdeasBox)** | Collecte d’idées citoyennes (nom, rôle, email, idée). | – Formulaire accessible sur la home <br> – Appropriation « LinkedIn style » côté front |
| **Podcast & Conversations sociales** | Player audio + preview YouTube, lien Spotify. | – Barre de progression dynamique <br> – Lien vers la chaîne officielle YouTube d’Oumaima |
| **Newsletter** | Formulaire d’inscription à la newsletter et export CSV. | – Validation anti emails temporaires <br> – Lien de désabonnement (token unique) |
| **Contact direct** | Section « Contactez-moi » avant la newsletter. | – Formulaire complet (nom, email, rôle, sujet, message) <br> – Envoi direct vers l’espace admin Messages |

---

### 3. Composants back-office (admin)

| Page | Contenu & fonctionnalités |
|------|---------------------------|
| **Dashboard Admin** (`/admin`) | Vue 360° : cartes rouges/vertes, quick actions, graphique de distribution, alertes, activité récente, feuille de route, suivi newsletter. |
| **Idées** | Liste complète, édition inline, approbation/rejet/suppression, envoi automatique des emails d’approbation. |
| **Think Tank** | Gestion des candidatures, filtres front, approbation avec envoi du lien WhatsApp, statut « rejeté », suppression. |
| **Participants événement** | Workflow similaire (approve/reject), envoi d’emails (confirmation, refus). |
| **Messages** | Interface pour lire les messages entrants, répondre directement depuis l’admin (envoi d’un email personnalisé, traçabilité des réponses). |
| **Newsletter** | Composer / envoyer des campagnes (jobs en file d’attente), export CSV, activation/désactivation d’abonnés, historique consultable via modal preview. |
| **Contenu & Biographie** | Gestion des contenus statiques (images, textes) via Inertia et useForm. |

---

### 4. Expérience email

Tous les emails partagent :

* Ton « je » (communication personnelle d’Oumaima).
* Signature commune : logo `public/assets/logo.png`, titre « Social Entrepreneur, Serving Global Communities ».
* Codes couleurs royaux (dégradés rouge/vert/or).
* Versions existantes : confirmation / approbation / rejet pour l’événement, Think Tank, idées, résumés exécutifs, newsletter, réponse contact.

---

### 5. Architecture & flux

1. **Inertia + React** pour tout le front (aucun appel REST manuel, toutes les mutations passent par `useForm`).
2. **Routes principaux** (extraits) :
   * `POST /ideas`, `/groups`, `/event-participants`, `/subscribers`, `/contact`
   * `POST /admin/.../approve|reject|delete`
   * `POST /admin/newsletter/send` (dispatch vers `SendNewsletterJob`)
   * `GET /admin/messages`, `POST /admin/messages/{id}/reply`
   * `GET /newsletter/unsubscribe/{token}`
3. **Jobs & Mails** :
   * `SendNewsletterJob` (filtre les abonnés désinscrits)
   * `EventRegistrationMail`, `EventApprovalMail`, `EventRejectionMail`
   * `ThinkTankRegistration/Approval`, `IdeaApprovalMail`, `NewsletterMail`, `ContactReplyMail`
4. **Tables clés** :
   * `ideas`, `group_signups`, `event_participants`, `subscribers` (token de désinscription), `contact_messages`, `newsletters`.

---

### 6. Style & design system

* Base Tailwind (Fond `bg-cream` côté public, **fond blanc** coté dashboard).
* Couleurs custom dans `:root` : `--royal-red`, `--royal-green`, `--gold`.
* Cards rouges/vertes sur le dashboard pour respecter la charte.
* Animations légères (hover, transitions).
* Images optimisées (lazy loading pour la galerie).

---

### 7. Check-list de démo

1. **Home** : test navigation ancrée (#livre, #groupes, #contact, #newsletter).
2. **Contact** : soumettre un message et vérifier sa présence dans l’admin.
3. **Boîte à idées** : soumission puis approbation + vérification email.
4. **Think Tank / Événement** : simuler un flux complet (inscription, approbation, email, suppression).
5. **Newsletter** : inscription, envoi d’une campagne, désabonnement via lien.
6. **Dashboard admin** : vérifier l’affichage des métriques, des quick actions et des alertes.

---

### 8. Ressources & maintenance

* **Queue** : lancer `php artisan queue:work` pour l’envoi des newsletters.
* **Migrations récentes** :
  * `2025_11_26_000200_create_contact_messages_table`
  * `2025_11_26_000300_add_unsubscribe_fields_to_subscribers_table`
* **Fichiers clés** :
  * `resources/js/pages` (Home, Dashboard, admin pages)
  * `resources/views/emails/*`
  * `app/Http/Controllers/*` (coté public + admin + newsletter + contact)
  * `app/Jobs/SendNewsletterJob.php`
  * `app/Mail/*`

---

Pour toute question ou évolution, contacter l’équipe produit ou Oumaima Mhijir (mhijiroum@gmail.com). Ce document peut évoluer au fil des versions. Bonne prise en main ! ✅


