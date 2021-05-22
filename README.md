# Automatic email script

## Commencer

Voici un script écrit en Node (JavaScript) qui envoi automatiquement des emails à la liste de député (le fichier au formet CSV nommé `listing-deputes-senateurs-FR.csv`).

Pour utiliser ce script, il vous faut suivre certaines procédures:

- Télécharger [NodeJS](https://nodejs.org/en/download/) sur votre machine, ce qui vous permettra d'executer le scripts. Choisissez la version `LTS` qui convient à votre machine.

- Créer un compte [mailjet](https://www.mailjet.com/) gratuit. Il s'agit du service que ce script utilise pour envoyer les emails.

- Une fois connecter à votre compte mailjet, cliquer sur votre avatar et aller dans `Account Settings` > `Master API Key Management`.

- Une fois sur cette page (qui devrait avoir un URL comme ceci: `account/api_keys`): Vous trouverez une `API_KEY` et une `API_SECRET` qui vous seront utile pour la suite. Gardez donc cet onglet ouvert.

- Si vous lisez ceci, c'est que vous êtes déjà sur la page [Github du code](https://github.com/KevinTss/node-email-sender) et donc vous pouvez télécharger le code en cliquant sur le bouton vert `Code` et ensuite `Download ZIP`.

- Lorsque vous avez télécharger le code sur votre machine, dézippé le. Vous devrez ensuite faire quelques modifications dedans.

- Vous devez avoir un fichier qui s'appelle `index.js` dans lequel ce trouvent le script à modifier. (Je vous conseil de télécharger un outil plus agréable pour lire ce fichier plutôt qu'un lecteur de texte classique car vous aurez des couleurs et des numéro de lignes ce qui vous rendra la tâches plus facile. Je conseil d'utiliser [VSCode](https://code.visualstudio.com/download) qui est gratuit)

- Ouvrez le fichier (le `index.js`) avec VSCode ou le programme de votre choix (éditeur de text, Word ne fonctionnera pas ici) et modifier les valeurs des champs tout en haut du script selon le tableau ci dessous:

|                         | Nom de variable      | Explication                                                                                                                                                    | Exemple                                       |
| ----------------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------- |
| Votre nom               | `SENDER_NAME`        | Le nom de la personne qui envoie le mail (dans le sujet et au bas du mail)                                                                                     | `John` (valeur avec guillement)               |
| L'email de l'expéditeur | `SENDER_EMAIL`       |                                                                                                                                                                | `john.doe@email.com` (valeur avec guillement) |
| Mailjet API key         | `MAILJET_API_KEY`    | L'API key disponnible dans depuis votre compte mailjet une fois créé. Dans `Account` -> `Master API Key & Sub API key management` (valeur avec guillement)     | `19729468cc485976960e579cf0a7dbhu`            |
| Mailjet Secret key      | `MAILJET_SECRET_KEY` | La Secret key disponnible dans depuis votre compte mailjet une fois créé. Dans `Account` -> `Master API Key & Sub API key management` (valeur avec guillement) | `19729468cc485976960e579cf0a7dbhu`            |
| L'index de début        | `INDEX_START`        | Le numéro de ligne à partir duquel le script va envoyer l'email (valeur sans guillement)                                                                       | `1`                                           |
| L'index de fin          | `INDEX_END`          | Le numéro de ligne jusqu'au quel le script va envoyer l'email (valeur sans guillement)                                                                         | `100`                                         |
| Mode test               | `TEST`               | Si le script est lancé en mode test les emails seront envoyé au `SENDER_EMAIL` et non au mail du députer présent dans le fichier CSV (valeur sans guillement)  | `true` ou `false`                             |

Lorsque vous avez modifier ces valeurs, je vous conseil de laisser le script en mode test dans un premier temps, c'est à dire avec la valeur `TEST` égal à `true` ainsi vous pourrez d'abord faire touner le script et tester le résultat dans votre boite mail afin de voir que tout s'est passé comme prévu.

**ATENTION** Chaque email envoyé est décompté du nombre de mail que vous pouvez envoyé gratuitement avec mailjet même ceux de test. A savoir que vous pouvez envoyer un maximum de **200 emails** par jours selon leurs [plans tarifaire](https://www.mailjet.com/pricing/).

NOTE: Pensez bien à sauvegarder vos changements à l'aide des raccourci clavier `cmd + S` ou `Ctrl + S` pour sauvegarder.

## Lancer le script

Ici c'est l'étape un peu plus complexe pour des personnes n'ayant jamais toucher à du code de leurs vie. Mais pas d'inquiètude, ce n'est pas sorcier.

**A partir d'ici, j'assume que vous avez bien suivit les étapes plus haut et que donc vous avez bien NodeJS installer sur votre machine.**

Vous allez devoir ouvrir le `dossier du script` dans votre invité de commande ou `terminal`.

Pour ce faire, il faut ouvrir le programme nommé `terminal` sur mac ou `cmd.exe` sur windows.

- **Sur mac** appuyez sur `cmd + espace` pour ouvrir le popup de recherche et taper `terminal` puis `enter` pour l'ouvrir

- **Sur windows** appuyez sur le menu contextuel en bas à gauche de votre bureau et faite une recherche en tapent `cmd` pour voir appraitre le programme d'invité de commande et ouvrer le.

Une fois dedans, sachez que votre souris ne sert à rien, ce programme n'écoute que votre clavier.

Maintenant que ce programme est ouvert, ouvrez votre `finder` (sous mac) ou votre `explorateur de fichier` (sous windos) et cherchez le dossier du script que vous venez de dézippé. Lorsque vous l'avez, glissez et déposer le dossier (le dossier, pas les fichiers) dans l'invité de commande.
Avec cette manipulation, vous devriez voir une ligne qui représente la localisation du dossier sur votre ordinateur. Appuyer ensuite sur `Enter`.
Si un message d'erreur s'affiche, recommencer et ajouter en début de ligne `cd ` (un espace entre le `cd` et la ligne de localisation) et appuyer sur `Enter`.
_N'oubliez pas, votre souris ne fonctionne pas, vous devrez utilisez les flèches de votre clavier pour vous déplacer au début de la ligne_

Cette commande aura pour effet de déplacer le curseur de l'invité de commande à l'endroit ou se trouve le script sur votre ordinateur.

Ou fois fait, vous êtes à la dernière étape -> faire tourner le script.

Pour ce faire, écrivez dans votre inviter de commande:

```bash
node index.js
```

Ceci aura pour effet de dire à NodeJS d'executer le script qui s'appelle `index.js` sur votre ordinateur, et vous devriez voir des lignes qui confirme les envois d'email que vous avez parametrer selon les précédentes actions.

Vous pouvez aussi voir les statistiques des emails envoyer dans mailjet en vous connectant à votre compte sur [leurs site](https://app.mailjet.com/signin) et acceder à l'onglet statistique.

N'hésitez pas à me contacter sur le groupe télégram si vous rencontrez des soucis.
