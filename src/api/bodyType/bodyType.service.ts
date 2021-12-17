import HttpError from '../../errors/httpErrors';
import { configureI18n } from '../../i18n.config';

const [i18nObj] = configureI18n(false);

class BodyType {
  getBodyTypeforMeasurements(
    bustSize: number,
    waistSize: number,
    hipsSize: number,
    sex: string,
    unit: string,
    returnKey = false,
    lang?: string
  ): { [key: string]: string } {
    try {
      if (lang && !returnKey) {
        i18nObj.setLocale(lang);
      }
      const bodyType = this.findOutBodyType(bustSize, waistSize, hipsSize, unit);
      const description = i18nObj.__(`description.${sex}.${bodyType.replace(' ', '')}`);

      if (returnKey) {
        return {
          bodyType: i18nObj.__(`bodyType.${bodyType.replace(' ', '')}`),
          description,
          sex,
          bodyTypeEn: bodyType
        };
      }
      return { bodyType: i18nObj.__(`bodyType.${bodyType.replace(' ', '')}`), description };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  private findOutBodyType(
    bustSize: number,
    waistSize: number,
    hipsSize: number,
    unit: string
  ): string {
    const k: number = unit == 'cm' ? 2.54 : 1;
    if (
      bustSize - hipsSize <= 1 * k &&
      hipsSize - bustSize < 3.6 * k &&
      (bustSize - waistSize >= 9 * k || hipsSize - waistSize >= 10 * k)
    ) {
      return 'X Shape';
    }
    if (hipsSize - bustSize >= 3.6 * k && hipsSize - waistSize < 9 * k) {
      return 'A Shape';
    }
    if (bustSize - hipsSize >= 3.6 * k && bustSize - waistSize < 9 * k) {
      return 'V Shape';
    }
    if (
      hipsSize - bustSize < 3.6 * k &&
      bustSize - hipsSize < 3.6 * k &&
      bustSize - waistSize < 9 * k &&
      hipsSize - waistSize < 10 * k
    ) {
      return 'I Shape';
    }
    return 'Mixed Shape';
  }
}
export default BodyType;
