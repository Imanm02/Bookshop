import hashlib
import os

def hash(password):
    """Create a SHA-256 hash with a random salt."""
    salt = os.urandom(32)  # Generates a 32 byte salt
    pwd_hash = hashlib.pbkdf2_hmac('sha256', password.encode('utf-8'), salt, 100000)
    salt_hex = salt.hex()
    hash_hex = pwd_hash.hex()
    return f"{salt_hex}${hash_hex}"