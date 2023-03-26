### Installation

To install the package use the following command
`npm install hypelab-demo`

## Usage
- Import the package using the following command
```import { HypeLab } from "hypelab-demo";```

- Create an instance of the HypeLab class and initiate the adSDK using `createAdSDK` method
Here is a sample implementation
```
const hypelab = new HypeLab();
const adSDK = hypelab.createAdSDK({
  apiKey: <Your_API_Key>,
  publisherId: <App_Publisher_id>
  appConfig: {
    appId: <Your_APP_ID>,
  },
  baseUrl: "https://api.hypelab-demo.com",
});
```

- Rendering an ad
```
adSDK.showAd(adContainerId, adConfig);
```

- Destroying an ad
To destroy an ad, we need an adId. The `showAd` method returns the rendered `ad` object which also contains the adId.
```
adSDK.destroyAd(adId);
```

- Adding an event listener to an ad
Available events - `onAdClick` | `onAdClose`
```
adSDK.addEventListener(ad.id, "onAdClick", () => {
    console.log(`Ad clicked`);
});
```
