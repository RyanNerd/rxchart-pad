import {Authenticated, IAuthenticationProvider} from 'providers/authenticationProvider';
import {asyncWrapper} from 'utility/asyncWrapper';

export interface IAuthManager {
    authenticate: (username: string, password: string) => Promise<Authenticated>;
}

/**
 * Authorization Manager
 * @param {IAuthenticationProvider} authenticationProvider The Authentication provider "class" object
 */
const authManager = (authenticationProvider: IAuthenticationProvider): IAuthManager => {
    /**
     * Authentication API call
     * @param {string} username The username to authenticate
     * @param {string} password The password to authenticate
     * @returns {Promise<Authenticated>} Authenticated obj {success: true/false, organization: org, apiKey: API key}
     */
    const _authenticate = async (username: string, password: string) => {
        const [error, r] = (await asyncWrapper(authenticationProvider.post({username, password}))) as [
            unknown,
            Promise<Authenticated>
        ];
        if (error) throw error;
        else return r;
    };

    return {
        authenticate: async (username: string, password: string) => {
            return await _authenticate(username, password);
        }
    };
};

export default authManager;
