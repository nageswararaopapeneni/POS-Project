import { Injectable } from "@nestjs/common";
import {
  randomBytes,
  scryptSync,
  timingSafeEqual,
} from "node:crypto";
import type { PasswordVerifier } from "../../application";

const KEY_LENGTH = 64;
const SALT_LENGTH = 16;
const COST = 16384;
const BLOCK_SIZE = 8;
const PARALLELIZATION = 1;

@Injectable()
export class ScryptPasswordVerifier implements PasswordVerifier {
  async verify(
    plainText: string,
    passwordHash: string,
  ): Promise<boolean> {
    try {
      const [algorithm, saltHex, derivedHex, parameters] =
        passwordHash.split("$");

      if (
        algorithm !== "scrypt" ||
        !saltHex ||
        !derivedHex ||
        parameters !== `${COST}:${BLOCK_SIZE}:${PARALLELIZATION}`
      ) {
        return false;
      }

      const salt = Buffer.from(saltHex, "hex");
      const expectedDerivedKey = Buffer.from(derivedHex, "hex");

      if (
        salt.length !== SALT_LENGTH ||
        expectedDerivedKey.length !== KEY_LENGTH
      ) {
        return false;
      }

      const derivedKey = scryptSync(
        plainText,
        salt,
        KEY_LENGTH,
        {
          N: COST,
          r: BLOCK_SIZE,
          p: PARALLELIZATION,
        },
      );

      return (
        derivedKey.length === expectedDerivedKey.length &&
        timingSafeEqual(derivedKey, expectedDerivedKey)
      );
    } catch {
      return false;
    }
  }

  async hash(plainText: string): Promise<string> {
    const salt = randomBytes(SALT_LENGTH);

    const derivedKey = scryptSync(
      plainText,
      salt,
      KEY_LENGTH,
      {
        N: COST,
        r: BLOCK_SIZE,
        p: PARALLELIZATION,
      },
    );

    return [
      "scrypt",
      salt.toString("hex"),
      derivedKey.toString("hex"),
      `${COST}:${BLOCK_SIZE}:${PARALLELIZATION}`,
    ].join("$");
  }
}