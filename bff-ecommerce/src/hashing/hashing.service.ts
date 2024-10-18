import { Injectable } from '@nestjs/common';
import { scrypt as scryptCallback, randomBytes } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(scryptCallback);

@Injectable()
export class HashingService {
  async hashPassword(password: string): Promise<string> {
    const salt = randomBytes(16).toString('hex');
    const hashedPassword = (await scrypt(password, salt, 64)) as Buffer;
    return `${salt}:${hashedPassword.toString('hex')}`;
  }

  async verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    const [salt, storedHash] = hashedPassword.split(':');
    const hashedBuffer = (await scrypt(password, salt, 64)) as Buffer;
    return storedHash === hashedBuffer.toString('hex');
  }
}
