# Tresr

Store your treasure - localStorage, sessionStorage

## install

```bash
    npm i tresr
```

## Simple manipulation with localStorage and sessionStorage

Manipulate as with native object

```js
    import Tresr from 'tresr';
    const { ls, ss, defineStorage } = Tresr;

    ls.name = 'John'; // new item in localStorage with key "name" and value "John"
    console.log(ls.name); // get the item
    delete ls.name // remove the item

    // iterate over items
    ls.baz = 'bar';
    for(const key in ls) {
        console.log(key, ls[key]);
    }

    for (const [key, value] of Object.entries(ls)) {
        console.log(key, value);
    }

    // is in localStorage?
    if('name' in ls) {
        console.log(ls.name);
    }

    // deep object
    ls["my.deep.object"] = "deeeeeeeep";
    console.log(ls["my.deep.object"]);

    ls().clear(); // access the native api
```

```js
    import Tresr from 'tresr';
    const { defineStorage } = Tresr;

    // in node.js with localStorage/sessionStorage alternative with same api
    const ls = defineStorage(localStorage);
    const ss = defineStorage(sessionStorage);
```

```js
    // in browser
    const { ls, ss } = Tresr;
```

```js
    // node ES6
    import Tresr from 'tresr';

    // node ESmodules
    const { ls, ss, defineStorage } = require('tresr');

    const Tresr = require('tresr');
```
