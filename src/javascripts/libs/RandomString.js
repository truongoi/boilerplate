const alphabet = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm';

export default function random() {
  let str = '';
  let length = 16;
  while (length) {
    length -= 1;
    str += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return str;
}
