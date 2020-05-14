export class Utils {

  private static MIN_MEDIUM_SCREEN_SIZE: number = 961;
  private static MIN_SMALL_SCREEN_SIZE: number = 601;

  public static getMinMediumScreenSize(): number {
    return Utils.MIN_MEDIUM_SCREEN_SIZE;
  }

  public static getMinSmallScreenSize(): number {
    return Utils.MIN_SMALL_SCREEN_SIZE;
  }

  public static isAtLeastSmallScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return width >= Utils.getMinSmallScreenSize();
  }

  public static isAtLeastMediumScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return width >= Utils.getMinMediumScreenSize();
  }

  public static handlePromiseError(error: any): Promise<any> {
    console.error(error);
    return Promise.reject();
  }
}
