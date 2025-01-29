export const getBasicTokenEncoded = (username, password) =>  'Basic ' + window.btoa(username + ':' + password);

export const getJWTTokenString = (token) => !token ? null : 'Bearer ' + token;