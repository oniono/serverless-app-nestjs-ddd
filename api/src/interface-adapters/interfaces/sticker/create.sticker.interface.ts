/*  Creating interfaces like this may be useful if you have a front end
    web/mobile application or other microservices that need to talk to
    your API since you can share them as a git submodule, a npm package/
    library or in a monorepo.
*/
export interface CreateSticker {
  freqDashboardId: string;
  missionStickerCount: number;
  normalStickerCount: number;
}
