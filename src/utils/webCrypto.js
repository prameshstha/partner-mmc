import config from "@/config";

const key = config.enc_key;
const iv = config.init_iv;

export async function encryptMessage(payload) {
  const message = JSON.stringify(payload);
  const encoder = new TextEncoder();
  const encodedMessage = encoder.encode(message);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "AES-CBC" },
    false,
    ["encrypt"]
  );

  const encrypted = await window.crypto.subtle.encrypt(
    { name: "AES-CBC", iv: encoder.encode(iv) },
    cryptoKey,
    encodedMessage
  );

  return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export async function decryptMessage(encryptedMessage) {
  const decoder = new TextDecoder();
  const encodedKey = new TextEncoder().encode(key);
  const encodedIv = new TextEncoder().encode(iv);

  const cryptoKey = await window.crypto.subtle.importKey(
    "raw",
    encodedKey,
    { name: "AES-CBC" },
    false,
    ["decrypt"]
  );

  const encryptedArray = Uint8Array.from(atob(encryptedMessage), (c) =>
    c.charCodeAt(0)
  );
  const decrypted = await window.crypto.subtle.decrypt(
    { name: "AES-CBC", iv: encodedIv },
    cryptoKey,
    encryptedArray
  );

  return JSON.parse(decoder.decode(decrypted));
}
