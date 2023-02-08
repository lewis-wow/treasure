import { isTrivial, proxify } from './utils'
import type { Storage } from './utils'

function createConfig(storage: Storage) {
	return {
		set(_target, key, value) {
			if (!isTrivial(value)) {
				storage.setItem(
					key,
					JSON.stringify(value, (_key, value) => (typeof value === 'string' ? `'${value}'` : value)),
				)
				return true
			}

			storage.setItem(key, value.toString())
			return true
		},
		deleteProperty(_target, key) {
			storage.removeItem(key)
			return true
		},
		get(_target, key) {
			const item = storage.getItem(key)

			try {
				const shalowObject = JSON.parse(item)
				return proxify(storage, shalowObject, key, shalowObject)
			} catch (e) {
				return item
			}
		},
		has(_target, key) {
			return storage.getItem(key) !== null
		},
		ownKeys() {
			return Object.keys(storage)
		},
		getOwnPropertyDescriptor(_target, key) {
			return {
				configurable: true,
				enumerable: true,
				value: storage.getItem(key),
				writable: true,
			}
		},
		apply(target, thisArg, args) {
			return target.apply(thisArg, args)
		},
	}
}

function defineStorage(storage: Storage) {
	if (!storage) throw new TypeError('Storage is not defined')
	if (!storage.getItem || !storage.setItem || !storage.removeItem) throw new TypeError('Storage is not supported')

	return new Proxy(() => storage, createConfig(storage))
}

export default (() => {
	if (typeof window === 'undefined' || !('localStorage' in window)) throw new TypeError('localStorage is not defined')

	return defineStorage(window.localStorage)
})()
