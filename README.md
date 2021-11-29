# Getting Started
Install [EsLint plugin](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

Change your VScode settings:

To open user setting config press F1, enter <strong>setting</strong> and choose <strong>Open User Settings</strong>.
Enter <strong>eslint</strong> in the search panel.

If you have <strong>Auto Fix On Save</strong> checkbox, make it checked.
If don't - click Edit in <strong>settings.json</strong> and add rules to settings.json file:
```
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
},
"eslint.codeActionsOnSave.mode": "problems"
```
<strong>save file</strong>.

<strong>use npm install</strong>.
