// eslint-disable-next-line @typescript-eslint/no-unused-vars
export class Helper {
  static toLowerCaseKeys(obj: any): any {
    if (typeof obj !== 'object' || obj === null) {
      return obj;
    }

    if (Array.isArray(obj)) {
      return obj.map((item) => Helper.toLowerCaseKeys(item));
    }

    return Object.keys(obj).reduce((acc, key) => {
      const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
      acc[lowerCaseKey] = Helper.toLowerCaseKeys(obj[key]);
      return acc;
    }, {} as any);
  }
}
