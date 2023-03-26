import { Ad, AdConfig, AdEventListeners, AdFormat, AppPlatform, EventHandler, EventType, SDKBaseConfig } from "../../../types";
import { AdServer } from "../../AdServer";
import { Analytics } from "../../Analytics";

export class AdSDKCommon {
    protected adServer: AdServer
    protected apiKey: string
    protected appId: string
    protected publisherId: string
    protected analyticsServer: Analytics
    protected appPlatform: AppPlatform
    protected eventListeners: AdEventListeners
    constructor(sdkBaseConfig: SDKBaseConfig, config?: any) {
        const { baseUrl, apiKey, publisherId, appConfig: {
            appId, appPlatform
        } } = sdkBaseConfig
        this.apiKey = apiKey
        this.appId = appId
        this.publisherId = publisherId
        this.appPlatform = appPlatform
        this.adServer = new AdServer(baseUrl, apiKey, appId, publisherId,)
        this.analyticsServer = new Analytics(baseUrl, apiKey, appId, publisherId);
        this.eventListeners = {}
    }

    protected _requestAd = (adFormat: AdFormat, adConfig?: AdConfig) => {
        let ad: Ad | undefined = undefined;
        try {
            ad = this.adServer.getAd({
                adFormat,
                apiKey: this.apiKey,
                appId: this.appId,
                publisherId: this.publisherId,
                ...(adConfig && { ...adConfig })
            });
        } catch (err) {
            console.log(err);
        }
        return ad;
    };

    protected _callEventListener = (adId: string, eventType: EventType) => {
        const registeredEvents = this.eventListeners[adId]?.events?.find((event) => event.name === eventType)?.handlers ?? [];
        registeredEvents?.forEach((cb: Function) => {
            cb()
        })
    }

    addEventListener = (adId: string, eventName: EventType, callback: Function) => {
        if (!this.eventListeners[adId]) {
            const events: EventHandler[] = []
            const event: EventHandler = {
                name: eventName,
                handlers: []
            }
            events.push(event)
            this.eventListeners[adId] = { events }
        }
        
        const event = this.eventListeners[adId].events.find((event: any) => event.name === eventName);
        if(!event){
            this.eventListeners[adId].events.push({
                name: eventName,
                handlers: []
            })
        }
        this.eventListeners[adId].events.find((event: any) => event.name === eventName)?.handlers?.push(callback);
    }
}