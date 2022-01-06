import Frak from 'frak/lib/components/Frak';

export interface IPinData {
    api_key: string;
    organization: string;
    client_info: {
       last_name: string;
       first_name: string;
    };
    pin_info: {
        Id: number;
        ResidentId: number;
        UserId: number;
        PinValue: string;
        Image: null | string;
        Created: null | string;
        Updated: null | string;
        deleted_at: null | string;
    };
}

export type AuthResponse = {
    data: null | IPinData;
    status: number;
    success: boolean;
};

export interface IPinProvider {
    authenticate: (pinValue: string) => Promise<IPinData | null>,
    authenticate2: (pin: string[]) => Promise<unknown>
}

/**
 * Pin provider for API access
 * @param {string} url The base URL to use when making API requests
 * @returns {IPinProvider} Exported functions for pinProvider
 */
const pinProvider = (url: string): IPinProvider => {
    const _baseUrl = url as Readonly<string>;
    const _frak = Frak();

    return {
        /**
         * Authenticate via PIN search
         * @param {string} pinValue The string of the pin valuet
         * @returns {Promise<IPinData>} The pin data response
         */
        authenticate: async (pinValue: string): Promise<IPinData | null> => {
            const uri = _baseUrl + 'pin/authenticate';
            const response = await _frak.post<AuthResponse>(uri, {"pin_value": pinValue});
            if (response.success) {
                return response.data as IPinData;
            } else {
                return null;
            }
        },

        authenticate2: async (pin: string[]) => {
            const uri = _baseUrl + 'pin';
            const pinValue = pin.join('');
            return await _frak.post(uri, {
                pin_value: pinValue
            })
        }
    }

}

export default pinProvider;
