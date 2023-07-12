import crypto from "crypto";

import config from "../config";

export const encryptData = (data: string) => {
  try {
    if (typeof data == "object") {
      data = JSON.stringify(data);
    }
    const cipher = crypto.createCipheriv(
      config.crypto.algo,
      config.crypto.key,
      config.crypto.iv,
    );
    13;
    let encrypted = cipher.update(data);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    const encryptedStr = encrypted.toString("base64");
    return encryptedStr;
  } catch (e) {
    console.log({ encryptPiDataNew: e });
    // writeLog("API", { encryptPiDataNew: exceplog(e), data: data }, e);
    return data;
  }
};

export const decryptData = (data: string) => {
  try {
    const decipher = crypto.createDecipheriv(
      config.crypto.algo,
      config.crypto.key,
      config.crypto.iv,
    );
    const decrypted = decipher.update(data, "base64");
    const decryptedData = Buffer.concat([
      decrypted,
      decipher.final(),
    ]).toString();
    return decryptedData;
  } catch (e) {
    console.log({ decryptPiDataNew: e });
    // writeLog("API", { decryptPiDataNew: exceplog(e), data: data }, e);
    return data;
  }
};

export default { encryptData, decryptData };
