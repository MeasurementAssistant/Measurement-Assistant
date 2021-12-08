import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.adidas.ru/help-topics-size_charts.html';

export const getAdidasSizeChartShoes = async (): Promise<string> => {
  let resultShoes = '';
  await axios
    .get(url)
    .then((response) => {
      resultShoes = getShoesData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return resultShoes;
};

const getShoesData = (html: string) => {
  const result: Array<{ [key: string]: string | number }> = [];
  const data: Array<string> = [];
  const $ = cheerio.load(html);
  $(
    'div#tabs-4 div#content-asset-size-chart-size-shoes div.contentasset div.size_chart.shoes div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td'
  ).each((i, elem) => {
    data.push($(elem).text());
  });
  for (let i = 0; i < data.length; i += 6) {
    result.push(
      {
        RU: Number(data[i].split('RU')[0]),
        EU: data[i + 1],
        USA: data[i + 3] == '-' ? 0 : Number(data[i + 3]),
        sexId: 1,
        UK: Number(data[i + 4]),
        cm: Number(data[i + 5].split('см')[0]),
        inch: (Number(data[i + 5].split('см')[0]) / 2.54).toFixed(2)
      },
      {
        RU: Number(data[i].split('RU')[0]),
        EU: data[i + 1],
        USA: Number(data[i + 2]),
        sexId: 2,
        UK: Number(data[i + 4]),
        cm: Number(data[i + 5].split('см')[0]),
        inch: (Number(data[i + 5].split('см')[0]) / 2.54).toFixed(2)
      }
    );
  }
  const now = new Date();
  now.setDate(now.getDate() + 3);
  return result
    .map(
      (el) =>
        `(${el.RU},'${el.EU}',${el.USA},${el.UK},${el.sexId},${el.cm}, 
          ${el.inch},'${now.toISOString()}')`
    )
    .join(',');
};

export const getAdidasSizeChartClothesMale = async (): Promise<
  Array<{ [key: string]: { [key: string]: number | string } }>
> => {
  let resultClothes: Array<{ [key: string]: { [key: string]: number | string } }> = [];
  await axios
    .get(url)
    .then((response) => {
      resultClothes = getClothesDataMale(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return resultClothes;
};

export const getAdidasSizeChartClothesFemale = async (): Promise<
  Array<{ [key: string]: string | number }>
> => {
  let resultClothes: Array<{ [key: string]: string | number }> = [];
  await axios
    .get(url)
    .then((response) => {
      resultClothes = getClothesDataFemale(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return resultClothes;
};

const getClothesDataMale = (html: string) => {
  const result: Array<{ [key: string]: { [key: string]: number | string } }> = [];
  const data: Array<string> = [];
  const $ = cheerio.load(html);
  $(
    'div#tabs-4 div#content-asset-size-chart-size-apparel.sizechart div.contentasset div.size_chart.man div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td'
  ).each((i, elem) => {
    data.push($(elem).text());
  });
  for (let i = 0; i < data.length - 4; i += 4) {
    result.push({
      sizes: {
        RU: data[i].substring(0, data[i].length - 5),
        EU: data[i].substring(data[i].length - 5)
      },
      BustCm: {
        from: Number(data[i + 1].split('-')[0]),
        to: Number(data[i + 1].split('-')[1].replace(' см', ''))
      },
      WaistCm: {
        from: Number(data[i + 2].split('-')[0]),
        to: Number(data[i + 2].split('-')[1].replace(' см', ''))
      },
      HipsCm: {
        from: Number(data[i + 3].split('-')[0]),
        to: Number(data[i + 3].split('-')[1].replace(' см', ''))
      }
    });
  }
  return result;
};

const getClothesDataFemale = (html: string) => {
  const result: Array<{ [key: string]: string | number }> = [];
  const data: Array<string> = [];
  const $ = cheerio.load(html);
  $(
    'div#tabs-4 div#content-asset-size-chart-size-women-apparel.sizechart div.contentasset div.size_chart.man div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td'
  ).each((i, elem) => {
    data.push($(elem).text());
  });
  for (let i = 0; i < data.length - 6; i += 6) {
    result.push({
      RU: Number(data[i]),
      EU: data[i + 1],
      BustCm: Number(data[i + 3].split(' cm')[0]),
      WaistCm: Number(data[i + 4].split(' cm')[0]),
      HipsCm: Number(data[i + 5].split(' cm')[0]),
      Sex: 'female'
    });
  }
  return result;
};
