import {randomBytes,scrypt as callbackScrypt,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
const scrypt=promisify(callbackScrypt);
export async function hashPassword(password){const salt=randomBytes(16).toString('hex');const key=await scrypt(password,salt,64);return `${salt}:${key.toString('hex')}`;}
export async function verifyPassword(password,stored){const [salt,hex]=stored.split(':');const key=await scrypt(password,salt,64);const expected=Buffer.from(hex,'hex');return expected.length===key.length&&timingSafeEqual(expected,key);}
export const tokenHash=token=>createHash('sha256').update(token).digest('hex');
export const canManage=role=>['owner','admin'].includes(role);
export const canAssignRole=(actor,next)=>actor==='owner'&&['admin','member'].includes(next);
