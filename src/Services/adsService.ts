import { Injectable } from "@angular/core";
import {
  AdMobFree,
  AdMobFreeBannerConfig,
  AdMobFreeInterstitialConfig,
//   AdMobFreeRewardVideoConfig
} from "@ionic-native/admob-free";
import { Platform } from "ionic-angular";

@Injectable()
export class AdsService {
  bannerId: string = "ca-app-pub-6192301023590013/4617783500";
  // intersId: string = "ca-app-pub-6192301023590013/3115401127";
//   rewardId: string = "ca-app-pub-xxx-your-rewarded-id-unit";

  constructor(private admobFree: AdMobFree, public platform: Platform) {}

  showBanner() {
    this.platform
      .ready()
      .then(() => {
        const bannerConfig: AdMobFreeBannerConfig = {
          id: this.bannerId,
          // isTesting: false,
          autoShow: false
        };
        this.admobFree.banner.config(bannerConfig);
        this.admobFree.banner
          .prepare()
          .then(() => {
            this.admobFree.banner.show();
          })
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));
  }

  hideBanner() {
    this.platform
      .ready()
      .then(() => {
        this.admobFree.banner.hide().catch();
      })
      .catch(e => console.log(e));
  }  

 /*  loadInterstitial() {
    this.platform.ready().then(() => {
      const interConfig: AdMobFreeInterstitialConfig = {
        id: this.intersId,
        isTesting: false,
        autoShow: false
      };
      this.admobFree.interstitial.config(interConfig);
      this.admobFree.interstitial.prepare();
    });
 } */

  /*showInterstitial() {
    this.platform.ready().then(() => {
      const interConfig: AdMobFreeInterstitialConfig = {
        id: this.intersId,
        // isTesting: true,
        autoShow: true
      };
      this.admobFree.interstitial.config(interConfig);
      this.admobFree.interstitial.prepare().then(() => {
        // this.admobFree.interstitial.show();
      });
    });

  } */ 

 /* showBanner() {

    let bannerConfig: AdMobFreeBannerConfig = {
        id: this.bannerId,
        isTesting: true, // Remove in production
        autoShow: true
        //id: Your Ad Unit ID goes here
    };

    this.admobFree.banner.config(bannerConfig);

    this.admobFree.banner.prepare().then(() => {
        // success
    }).catch(e => console.log(e));

}  

  launchInterstitial() {

    let interstitialConfig: AdMobFreeInterstitialConfig = {
        isTesting: true, // Remove in production
        autoShow: true,
        id: this.intersId
    }; 

    this.admobFree.interstitial.config(interstitialConfig);

    this.admobFree.interstitial.prepare().then(() => {
        // success
    });

} */

 /* showRewardVideo() {
    this.platform.ready().then(() => {
      const rewardVideoConfig: AdMobFreeRewardVideoConfig = {
        id: this.rewardId,
        isTesting: false,
        autoShow: false
      };
      this.admobFree.rewardVideo.config(rewardVideoConfig);
      this.admobFree.rewardVideo.prepare().then(() => {
        this.admobFree.rewardVideo.isReady().then(() => {
          this.admobFree.rewardVideo.show();
        });
      });
    });
  }  */
}