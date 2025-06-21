# 🔧 Guide de Dépannage - CarIQ

Ce guide vous aide à résoudre les problèmes courants lors de l'installation et de l'utilisation de CarIQ.

## ❌ Problèmes d'Installation

### 1. "command not found: npm"

**Problème** : npm n'est pas installé sur votre système.

**Solution** :
```bash
# Sur macOS avec Homebrew
brew install node

# Sur Ubuntu/Debian
sudo apt update
sudo apt install nodejs npm

# Sur Windows
# Téléchargez et installez Node.js depuis https://nodejs.org/
```

### 2. "command not found: git"

**Problème** : Git n'est pas installé.

**Solution** :
```bash
# Sur macOS
xcode-select --install

# Sur Ubuntu/Debian
sudo apt install git

# Sur Windows
# Téléchargez Git depuis https://git-scm.com/
```

### 3. Erreurs de permissions

**Problème** : Erreurs de permissions lors de l'installation.

**Solution** :
```bash
# Nettoyer le cache npm
npm cache clean --force

# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
```

### 4. Erreurs de dépendances

**Problème** : Conflits de versions ou dépendances manquantes.

**Solution** :
```bash
# Supprimer tout et réinstaller
rm -rf node_modules package-lock.json
npm install --force

# Ou utiliser une version spécifique de Node.js
nvm install 18
nvm use 18
npm install
```

## 🚀 Problèmes de Démarrage

### 1. "Port 3000 is already in use"

**Problème** : Le port 3000 est déjà utilisé par une autre application.

**Solution** :
```bash
# Trouver le processus qui utilise le port
lsof -i :3000

# Tuer le processus
kill -9 <PID>

# Ou utiliser un autre port
npm run dev -- -p 3001
```

### 2. "Module not found" errors

**Problème** : Modules manquants ou mal installés.

**Solution** :
```bash
# Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# Vérifier les versions
npm list
```

### 3. Erreurs TypeScript

**Problème** : Erreurs de compilation TypeScript.

**Solution** :
```bash
# Nettoyer le cache TypeScript
rm -rf .next
npm run build

# Ou ignorer les erreurs TypeScript temporairement
# Ajoutez dans next.config.mjs :
# typescript: { ignoreBuildErrors: true }
```

## 🌐 Problèmes de Navigateur

### 1. Page blanche

**Problème** : L'application se charge mais affiche une page blanche.

**Solution** :
- Ouvrez les outils de développement (F12)
- Vérifiez la console pour les erreurs JavaScript
- Vérifiez l'onglet Network pour les requêtes échouées
- Essayez de vider le cache du navigateur

### 2. Styles manquants

**Problème** : Les styles CSS ne se chargent pas.

**Solution** :
```bash
# Reconstruire les styles
npm run build
npm run dev
```

### 3. Images non affichées

**Problème** : Les images des voitures ne s'affichent pas.

**Solution** :
- Vérifiez que les images existent dans le dossier `public/`
- Utilisez des images de placeholder si nécessaire
- Vérifiez la configuration Next.js pour les images

## 🔧 Problèmes de Performance

### 1. Application lente

**Problème** : L'application est lente à charger ou à utiliser.

**Solution** :
```bash
# Mode production pour de meilleures performances
npm run build
npm start

# Vérifier la taille du bundle
npm run build
# Regardez la taille dans .next/static/
```

### 2. Mémoire insuffisante

**Problème** : Erreurs de mémoire lors du build.

**Solution** :
```bash
# Augmenter la mémoire Node.js
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

## 📱 Problèmes Mobile

### 1. Interface non responsive

**Problème** : L'interface ne s'adapte pas aux écrans mobiles.

**Solution** :
- Vérifiez que Tailwind CSS est bien configuré
- Testez avec les outils de développement du navigateur
- Vérifiez les classes CSS responsive

### 2. Problèmes de touch

**Problème** : Les interactions tactiles ne fonctionnent pas.

**Solution** :
- Vérifiez que les composants Radix UI sont bien configurés
- Testez sur un vrai appareil mobile
- Vérifiez les événements touch

## 🗄️ Problèmes de Données

### 1. Données manquantes

**Problème** : Les voitures ne s'affichent pas.

**Solution** :
- Vérifiez le fichier `data/extended-cars.ts`
- Assurez-vous que les données sont bien exportées
- Vérifiez les imports dans les composants

### 2. Filtres qui ne fonctionnent pas

**Problème** : Les filtres de recherche ne filtrent pas correctement.

**Solution** :
- Vérifiez la logique de filtrage dans `app/page.tsx`
- Vérifiez les types TypeScript
- Testez avec des données de test

## 🔐 Problèmes d'Authentification

### 1. Erreurs de localStorage

**Problème** : Erreurs liées au localStorage.

**Solution** :
- Vérifiez que le navigateur supporte localStorage
- Testez en mode navigation privée
- Ajoutez des vérifications de support

### 2. Favoris qui disparaissent

**Problème** : Les favoris ne sont pas sauvegardés.

**Solution** :
- Vérifiez la logique de sauvegarde dans `app/page.tsx`
- Vérifiez les permissions du navigateur
- Testez avec des données de test

## 🚀 Problèmes de Déploiement

### 1. Erreurs de build sur Vercel

**Problème** : Le build échoue sur Vercel.

**Solution** :
- Vérifiez les logs de build sur Vercel
- Testez le build localement : `npm run build`
- Vérifiez les variables d'environnement

### 2. Images non optimisées

**Problème** : Les images ne se chargent pas en production.

**Solution** :
- Configurez les domaines autorisés dans `next.config.mjs`
- Utilisez des images optimisées
- Vérifiez la configuration des images Next.js

## 📞 Support

Si vous ne trouvez pas la solution à votre problème :

1. **Vérifiez les logs** : Console du navigateur et terminal
2. **Recherchez l'erreur** : Copiez le message d'erreur exact
3. **Vérifiez la version** : Node.js, npm, Next.js
4. **Testez sur un autre navigateur** : Chrome, Firefox, Safari
5. **Redémarrez** : Terminal, navigateur, ordinateur

## 🛠️ Commandes Utiles

```bash
# Vérifier les versions
node --version
npm --version

# Nettoyer et réinstaller
rm -rf node_modules package-lock.json
npm install

# Build de production
npm run build

# Lancer en production
npm start

# Vérifier les erreurs TypeScript
npx tsc --noEmit

# Linter
npm run lint

# Tests (si configurés)
npm test
```

---

**💡 Conseil** : La plupart des problèmes peuvent être résolus en redémarrant l'application et en nettoyant le cache ! 