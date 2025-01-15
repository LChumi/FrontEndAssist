//Funciones para sessionStorage
export function getSessionItem(key: string): string | null {
  return sessionStorage.getItem(key);
}

export function setSessionItem(key: string, value: string): void {
  sessionStorage.setItem(key, value);
}

export function removeSessionItem(key: string): void {
  sessionStorage.removeItem(key);
}

export function clearSessionItems(): void {
  sessionStorage.clear();
}

//Funciones para localStorage
export function getLocalItem(key: string): string | null {
  return localStorage.getItem(key);
}

export function setLocalItem(key: string, value: string): void {
  localStorage.setItem(key, value);
}

export function removeLocalItem(key: string): void {
  localStorage.removeItem(key);
}

export function clearLocalItems(): void {
  localStorage.clear();
}
