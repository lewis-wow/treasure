# Tresr
Store your treasure - localStorage, sessionStorage

## install
```bash
    npm i tresr
```

## Simple manipulation with localStorage and sessionStorage

Manipulate as with native object
```js
    import { ls, ss, defineStorage } from 'tresr';

    ls.name = 'John'; // new item in session storage with key "name" and value "John"
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

    ls().clear(); // access the native api
```

```js
    import { defineStorage } from 'tresr';

    // in node.js with localStorage/sessionStorage alternative with same api
    const ls = defineStorage(localStorage);
    const ss = defineStorage(sessionStorage);
```

```js
    // in browser
    const { ls, ss } = Tresr;
```
