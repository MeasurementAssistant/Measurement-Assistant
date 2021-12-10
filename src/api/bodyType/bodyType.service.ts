import HttpError from '../../errors/httpErrors';

class BodyType {
  getBodyTypeforMeasurements(
    bustSize: number,
    waistSize: number,
    hipsSize: number,
    sex: string,
    unit: string
  ): { [key: string]: string } {
    try {
      const bodyType: string = this.bodyTypeCalculator(bustSize, waistSize, hipsSize, unit);
      const description: string = this.bodyTypeDescription(bodyType, sex);
      return { bodyType, description };
    } catch (error) {
      throw new HttpError(<string>error);
    }
  }

  private bodyTypeCalculator(
    bustSize: number,
    waistSize: number,
    hipsSize: number,
    measure: string
  ): string {
    const k: number = measure == 'cm' ? 2.54 : 1;
    let bodyType = 'You have mixed body type';
    if (
      bustSize - hipsSize <= 1 * k &&
      hipsSize - bustSize < 3.6 * k &&
      (bustSize - waistSize >= 9 * k || hipsSize - waistSize >= 10 * k)
    ) {
      bodyType = 'X Shape';
    }
    if (hipsSize - bustSize >= 3.6 * k && hipsSize - waistSize < 9 * k) {
      bodyType = 'A Shape';
    }
    if (bustSize - hipsSize >= 3.6 * k && bustSize - waistSize < 9 * k) {
      bodyType = 'V Shape';
    }
    if (
      hipsSize - bustSize < 3.6 * k &&
      bustSize - hipsSize < 3.6 * k &&
      bustSize - waistSize < 9 * k &&
      hipsSize - waistSize < 10 * k
    ) {
      bodyType = 'I Shape ';
    }
    return bodyType;
  }

  private bodyTypeDescription(bodyType: string, sex: string): string {
    let description =
      'There are very wide ranges of actual sizes within each shape. Also, some body shapes may not fit into any of the shapes listed below:A Shape, V Shape, X Shape, I Shape';
    if (bodyType === 'X Shape' && sex === 'female') {
      description =
        'The X shape body has shoulders and hips relatively the same size, and a defined waist. The widest part of the body is the thighs, not the bottom, when viewed from the front.';
    } else if (bodyType === 'A Shape' && sex === 'female') {
      description =
        'This is the the classic womanly shape of the A, which has the healthiest distribution of fat and the least likely to have heart disease (you lucky things!). The A shape woman has shoulders that are narrower than her hips and thighs.';
    } else if (bodyType === 'V Shape' && sex === 'female') {
      description =
        'If you have a V shape body or an an Inverted Triangle Body Shape your hips are narrower than your shoulders. your waist may go in slightly, or be a bit straighter, but the main defining feature of your shape is the different proportions of shoulders and hips.';
    } else if (bodyType === 'I Shape ' && sex === 'female') {
      description =
        'You know you have a straight body type if you have the same measurements for all sections of your body. This body type is popularly known as the supermodel body. It is also called a rectangular or ruler body. Since it does not have a well-defined waistline, the body tends to look straight.';
    } else if (bodyType === 'X Shape' && sex === 'male') {
      description =
        'The X shape body has shoulders and hips relatively the same size, and a neat waist. The widest part of the body is often the thighs, when viewed from the front. If this is your body type, as a man, you’ll find  you’re well suited to strength training and probably build muscle easily. Make sure you build those enviable thigh, calf and buttock muscles as well as your arms and shoulders. Careful never to let it go to fat though as your body tpe lays down fat easily. And you may be prone to eat too many sugary carbs. Stick to low carb diets if you can.';
    } else if (bodyType === 'A Shape' && sex === 'male') {
      description =
        'The A shape man has shoulders that are narrower than his hips and thighs. Whilst not the classic V that many men strive for, you do have the healthiest distribution of fat and are the least likely to have heart disease (you lucky thing!). Cardio exercise will help with fat distribution and concentrate your weight training efforts in the gym on your upper body. Pec, lats and shoulder workouts as well as arms are crucial for this body type.';
    } else if (bodyType === 'V Shape' && sex === 'male') {
      description =
        'If you have a V shape body or an an Inverted Triangle Body Shape your hips are narrower than your shoulders. your waist may go in slightly, or be a bit straighter, but the main defining feature of your shape is the different proportions of shoulders and hips. This is the classic Superman body type. Remember to work out those legs though as well as your upper body, to avoid chicken legs!';
    } else if (bodyType === 'I Shape ' && sex === 'male') {
      description =
        'The I body type is often skinny – think Russell Brand, but not always. David Beckham is an I type and looks great – but he’s clearly worked at it. You’ll adapt really well to cardio execise and, whilst muscle will build smaller, you can appear lean and fit. If you’re overweight, you’ll probably find you carry the excess weight evenly. This often means you’ll lose it evenly too.';
    }
    return description;
  }
}

export default BodyType;
