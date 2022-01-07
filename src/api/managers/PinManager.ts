import Frak from 'frak/lib/components/Frak';
import {asyncWrapper} from 'utility/asyncWrapper';

export type PinRecord = {
    Id: number;
    ResidentId: number;
    UserId: number;
    PinValue: string;
    Image: null | string;
    Created: null | string;
    Updated: null | string;
    deleted_at: null | string;
};

export interface IPinData {
    api_key: string;
    organization: string;
    client_info: {
        last_name: string;
        first_name: string;
    };
    pin_info: PinRecord;
}

export type UpdateResponse = {
    data: null | PinRecord;
    status: number;
    success: boolean;
};

export type AuthResponse = {
    data: null | IPinData;
    status: number;
    success: boolean;
};

export default class PinManager
{
    private frak = Frak();
    private readonly baseUrl: string;
    _apiKey = 'yyz';

    constructor() {
        this.baseUrl = process.env.REACT_APP_BASEURL || '';
        if (this.baseUrl === '') {
            // todo: What should really happen if we have a hard error?
            throw new Error('The BASEURL environment variable is not set in the .env file or the .env file is missing');
        }
        this.apiKey = '';
    }

    get apiKey() {return this._apiKey}
    set apiKey(apiKey) {this._apiKey = apiKey}

    /**
     * Authenticate via PIN search
     * @param {string} pinValue The string of the pin valuet
     * @returns {Promise<IPinData>} The pin data response
     */
    async authenticate (pinValue: string): Promise<IPinData | null>  {
        const uri = this.baseUrl + 'pin/authenticate';
        const response = await this.frak.post<AuthResponse>(uri, {pin_value: pinValue});
        if (response.success) {
            const responseData = response.data as IPinData;
            this.apiKey = responseData.api_key;
            return responseData;
        } else return null;
    }

    async update (pinRecord: PinRecord): Promise<UpdateResponse> {
        const uri = this.baseUrl + 'pin/update?api_key=' + this.apiKey;
        const [updateError, response] = (await asyncWrapper(this.frak.post<UpdateResponse>(uri, pinRecord))) as [
            unknown,
            UpdateResponse
        ];

        if (updateError) throw updateError; // todo: What should really happen if we have a hard error?
        return response;
    }
}
