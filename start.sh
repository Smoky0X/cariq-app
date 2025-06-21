#!/bin/bash

echo "🚗 Démarrage de CarIQ..."
echo "========================"

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "❌ Les dépendances ne sont pas installées."
    echo "📦 Installation en cours..."
    npm install
fi

# Démarrer l'application
echo "🚀 Lancement de l'application..."
npm run dev 