// Utilidad para saber si estamos en navegador
function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof sessionStorage !== 'undefined';
}

//Funciones para sessionStorage
export function getSessionItem(key: string): string | null {
  return isBrowser() ? sessionStorage.getItem(key) : null;
}

export function setSessionItem(key: string, value: string): void {
  if (isBrowser()) {
    sessionStorage.setItem(key, value);
  }
}

export function removeSessionItem(key: string): void {
  if (isBrowser()) {
    sessionStorage.removeItem(key);
  }
}

export function clearSessionItems(): void {
  if (isBrowser()) {
    sessionStorage.clear();
  }
}

//Funciones para localStorage
function hasLocal(): boolean {
  return typeof window !== 'undefined' && typeof localStorage !== 'undefined';
}

export function getLocalItem(key: string): string | null {
  return hasLocal() ? localStorage.getItem(key) : null;
}

export function setLocalItem(key: string, value: string): void {
  if (hasLocal()) {
    localStorage.setItem(key, value);
  }
}

export function removeLocalItem(key: string): void {
  if (hasLocal()) {
    localStorage.removeItem(key);
  }
}

export function clearLocalItems(): void {
  if (hasLocal()) {
    localStorage.clear();
  }
}
