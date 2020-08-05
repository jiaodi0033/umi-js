interface Token {
  token: string; // token内容
  expiresAt: number; // 过期时间戳, 单位毫秒
}

const _key_in_storage = '__token';
const _safe_duration_seconds = 1 * 3600;
/**
 * 从本地存储获取Token
 */
export function getToken(): Token | null {
  try {
    return JSON.parse(localStorage.getItem(_key_in_storage) || '');
  } catch (e) {
    return null;
  }
}

/**
 * 将Token存储到本地存储
 */
export function saveToken(token: Token) {
  localStorage.setItem(_key_in_storage, JSON.stringify(token));
}

/**
 * 校验Token是否有效
 */
export function isTokenValid(token: Token | null): boolean {
  if (token === null) return false;
  const currMills = new Date().getTime();
  console.log(token.expiresAt, currMills, token.expiresAt - currMills);
  return token.expiresAt - currMills > _safe_duration_seconds * 1000;
}
