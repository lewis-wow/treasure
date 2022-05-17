# Tresr
Store your treasure - localStorage, sessionStorage

## install
```bash
    npm i tresr
```

## Simple manipulation with localStorage and sessionStorage

Manipulate as with native object
```js
    import { ls, ss } from 'tresr';

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
