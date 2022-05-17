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

const ls = new Proxy(() => window.localStorage, createConfig(window.localStorage));
const ss = new Proxy(() => window.sessionStorage, createConfig(window.sessionStorage));

export { ls, ss };
