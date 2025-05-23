import CryptoJS from 'crypto-js';

const ENCRYPT_KEY = 'my32bitsecretkey1234567890123456';
const IV = 'my16bitsecretkey';

export const encrypt = (text) => {
  const encrypted = CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(ENCRYPT_KEY), {
    iv: CryptoJS.enc.Utf8.parse(IV),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  return encrypted.toString();
};
