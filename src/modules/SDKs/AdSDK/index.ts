import { Ad, AdConfig, AdFormat, EventType, SDKBaseConfig } from "../../../types";

export interface AdSDKFactory {
    createAdSDK: (sdkBaseConfig: SDKBaseConfig) => AdSDK;
}

export interface AdSDK {
    showAd: (containerId: string, adConfig?: AdConfig) => Ad | undefined
    destroyAd: (adDOMId: string) => void
    addEventListener: (adId: string, eventName: EventType, callback: Function) => void
}