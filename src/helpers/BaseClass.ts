export class BaseClass {
    protected apiKey: string
    protected appId: string
    protected publisherId: string
    
    constructor(apiKey: string, appId: string, publisherId: string) {
        this.apiKey = apiKey;
        this.appId = appId;
        this.publisherId = publisherId
    }
}