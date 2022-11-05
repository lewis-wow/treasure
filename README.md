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
    import { LS } from 'tresr';

    LS.name = 'John'; // new item in localStorage with key "name" and value "John"
    console.log(LS.name); // get the item
    delete LS.name // remove the item

    // iterate over items
    LS.baz = 'bar';
    for(const key in LS) {
        console.log(key, LS[key]);
    }

    for (const [key, value] of Object.entries(LS)) {
        console.log(key, value);
    }

    // is in localStorage?
    if('name' in LS) {
        console.log(LS.name);
    }

    // deep object - that's the right magic
    // das native object - auto localStorage saves on edit
    LS.deep = {
        a: {
            b: {
                c: 1,
                stringified: '{ a: 1 }' //type safe, keep string
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

### Tresr vs native

```js
    import { LS } from 'tresr';
    
    // manipulate with localStorage/sessionStorage as with native Javascript object

    LS.name = 'John';
    // equals to 
    // localStorage.setItem('name', 'John');

    console.log(LS.name);
    // equals to 
    // console.log(localStorage.getItem('name'));

    delete LS.name;
    // equals to 
    // localStorage.removeItem('name');

    'name' in LS;
    // equals to 
    // localStorage.getItem('name') !== null;

    LS().clear();
    // equals to 
    // localStorage.clear();
```
