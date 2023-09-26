# Na Régua App

The most useful barber app.

React Native App

To-do:

- [ ] Install font
- [ ] Folder structure
- [ ] Theme styles
  - [ ] Typography component
  - [ ] Global styles
  - [ ] Colors component
  - [ ] Theme Switcher
  - [ ] useThemeHook
  - [ ] Icons
- [ ] Header
- [ ] Navigation
- [ ] Sign-in Screen
  - [ ] Input component
  - [ ] Select component
  - [ ] Button component
- [ ] Store config
- [ ] Axios API

## Folder structure

### components/

In the components folder, you can create multiple component files that are used to wrap the application components and determine their overall layout. You can also add reusable and UI components.

You can divide components based on categories: atoms, organisms, molecules & templates.

- atoms- The smallest possible components, such as buttons, titles, inputs or event color pallets, animations, and fonts can be stored in the atoms folder.
- molecules- They are the composition of one or more components of atoms.
- organisms- The combination of molecules that work together or even with atoms that compose more elaborate interfaces.
- templates- The collection of organisms that will make a full-page template.
- page- The page will look like the referenced screenshot below.

### containers/
Just as the name implies, you can put all screen-based components inside containers, such as Splash Screen, Home Screen, bottom Tabs, Sidebar, common header, and the container-based files, etc.

The use case for this folder is included and represents a screen being exported.

### screens/
If you have multiple screens like auth screens: login, register and profile screens, product screens it can be saved here.

### i18n/
This holds translation files for different languages in which you’re using your application.

### navigation/
Your project base navigation goes here. You can create a stack navigator in it and export it to your application.

### stores/
We are using Redux and Redux-Sagas in our project and handle business logic using them. If you are using Redux, then there must be action, reducers, saga, and services files that can be put here.

In stores, you can create an actions folder and you can store different types of actions in this folder. You can do the same as reducer, saga, and for services.

- /constants.js - This file contains static values used within the feature. An example of what we could store here is ACTION_TYPES data.

- /actions.js - You can store different types of actions in this folder. The action folder contains all the calling action creators for this feature according to your project requirement.

- /reducers.js - Our application’s navigation data now takes a slice of the application state, we would need a reducer to properly update this sliced data based on triggered actions.

- /selectors.js - This might come across as a bit strange to some of us, however, this segment of our architecture is influenced by the reselect package, which enables us to efficiently compute derived data from our application’s state.

- /services.js - The service folder contains logic, related to external API communications.

### utils/

All the utils/helpers files go here that storing reusable methods and logic like validations, progress bar, date pickers, and according to your app requirements.

### hooks/
If you have custom hooks defined in your project you can put it over here that can be shared across your entire project.

### styles/
You can add universal styles here like flexDirection: row, centerAll, itemsEnd and container-like equally spacing from all directions and many more. Here we place the explore feature’s components related styles.