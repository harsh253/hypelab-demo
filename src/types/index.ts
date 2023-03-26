export interface SDKBaseConfig {
    baseUrl: string;
    apiKey: string;
    publisherId: string
    appConfig: ClientAppConfig
}

export interface ClientAppConfig {
    appPlatform: AppPlatform,
    appId: string,
}

export interface AdConfig {
    size?: AdSize
}

interface AdSize {
    width: number,
    height: number
}

export interface Ad {
    id: string,
    size: AdSize,
    renderedMedia: {
        type: AdMedia,
        url: string
    }
    text?: string
    redirectUrl: string
}

export interface EventHandler {
    name: EventType,
    handlers: Function[]
}

export interface AdEventListeners {
    [key:string]: {
        events: EventHandler[]
    }
}

type AdMedia = 'image' | 'video'
export type AppPlatform = 'web';
export type AdFormat = "banner";
export type EventType = 'onAdClick' | 'onAdClose'

