/**
 * @description Utility functions for safe interaction with localStorage.
 * Provides generic methods to store and retrieve data safely,
 * handling errors and JSON serialization.
 */

/**
 * Safely persists a value to localStorage.
 * Converts the value to a JSON string before saving.
 * Errors are caught and logged without throwing.
 *
 * @template T - Type of the value to store.
 * @param {string} key - The localStorage key under which the value will be stored.
 * @param {T} value - The value to store. Can be primitive, object, or array.
 */
export function safeStorageSet<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (err) {
    console.error(`Failed to persist "${key}" to localStorage`, err)
  }
}

/**
 * Safely retrieves a value from localStorage.
 * Parses JSON string back into the original type.
 * Returns a default value if key is missing or parsing fails.
 *
 * @template T - Expected type of the retrieved value.
 * @param {string} key - The localStorage key to read.
 * @param {T} defaultValue - The default value to return if retrieval fails.
 * @returns {T} - The parsed value from localStorage, or the default value.
 */
export function safeStorageGet<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch (err) {
    console.error(`Failed to read "${key}" from localStorage`, err)
    return defaultValue
  }
}
