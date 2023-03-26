import { AD_SERVER_BASE_URL } from "../../constants";
import { adList } from "../../db"
import { BaseClass } from "../../helpers/BaseClass";
import { Ad } from "../../types";

export class AdServer extends BaseClass {
    private serverUrl: string

    constructor(baseUrl: string, apiKey: string, appId: string, publisherId: string) {
        super(apiKey, appId, publisherId)
        this.serverUrl = `${baseUrl}/${AD_SERVER_BASE_URL}`
    }

    getAd = (data: { [key: string]: any }) => {
        const size = adList.length
        const index = getRandom(0, size);
        return adList[index] as Ad;
    }
}

const getRandom = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min)) + min;
}