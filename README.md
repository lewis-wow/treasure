# Tresr

Store your treasure - localStorage, sessionStorage

## install

```bash
npm i tresr
```

```html
<script src="https://cdn.jsdelivr.net/npm/tresr"></script>
```

## Simple manipulation with localStorage and sessionStorage

Manipulate as with native Javascript object (leave the hard manipulation on us)

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

    // deep object - that's the right magic
    // das native object - auto localStorage saves on edit
    ls.deep = {
        a: {
            b: {
                c: 1
            }
        }
    };

    console.log(ls.deep.a.b.c);
    ls.deep.a.b.c = 5;
    ls.deep.a.b.c++;
    ls.deep.a.b.c--;
    ls.deep.a.b.c += 5;
    Object.assign(ls.deep, { anotherTree: 3 }); // auto update in localStorage!

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

### Tresr vs native

```js
    import Tresr from 'tresr';
    const { ls } = Tresr;
    
    // manipulate with localStorage/sessionStorage as with native Javascript object

    ls.name = 'John';
    // equals to 
    // localStorage.setItem('name', 'John');

    console.log(ls.name);
    // equals to 
    // console.log(localStorage.getItem('name'));

    delete ls.name;
    // equals to 
    // localStorage.removeItem('name');

    'name' in ls;
    // equals to 
    // localStorage.getItem('name') !== null;

    ls().clear();
    // equals to 
    // localStorage.clear();
```
