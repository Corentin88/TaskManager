# TaskManager

Application web de gestion de tâches développée en JavaScript vanilla.

Le projet permet de créer, modifier, supprimer et suivre l'état des tâches. Les tâches sont sauvegardées dans le `localStorage` du navigateur afin de conserver les données après fermeture ou actualisation de la page.

---

## Fonctionnalités

* Création de tâches
* Modification de tâches
* Suppression de tâches
* Marquage d'une tâche comme terminée
* Filtrage des tâches
  * Toutes
  * Terminées
  * En cours
* Recherche d'une tâche par son titre
* Tri des tâches par priorité
  * Priorité haute
  * Priorité moyenne
  * Priorité basse
* Affichage du nombre de tâches terminées
* Affichage de la date et de l'heure de création
* Sauvegarde automatique dans le `localStorage`
* Récupération des tâches sauvegardées au démarrage

---

## Technologies utilisées

* HTML5
* CSS3
* JavaScript
* ES6 Modules
* DOM API
* LocalStorage API

---

## Structure du projet

```text
TaskManager/
│
├── index.html
├── style.css
├── README.md
│
└── js/
    ├── main.js
    ├── state.js
    ├── tasks.js
    ├── taskAction.js
    ├── storage.js
    ├── ui.js
    └── utils.js
```

---

## Organisation des fichiers

Le code JavaScript est séparé en plusieurs modules afin de répartir les responsabilités de l'application.

### `main.js`

Point d'entrée et orchestrateur de l'application.

Il coordonne les différents modules et gère notamment :

* le chargement initial des tâches ;
* la soumission du formulaire ;
* la récupération des tâches à afficher ;
* l'application du filtre, de la recherche et du tri ;
* la mise à jour globale de l'interface avec `updateUI()` ;
* les événements liés aux filtres, au tri et à la recherche.

Fonctions principales :

* `refreshTasks()`
* `updateUI()`
* `getTasksToRender()`

---

### `state.js`

Contient l'état partagé de l'application.

Variables principales :

* `tasks` : tableau contenant toutes les tâches ;
* `taskToEdit` : identifiant de la tâche actuellement en cours de modification.

Fonction :

* `setTaskToEdit()` : permet de modifier la tâche actuellement sélectionnée pour l'édition.

---

### `tasks.js`

Contient les fonctions liées au traitement des tâches.

Fonctions principales :

#### `addTask()`

Crée une nouvelle tâche et l'ajoute au tableau `tasks`.

Chaque tâche possède notamment :

* un identifiant unique généré avec `crypto.randomUUID()` ;
* un titre ;
* un état `completed` ;
* une priorité ;
* une date de création générée avec `new Date().toISOString()`.

#### `filterTasks()`

Filtre les tâches selon leur état.

Les filtres disponibles sont :

* `completed` : uniquement les tâches terminées ;
* `pending` : uniquement les tâches non terminées.

Si aucun filtre correspondant n'est trouvé, toutes les tâches sont retournées.

#### `searchTasks()`

Recherche les tâches dont le titre contient la chaîne recherchée.

La recherche est effectuée sans tenir compte des majuscules et minuscules grâce à `toLowerCase()`.

#### `sortTasksByPriority()`

Trie les tâches selon leur priorité.

Un objet `priorityOrder` associe une valeur numérique à chaque priorité :

```js
high: 3
medium: 2
low: 1
```

Une copie du tableau est créée avant d'utiliser `sort()` afin de ne pas modifier directement le tableau source.

---

### `taskAction.js`

Contient les actions déclenchées par l'utilisateur sur les tâches.

Fonctions principales :

#### `handleTaskCompletion()`

Met à jour la propriété `completed` d'une tâche lorsque la case à cocher est modifiée.

La fonction `updateUI()` est ensuite appelée afin de sauvegarder les modifications et actualiser l'affichage.

#### `handleTaskDeletion()`

Supprime une tâche.

La fonction :

1. recherche l'index de la tâche avec `findIndex()` ;
2. demande une confirmation à l'utilisateur avec `confirm()` ;
3. supprime la tâche avec `splice()` ;
4. appelle `updateUI()`.

#### `handleTaskEdit()`

Prépare une tâche pour sa modification.

La fonction :

* change le texte du bouton du formulaire ;
* récupère les valeurs actuelles de la tâche ;
* les place dans le formulaire ;
* enregistre l'identifiant de la tâche avec `setTaskToEdit()`.

---

### `storage.js`

Gère la persistance des tâches dans le `localStorage`.

#### `saveTasks()`

Convertit le tableau `tasks` en chaîne JSON avec `JSON.stringify()` puis l'enregistre dans le navigateur avec :

```js
localStorage.setItem()
```

#### `loadTasks()`

Récupère les données enregistrées avec :

```js
localStorage.getItem()
```

Puis les reconvertit en tableau JavaScript avec `JSON.parse()`.

Si aucune donnée n'est enregistrée, la fonction retourne un tableau vide grâce à :

```js
?? []
```

---

### `ui.js`

Contient les éléments et fonctions liés à l'interface utilisateur.

Le fichier récupère les principaux éléments HTML avec `document.querySelector()` :

* formulaire ;
* champs de saisie ;
* filtres ;
* recherche ;
* tri ;
* liste des tâches ;
* compteur.

Fonctions principales :

#### `createTaskElement()`

Crée dynamiquement l'élément HTML correspondant à une tâche.

La fonction utilise notamment :

* `document.createElement()`
* `appendChild()`
* `addEventListener()`

Elle crée également les boutons de modification et de suppression ainsi que la case à cocher permettant de modifier l'état de la tâche.

#### `renderTasks()`

Supprime l'affichage actuel des tâches puis crée les éléments correspondant aux tâches à afficher.

#### `styleRender()`

Applique un style au titre de la tâche lorsque celle-ci est terminée.

Le titre est barré grâce à `text-decoration: line-through`.

#### `renderCompletedCount()`

Calcule le nombre de tâches terminées et met à jour le compteur affiché dans l'interface.

---

### `utils.js`

Contient les fonctions utilitaires qui peuvent être utilisées par différents modules.

#### `formatDate()`

Convertit une date au format ISO en date lisible :

```text
JJ/MM/AAAA à HH:MM
```

Cette fonction est utilisée lors de l'affichage de la date de création d'une tâche.

---

# Fonctionnement de l'application

## 1. Création d'une tâche

La création commence lorsque l'utilisateur soumet le formulaire.

Dans `main.js`, l'événement `submit` est écouté avec :

```js
form.addEventListener("submit", ...)
```

Le titre et la priorité sont récupérés depuis le formulaire.

Le titre est nettoyé avec `trim()` afin de supprimer les espaces inutiles.

La fonction `addTask()` de `tasks.js` est ensuite appelée.

Elle crée un nouvel objet tâche :

```text
Nouvelle tâche
    ↓
crypto.randomUUID()
    ↓
Création de l'objet tâche
    ↓
Ajout dans tasks
    ↓
updateUI()
    ↓
Sauvegarde + mise à jour de l'affichage
```

---

## 2. Modification d'une tâche

Lorsque l'utilisateur clique sur le bouton `Modifier`, `handleTaskEdit()` est appelée depuis `taskAction.js`.

La fonction :

1. récupère les informations de la tâche ;
2. place les valeurs dans le formulaire ;
3. mémorise son identifiant dans `taskToEdit`.

Lors de la soumission suivante du formulaire, `main.js` vérifie si `taskToEdit` contient un identifiant.

Si c'est le cas, la tâche correspondante est recherchée avec `find()` puis son titre et sa priorité sont modifiés.

Une fois la modification terminée, `taskToEdit` est remis à `null`.

---

## 3. Suppression d'une tâche

La suppression commence lorsque l'utilisateur clique sur le bouton `Supprimer`.

`handleTaskDeletion()` recherche la tâche avec :

```js
findIndex()
```

Une confirmation est ensuite demandée avec :

```js
confirm()
```

Si l'utilisateur confirme, la tâche est supprimée du tableau avec :

```js
splice()
```

`updateUI()` est ensuite appelée pour sauvegarder les données et mettre à jour l'affichage.

---

## 4. Marquer une tâche comme terminée

Chaque tâche possède une propriété :

```js
completed
```

La case à cocher est synchronisée avec cette propriété.

Lorsqu'elle change, `handleTaskCompletion()` met à jour :

```js
task.completed
```

Puis `updateUI()` est appelée.

Le titre de la tâche est également barré lorsque `completed` vaut `true`.

---

## 5. Recherche

La recherche est déclenchée à chaque modification du champ de recherche grâce à l'événement :

```js
input
```

`searchTasks()` reçoit :

* le tableau de tâches à rechercher ;
* la valeur saisie par l'utilisateur.

La méthode `filter()` conserve uniquement les tâches dont le titre contient la recherche.

La comparaison est effectuée avec `toLowerCase()` afin de rendre la recherche insensible à la casse.

---

## 6. Filtrage

Le changement du filtre déclenche :

```js
taskFilter.addEventListener("change", ...)
```

`filterTasks()` utilise un objet contenant les différents comportements de filtrage :

```js
completed
pending
```

Chaque filtre correspond à une fonction utilisée par `Array.filter()`.

---

## 7. Tri par priorité

Le changement du mode de tri déclenche :

```js
taskSort.addEventListener("change", ...)
```

`sortTasksByPriority()` crée d'abord une copie du tableau avec le spread operator :

```js
const copyTasks = [...tasksToSort];
```

La méthode `sort()` est ensuite utilisée pour comparer les valeurs numériques associées aux priorités.

Le sens du tri est déterminé avec :

```js
const direction = order === "asc" ? 1 : -1;
```

---

## 8. Sauvegarde des tâches

La sauvegarde est gérée par `storage.js`.

Chaque fois qu'une modification importante est effectuée, `updateUI()` appelle :

```js
saveTasks();
```

Les tâches sont converties en JSON avec :

```js
JSON.stringify(tasks)
```

Puis enregistrées dans le `localStorage`.

Les données restent donc disponibles après un rechargement de la page.

---

## 9. Chargement des tâches

Au démarrage de l'application, `main.js` appelle :

```js
loadTasks()
```

Les données sont récupérées depuis le `localStorage` puis reconverties en objets JavaScript avec `JSON.parse()`.

Elles sont ensuite ajoutées au tableau `tasks`.

Enfin, `refreshTasks()` affiche les tâches récupérées.

---

# Mise à jour de l'interface

La fonction `updateUI()` centralise les principales opérations nécessaires après une modification :

```text
updateUI()
    │
    ├── saveTasks()
    │       └── localStorage
    │
    ├── renderCompletedCount()
    │       └── Mise à jour du compteur
    │
    └── refreshTasks()
            └── Mise à jour de la liste
```

Cette fonction est appelée après les principales actions qui modifient les données :

* création ;
* modification ;
* suppression ;
* changement d'état d'une tâche.

---

# Flux d'affichage des tâches

Lorsqu'une liste de tâches doit être affichée, `main.js` utilise :

```text
getTasksToRender()
        ↓
filterTasks()
        ↓
searchTasks()
        ↓
sortTasksByPriority()
        ↓
renderTasks()
        ↓
createTaskElement()
        ↓
DOM
```

Cela permet de séparer le traitement des données de leur affichage.

---

# Concepts JavaScript utilisés

Le projet permet notamment de mettre en pratique :

* variables `const` et `let` ;
* objets et tableaux ;
* fonctions ;
* fonctions fléchées ;
* modules ES6 (`import` / `export`) ;
* destructuration ;
* spread operator ;
* opérateur ternaire ;
* nullish coalescing ( ?? );
* `Array.filter()` ;
* `Array.find()` ;
* `Array.findIndex()` ;
* `Array.sort()` ;
* `Array.splice()` ;
* `Array.forEach()` ;
* manipulation du DOM ;
* événements avec `addEventListener()` ;
* `localStorage` ;
* JSON avec `JSON.stringify()` et `JSON.parse()` ;
* génération d'identifiants avec `crypto.randomUUID()` ;
* gestion des dates avec `Date`.

---

# Architecture modulaire

Le projet utilise des modules JavaScript afin de séparer les responsabilités.

```text
                         main.js
                       /    |    \
                      /     |     \
                     ↓      ↓      ↓
                tasks.js  ui.js  storage.js
                   ↓       ↓          ↓
                state.js  utils.js  state.js
                   ↑
                   │
              taskAction.js
                   ↑
                   │
                 ui.js
```

Cette organisation permet notamment de limiter le nombre de responsabilités présentes dans un même fichier et de faciliter la maintenance du projet.

---

# Installation et utilisation

Le projet ne nécessite aucune dépendance externe.

Pour utiliser l'application :

1. Cloner ou télécharger le projet.
2. Ouvrir le projet dans un éditeur de code.
3. Ouvrir `index.html` dans un navigateur compatible avec les modules ES6.
4. Utiliser le formulaire pour créer et gérer les tâches.

Les données sont stockées localement dans le navigateur grâce au `localStorage`.

---

# Évolutions possibles

Plusieurs évolutions pourraient être ajoutées au projet :

* possibilité de gérer plusieurs catégories de tâches ;
* ajout de dates limites ;
* ajout de tags ;
* possibilité de supprimer toutes les tâches terminées ;
* confirmation avant de quitter une modification ;
* amélioration de l'accessibilité ;
* ajout d'une interface responsive plus complète ;
* ajout de tests automatisés ;
* remplacement du `localStorage` par une API et une base de données.




