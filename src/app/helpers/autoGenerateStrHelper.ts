import {promisify} from "util";
import {randomBytes} from "crypto";

async function autoGeneratePassword() {
    const randomBytesPromise = promisify(randomBytes);
    const buffer = await randomBytesPromise(8); // Generate 8 random bytes
    // Convert the bytes to a base64 string
    return buffer.toString('base64');
}

export {autoGeneratePassword};
