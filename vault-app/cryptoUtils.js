const crypto = require('crypto');
require('dotenv').config();

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 16; 
// Ensure the key is a Buffer
const KEY = Buffer.from(process.env.ENCRYPTION_KEY, 'utf8');

function encrypt(text) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, KEY, iv);
    
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    
    const authTag = cipher.getAuthTag().toString('hex');
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

function decrypt(cipherText) {
    const [ivHex, authTagHex, encryptedData] = cipherText.split(':');
    
    const iv = Buffer.from(ivHex, 'hex');
    const authTag = Buffer.from(authTagHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, KEY, iv);
    
    decipher.setAuthTag(authTag);
    
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    
    return decrypted;
}

// CRITICAL: Ensure this exact line is at the bottom
module.exports = { encrypt, decrypt };