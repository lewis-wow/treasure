# Tresr

LocalStorage as plain object

## install

```bash
npm i tresr
```

## Simple manipulation with localStorage and sessionStorage

Manipulate as with native Javascript object (leave the hard manipulation on us)

```ts
  import ls from 'tresr';

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

```ts
  import ls from 'tresr';

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
