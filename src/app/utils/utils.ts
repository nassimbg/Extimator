export class Utils {

  private static MIN_LARGE_SCREEN_SIZE: number = 960;

  public static getMinLargeScreenSize(): number {
    return Utils.MIN_LARGE_SCREEN_SIZE;
  }

  public static isLargeScreen(): boolean {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

    return width >= Utils.getMinLargeScreenSize();
  }

  public static handlePromiseError(error: any): Promise<any> {
    console.log(error);
    return error;
  }
}
