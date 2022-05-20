(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.Tresr = factory());
}(this, function () {
    'use strict';

    const isTrivial = (value) => !((typeof value === 'object' && value !== null) || Array.isArray(value));

    const proxify = (storage, shalow, key, curr) => {
        if (isTrivial(curr)) {
            return curr;
        }

        return new Proxy(curr, {
            get(target, prop) {
                return proxify(storage, shalow, key, target[prop]);
            },
            set(target, prop, value) {
                target[prop] = value;
                storage.setItem(key, JSON.stringify(shalow));
                return true;
            },
            deleteProperty(target, prop) {
                delete target[prop];
                storage.setItem(key, JSON.stringify(shalow));
                return true;
            },
            has(target, prop) {
                return prop in target;
            },
            ownKeys(target) {
                return Object.keys(target);
            },
            getOwnPropertyDescriptor(target, prop) {
                return Object.getOwnPropertyDescriptor(target, prop);
            }
        });
    }

    const createConfig = (storage) => {
        return {
            set(target, key, value) {
                if (!isTrivial(value)) {
                    storage.setItem(key, JSON.stringify(value));
                    return true;
                }

                storage.setItem(key, value);
                return true;
            },
            deleteProperty(target, key) {
                storage.removeItem(key);
                return true;
            },
            get(target, key) {
                const item = storage.getItem(key);

                try {
                    const shalowObject = JSON.parse(item);
                    return proxify(storage, shalowObject, key, shalowObject);
                } catch (e) {
                    return item;
                }
            },
            has(target, key) {
                return storage.getItem(key) !== null;
            },
            ownKeys(target) {
                return Object.keys(storage);
            },
            getOwnPropertyDescriptor(target, key) {
                return {
                    configurable: true,
                    enumerable: true,
                    value: storage.getItem(key),
                    writable: true
                };
            },
            apply(target, thisArg, args) {
                return target.apply(thisArg, args);
            }
        };
    };

    const defineStorage = (storage) => {
        if (!storage) throw new TypeError('Storage is not defined');
        if (!storage.getItem || !storage.setItem || !storage.removeItem) throw new TypeError('Storage is not supported');

        return new Proxy(() => storage, createConfig(storage));
    }

    const wdefined = typeof window !== 'undefined';

    const immutable = (obj) => {
        if (isTrivial(obj)) return obj;

        const res = {};
        for (const [key, value] of Object.entries(obj)) {
            res[key] = isTrivial(value) ? value : immutable(value);
        }
        return res;
    };

    return {
        defineStorage,
        immutable,
        ls: wdefined ? defineStorage(window.localStorage) : undefined,
        ss: wdefined ? defineStorage(window.sessionStorage) : undefined
    };

}));
