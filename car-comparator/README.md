# CarIQ - Comparateur de Voitures Intelligent

CarIQ est une application web moderne de comparaison de voitures propulsée par l'intelligence artificielle. Elle aide les utilisateurs à trouver la voiture parfaite selon leurs besoins, budget et préférences.

## 🚀 Fonctionnalités

### 🔍 Recherche et Filtrage Avancé
- **Recherche textuelle** : Recherchez par marque, modèle
- **Filtres multiples** : Catégorie, budget, carburant, usage
- **Critères personnalisés** : Priorité (Économie, Performance, Confort, Écologie)
- **Filtres avancés** : Fiabilité, sécurité, performance
- **Options spéciales** : Favoris uniquement, électriques, nouvelles voitures

### 🏆 Système de Scoring IA
- **Algorithme intelligent** : Analyse 15+ critères pour chaque voiture
- **Score personnalisé** : Basé sur vos préférences et critères
- **Recommandations** : Top 3 voitures adaptées à vos besoins
- **Comparaison détaillée** : Jusqu'à 4 voitures simultanément

### 💾 Gestion Personnelle
- **Favoris** : Sauvegarde de vos voitures préférées
- **Historique** : Suivi de vos consultations récentes
- **Tableau de bord** : Statistiques et activité personnalisées
- **Partage** : Partagez vos découvertes

### 🤖 Assistant IA
- **Chatbot intelligent** : Questions et conseils personnalisés
- **Recommandations** : Suggestions basées sur vos préférences
- **Analyse détaillée** : Explications des scores et choix

## 🛠️ Technologies Utilisées

- **Frontend** : Next.js 15, React 19, TypeScript
- **UI/UX** : Tailwind CSS, Radix UI, Lucide Icons
- **État** : React Hooks, localStorage
- **Déploiement** : Vercel (recommandé)

## 📦 Installation

### Prérequis
- Node.js 18+ 
- pnpm (recommandé) ou npm

### Étapes d'installation

1. **Cloner le repository**
```bash
git clone <repository-url>
cd car-comparator
```

2. **Installer les dépendances**
```bash
pnpm install
# ou
npm install
```

3. **Lancer en mode développement**
```bash
pnpm dev
# ou
npm run dev
```

4. **Ouvrir l'application**
```
http://localhost:3000
```

## 🏗️ Structure du Projet

```
car-comparator/
├── app/                    # Pages Next.js (App Router)
│   ├── dashboard/         # Tableau de bord utilisateur
│   ├── globals.css        # Styles globaux
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Page d'accueil
├── components/            # Composants React
│   ├── ai/               # Assistant IA
│   ├── auth/             # Authentification
│   ├── dashboard/        # Composants tableau de bord
│   ├── dealers/          # Localisation concessionnaires
│   ├── financing/        # Calculateur de financement
│   ├── layout/           # Composants de mise en page
│   ├── pricing/          # Plans tarifaires
│   ├── reviews/          # Avis utilisateurs
│   ├── ui/               # Composants UI réutilisables
│   ├── car-card.tsx      # Carte de voiture
│   ├── car-comparison.tsx # Comparaison de voitures
│   └── search-filters.tsx # Filtres de recherche
├── data/                 # Données statiques
│   ├── cars.ts           # Données des voitures
│   └── extended-cars.ts  # Données étendues
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et configuration
├── types/                # Types TypeScript
├── utils/                # Fonctions utilitaires
└── public/               # Assets statiques
```

## 🎯 Utilisation

### 1. Page d'Accueil
- **Recherche rapide** : Utilisez la barre de recherche
- **Filtres de base** : Budget, catégorie, carburant
- **Top recommandations** : Voitures IA sélectionnées pour vous

### 2. Onglet Recherche
- **Filtres avancés** : Cliquez sur "Avancé" pour plus d'options
- **Tri personnalisé** : Par score IA, prix, ou consommation
- **Affichage grille** : Visualisez toutes les voitures disponibles

### 3. Onglet Comparaison
- **Sélection** : Ajoutez jusqu'à 4 voitures à comparer
- **Tableau détaillé** : Comparaison côte à côte
- **Résumé** : Meilleur choix et statistiques

### 4. Onglet Recommandations IA
- **Analyse personnalisée** : Basée sur vos critères
- **Explications** : Pourquoi ces voitures vous conviennent
- **Scores détaillés** : Analyse de chaque critère

### 5. Tableau de Bord
- **Statistiques** : Vue d'ensemble de votre activité
- **Favoris** : Gérez vos voitures préférées
- **Historique** : Consultez vos recherches récentes
- **Paramètres** : Personnalisez votre expérience

## 🔧 Configuration

### Variables d'Environnement
Créez un fichier `.env.local` :

```env
# Base de données (optionnel)
DATABASE_URL=your_database_url

# Authentification (optionnel)
NEXTAUTH_SECRET=your_secret
NEXTAUTH_URL=http://localhost:3000

# API Keys (optionnel)
OPENAI_API_KEY=your_openai_key
```

### Personnalisation des Données
Modifiez `data/extended-cars.ts` pour ajouter vos propres voitures :

```typescript
export const cars: Car[] = [
  {
    id: "unique-id",
    brand: "Marque",
    model: "Modèle",
    year: 2024,
    price: 25000,
    fuelType: "Essence",
    consumption: 6.0,
    power: 120,
    seats: 5,
    category: "Compacte",
    reliability: 4.5,
    safety: 4.8,
    comfort: 4.2,
    image: "/path/to/image.jpg",
    features: ["Climatisation", "GPS"],
    pros: ["Économique", "Fiable"],
    cons: ["Espace limité"]
  }
]
```

## 🚀 Déploiement

### Vercel (Recommandé)
1. Connectez votre repository GitHub à Vercel
2. Configurez les variables d'environnement
3. Déployez automatiquement

### Autres Plateformes
- **Netlify** : Compatible avec Next.js
- **Railway** : Déploiement simple
- **Docker** : Containerisation possible

## 🤝 Contribution

1. Fork le projet
2. Créez une branche feature (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 🆘 Support

- **Documentation** : Consultez ce README
- **Issues** : Ouvrez une issue sur GitHub
- **Discussions** : Utilisez les discussions GitHub

## 🎉 Remerciements

- **Radix UI** : Composants accessibles
- **Tailwind CSS** : Framework CSS utilitaire
- **Lucide Icons** : Icônes modernes
- **Next.js** : Framework React

---

**CarIQ** - Trouvez la voiture parfaite avec l'intelligence artificielle ! 🚗✨ 