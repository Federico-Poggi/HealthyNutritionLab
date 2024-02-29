# HEALTHYNUTRITIONLAB

'**HealthyNutritionLab** è un'aplicazione che offre la possibilità a chi è registrato, di essere assegnato ad un nutrizionista o personal trainer, che si occuperà di assegnargli 
diete o schede d'allenamento in base alle richieste dell'utente; Alla creazione del servizio scelto l'utente sarà in grado tramite l'area personale di visualizzare le schede assegnategli e nel contempo ricevera una mail con le info della scheda;'

## Funzionalità disponibili 
    
- Registrazione utente ➡ Automaticamente diventerà un cliente
- Login utente
- Login per i dottori che lavorano nell'azienta


If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
