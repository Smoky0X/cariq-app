# 🚀 Installation Rapide - CarIQ

## Option 1 : Installation Automatique (Recommandée)

1. **Ouvrez le Terminal** dans le dossier du projet
2. **Lancez le script d'installation** :
   ```bash
   ./install.sh
   ```
3. **Démarrez l'application** :
   ```bash
   ./start.sh
   ```

## Option 2 : Installation Manuelle

### Étape 1 : Installer Node.js

**Sur macOS :**
```bash
# Installer Homebrew (si pas déjà installé)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Installer Node.js
brew install node
```

**Sur Windows :**
- Téléchargez Node.js depuis [nodejs.org](https://nodejs.org/)
- Installez en suivant les instructions

**Sur Linux :**
```bash
sudo apt update
sudo apt install nodejs npm
```

### Étape 2 : Vérifier l'installation

```bash
node --version  # Doit afficher v18.x.x ou plus
npm --version   # Doit afficher 9.x.x ou plus
```

### Étape 3 : Installer les dépendances

```bash
npm install
```

### Étape 4 : Démarrer l'application

```bash
npm run dev
```

### Étape 5 : Ouvrir dans le navigateur

```
http://localhost:3000
```

## ✅ Vérification

Si tout fonctionne correctement, vous devriez voir :
- ✅ L'application se charge sans erreur
- ✅ La page d'accueil s'affiche avec les voitures
- ✅ Les filtres fonctionnent
- ✅ L'assistant IA répond

## ❌ En cas de problème

1. **Vérifiez les versions** :
   ```bash
   node --version
   npm --version
   ```

2. **Nettoyez et réinstallez** :
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Consultez le guide de dépannage** : `TROUBLESHOOTING.md`

## 🎯 Prochaines étapes

Une fois l'application lancée :
1. Explorez les différentes fonctionnalités
2. Testez la recherche et les filtres
3. Comparez quelques voitures
4. Essayez l'assistant IA

---

**💡 Astuce** : Gardez le terminal ouvert pour voir les logs en temps réel ! 