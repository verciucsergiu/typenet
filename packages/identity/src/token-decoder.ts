import { Injectable } from '@typenet/core';
import { AuthorizationContainer } from './authorization-container';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class TokenDecoder {
    public verifyToken(token: string): Promise<{ valid: boolean, value: any }> {
        return new Promise((resolve) => {
            jwt.verify(token, AuthorizationContainer.options.key, (err, decoded) => {
                if (err) {
                    resolve({ valid: false, value: {} });
                } else {
                    resolve({ valid: true, value: decoded });
                }
            });
        });
    }
}