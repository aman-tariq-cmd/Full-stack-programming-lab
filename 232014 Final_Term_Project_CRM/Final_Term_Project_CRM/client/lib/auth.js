const TOKEN_KEY = 'crm_token';
const COOKIE_MAX_AGE = 7 * 24 * 60 * 60;

function getCookie(name) {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return match ? decodeURIComponent(match[1]) : null;
}

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(TOKEN_KEY, token);
  document.cookie = `${TOKEN_KEY}=${encodeURIComponent(token)}; path=/; max-age=${COOKIE_MAX_AGE}; SameSite=Lax`;
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;

  let token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    token = getCookie(TOKEN_KEY);
    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
    }
  }

  return token;
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(TOKEN_KEY);
  document.cookie = `${TOKEN_KEY}=; path=/; max-age=0; SameSite=Lax`;
};

export const setUser = (user) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('crm_user', JSON.stringify(user));
};

export const getUser = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('crm_user');
  return data ? JSON.parse(data) : null;
};

export const clearUser = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('crm_user');
};

export const logout = () => {
  clearToken();
  clearUser();
};
