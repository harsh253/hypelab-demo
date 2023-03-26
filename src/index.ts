
import { AdSDK, AdSDKFactory } from "./modules/SDKs/AdSDK";
import { WebAdSDK } from "./modules/SDKs/AdSDK/WebAdSDK";

import { SDKBaseConfig } from "./types";

export class HypeLab implements AdSDKFactory {
    constructor() { }
    createAdSDK = (sdkBaseConfig: SDKBaseConfig) => {
        if (!sdkBaseConfig) throw new Error("No config provided for SDK")
        const { apiKey, appConfig: clientAppConfig, baseUrl } = sdkBaseConfig
        const { appPlatform = 'web', appId } = clientAppConfig ?? {}
        if (!baseUrl) throw new Error("API url is missing")
        if (!apiKey) throw new Error("API Key is missing")
        if (!appId) throw new Error("App id is missing")

        let adSDK: AdSDK;
        switch (appPlatform) {
            case 'web':
                adSDK = new WebAdSDK(sdkBaseConfig)
                break;

            default:
                throw new Error(`Unsupported platform: ${appPlatform}`);
        }

        return adSDK
    };

}