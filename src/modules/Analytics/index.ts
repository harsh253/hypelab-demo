import { ANALYTICS_BASE_URL } from "../../constants";
import { BaseClass } from "../../helpers/BaseClass";

export class Analytics extends BaseClass {
    private analyticsUrl: string
    constructor(baseUrl: string, apiKey: string, appId: string, publisherId: string) {
        super(apiKey,appId,publisherId)
        this.analyticsUrl = `${baseUrl}${ANALYTICS_BASE_URL}`
    }

    trackClick = (objectId: string, meta: { [key: string]: any }) => {
        const data = {
            objectId,
            eventType: 'click',
            timestamp: Date.now(),
            ...meta
        };
    }

    private _sendData = () => {

    }
}