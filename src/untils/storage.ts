export const USER = "freeUser";
export const storage = {
  set(key: string, value: string) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get(key: string) {
    //@ts-ignore
    return JSON.parse(localStorage.getItem(key));
  },
  remove(key: string) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
  has(key: string) {
    return localStorage.hasOwnProperty(key);
  },
  getToken() {
    const res = localStorage.getItem(USER);
    if (res) {
      return JSON.parse(res).token;
    } else {
      return res;
    }
  },
  removeToken() {
    localStorage.removeItem(USER);
  }
};
