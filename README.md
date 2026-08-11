# La Voie de l'Excellence — Classroom V3

Espace numérique de la classe de **3e Électronique · 2026–2027**.

## V3 — vraie architecture Classroom

La V3 est organisée autour de :

- 🔐 connexion / inscription avec Supabase Auth ;
- 👥 profils et rôles `student`, `teacher`, `admin` ;
- 📚 matières et cours ;
- 📝 devoirs et dates limites ;
- 📁 ressources et documents ;
- 💬 discussion partagée en temps réel avec Supabase Realtime ;
- 📢 annonces ;
- 🔔 table de notifications prête ;
- 🤖 ChatBENGZ ;
- 📱 interface responsive ;
- 🛡️ Row Level Security (RLS) côté base de données.

## Fichiers V3

- `classroom.html` — tableau de bord authentifié
- `classroom.js` — chargement des données + chat temps réel
- `auth.html` — connexion / inscription
- `auth.js` — authentification
- `supabase-config.js` — URL + clé anon publique
- `schema.sql` — tables, trigger, RLS et données initiales
- `v3.css` — styles de la V3
- `index.html` — vitrine / accueil
- `groupe.html` — ancienne discussion locale conservée
- `chatGPT.html` / `chatgpt.js` — ChatBENGZ
- `admin.jpg` — profil de Salomon BENGZ
- `logo.png` — identité visuelle

## Activation du backend

Le code V3 est **backend-ready**. Pour activer les comptes et le chat partagé :

1. Créer un projet Supabase.
2. Ouvrir **SQL Editor**.
3. Exécuter `schema.sql` en entier.
4. Copier l'URL du projet et la clé **anon/public** dans `supabase-config.js`.
5. Ne jamais placer la clé `service_role` dans le navigateur.
6. Ouvrir `auth.html` puis créer les premiers comptes.

Une fois configuré, `classroom.html` redirige automatiquement les visiteurs non authentifiés vers `auth.html` et le chat utilise les changements temps réel de la table `messages`.

## Sécurité

Les données sensibles ne sont pas stockées dans le code client. Les permissions principales sont appliquées par les politiques RLS de Supabase. Le rôle d'un compte ne doit pas être donné depuis le navigateur : il doit être attribué côté base de données par l'administrateur.

## Prochaine évolution

- panneau d'administration ;
- création/modification de cours et devoirs depuis le site ;
- upload de fichiers via Supabase Storage ;
- remise de devoirs ;
- notifications réelles ;
- liste des membres et présence ;
- modération du chat ;
- réinitialisation de mot de passe ;
- amélioration de ChatBENGZ avec une API IA sécurisée côté serveur.

## Identité

**La Voie de l'Excellence**  
**3e Électronique · 2026–2027**  
Administrateur : **Salomon BENGZ**
