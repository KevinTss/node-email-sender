# Automatic email script

## Commencer

Voici un script écrit en Node (JavaScript) qui envoi automatiquement des emails à la liste de député (le fichier au formet CSV nommé `listing-deputes-senateurs-FR.csv`).

Pour utiliser ce script, il vous faut suivre certaines procédures:

- Télécharger [NodeJS](https://nodejs.org/en/download/) sur votre machine, ce qui vous permettra d'executer le scripts. Choisissez la version `LTS` qui convient à votre machine.

- Créer un compte [mailjet](https://www.mailjet.com/) gratuit. Il s'agit du service que ce script utilise pour envoyer les emails.

- Une fois connecter à votre compte mailjet, cliquer sur votre avatar et aller dans `Account Settings` > `Master API Key Management`.

- Une fois sur cette page (qui devrait avoir un URL comme ceci: `account/api_keys`): Vous trouverez une `API_KEY` et une `API_SECRET` qui vous seront utile pour la suite. Gardez donc cet onglet ouvert.

- Si vous lisez ceci, c'est que vous êtes déjà sur la page [Github du code](https://github.com/KevinTss/node-email-sender) et donc vous pouvez télécharger le code en cliquant sur le bouton vert `Code` et ensuite `Download ZIP`.

- Lorsque vous avez télécharger le code sur votre machine dézippé le car vous devrez faire quelques modifications dedans.

- Vous devriez avoir un fichier qui s'appelle `index.js` dans lequel ce trouvent les infos à modifier. (Je vous conseil de télécharger un outil plus agréable pour lire ce fichier qu'un lecteur de texte classique car vous aurez des couleurs et les numéro de lignes ce qui vous rendra la tâches plus facile. Je conseil d'utiliser [VSCode](https://code.visualstudio.com/download) qui est gratuit)

- Ouvrez le fichier (le `index.js`) avec VSCode ou le programme de votre choix et modifier les valeurs des champs tout en haut du script.

|                         | Nom de variable | Explication                                                                |
| ----------------------- | --------------- | -------------------------------------------------------------------------- |
| Votre nom               | `SENDER_NAME`   | Le nom de la personne qui envoie le mail (dans le sujet et au bas du mail) |
| L'email de l'expéditeur | `SENDER_EMAIL`  |                                                                            |
