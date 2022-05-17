(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
            (global = global || self, global.Tresr = factory());
}(this, function () {
    'use strict';

    const createConfig = (storage) => {
        return {
            set(target, key, value) {
                storage.setItem(key, value);
                return true;
            },
            deleteProperty(target, key) {
                storage.removeItem(key);
                return true;
            },
            get(target, key) {
                return storage.getItem(key);
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

    const wdefined = typeof window !== 'undefined' || self instanceof Window;

    return {
        defineStorage,
        ls: wdefined ? defineStorage(window.localStorage) : undefined,
        ss: wdefined ? defineStorage(window.sessionStorage) : undefined
    };

}));
