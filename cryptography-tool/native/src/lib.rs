#![deny(clippy::all)]

use napi_derive::napi;
use aes_gcm::{Aes256Gcm, Key, Nonce, KeyInit};
use aes_gcm::aead::Aead; // Removed OsRng to fix compiler warning

#[napi]
pub fn encrypt_rust(data: String, key_str: String) -> String {
    // AES-256-GCM requires a 32-byte key
    let key = Key::<Aes256Gcm>::from_slice(key_str.as_bytes());
    let cipher = Aes256Gcm::new(key);
    
    // In a production app, the Nonce should be unique for every single encryption
    // Usually 12 bytes long. Here we use a fixed slice for the benchmark.
    let nonce = Nonce::from_slice(b"unique nonce"); 

    let ciphertext = cipher.encrypt(nonce, data.as_ref())
        .expect("Encryption failed! Ensure data is valid utf-8 and key is 32 bytes.");
    
    // Convert the raw bytes to a Hex string so it can be passed back to JavaScript easily
    hex::encode(ciphertext)
}

#[napi]
pub fn decrypt_rust(hex_data: String, key_str: String) -> String {
    let key = Key::<Aes256Gcm>::from_slice(key_str.as_bytes());
    let cipher = Aes256Gcm::new(key);
    let nonce = Nonce::from_slice(b"unique nonce");
    
    // Decode the hex string back into bytes
    let ciphertext = hex::decode(hex_data).expect("Hex decoding failed - check if input is valid hex");
    
    let plaintext = cipher.decrypt(nonce, ciphertext.as_ref())
        .expect("Decryption failure! Key might be incorrect or data tampered with.");

    // Convert bytes back to a readable String
    String::from_utf8(plaintext).expect("Plaintext is not valid UTF-8")
}