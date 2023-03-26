import { AdSDK } from "..";
import { Ad, AdConfig, SDKBaseConfig } from "../../../../types";
import { AdSDKCommon } from "../AdSDKCommon";

export class WebAdSDK extends AdSDKCommon implements AdSDK {
    constructor(sdkBaseConfig: SDKBaseConfig, config?: any) {
        super({ ...sdkBaseConfig, appConfig: { ...sdkBaseConfig.appConfig, appPlatform: 'web' } }, config)
    }

    private _getAdDOMId = (adId: string) => {
        return `hypelab-sim-ad-${adId}`
    }

    private _registerClickEventListener = (element: HTMLElement, adId: string) => {
        element.addEventListener('click', () => {
            this._callEventListener(adId, 'onAdClick')
        })
    }

    private _renderAd = (ad: Ad, adContainer: HTMLElement, adConfig?: AdConfig) => {
        const { width: configWidth, height: configHeight } = adConfig?.size ?? {}
        const adWidth = configWidth ?? ad.size.width;
        const adHeight = configHeight ?? ad.size.height
        const adDOMId = this._getAdDOMId(ad.id);

        const anchorTag = document.createElement('a');
        anchorTag.setAttribute('href', ad.redirectUrl);
        anchorTag.setAttribute("class", "banner-ad");
        anchorTag.setAttribute("id", adDOMId);
        anchorTag.style.width = 'fit-content'
        anchorTag.style.display = 'block'
        this._registerClickEventListener(anchorTag, ad.id)

        //create banner div
        const bannerAdElement = document.createElement("div");
        bannerAdElement.style.position = "relative";
        bannerAdElement.style.backgroundImage = `url(${ad.renderedMedia.url})`;
        bannerAdElement.style.width = `${adWidth}px`;
        bannerAdElement.style.height = `${adHeight}px`;

        anchorTag.appendChild(bannerAdElement)

        // create close button element
        const closeButtonElement = document.createElement("a");
        closeButtonElement.setAttribute("class", "close-button");
        closeButtonElement.style.position = "absolute";
        closeButtonElement.style.top = "0";
        closeButtonElement.style.right = "7px";
        closeButtonElement.style.cursor = "pointer";
        closeButtonElement.innerHTML = "X";
        closeButtonElement.addEventListener("click", (e) => {
            e.stopPropagation()
            e.preventDefault()
            this.destroyAd(ad.id)
        });
        bannerAdElement.appendChild(closeButtonElement);

        adContainer.replaceChildren(anchorTag);
    }

    showAd = (containerId: string, adConfig?: AdConfig) => {
        if (!document) throw new Error("document object is not defined");

        const adContainer = document.getElementById(containerId);
        if (!adContainer) {
            throw new Error(`Ad container element with ID ${containerId} not found`);
        }

        let ad: Ad | undefined;
        try {
            ad = this._requestAd('banner', adConfig);
        } catch (err) {
            console.log(err);
        }

        if (ad) {
            try {
                this._renderAd(ad, adContainer, adConfig);
            } catch (err) {
                console.log(err);
            }
        }

        return ad;
    }

    destroyAd = (adId: string) => {
        if (!document) throw new Error("document object is not defined");

        const bannerAdElement = document.getElementById(this._getAdDOMId(adId));
        if (bannerAdElement) {
            bannerAdElement.parentNode?.removeChild(bannerAdElement);
            this._callEventListener(adId, 'onAdClose')
        }
    }

}