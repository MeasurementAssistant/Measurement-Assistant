import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.adidas.ru/help-topics-size_charts.html';

export const getAdidasSizeChart = async (type: string): Promise<string> => {
  let resultClothes = '';
  await axios
    .get(url)
    .then((response) => {
      resultClothes =
        type == 'clothes' ? getClothesData(response.data) : getShoesData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
  return resultClothes;
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

const getClothesData = (html: string) => {
  const result: Array<{ [key: string]: number | string }> = [];
  const dataM: Array<string> = [];
  const dataF: Array<string> = [];
  const $ = cheerio.load(html);
  $(
    'div#tabs-4 div#content-asset-size-chart-size-apparel.sizechart div.contentasset div.size_chart.man div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td'
  ).each((i, elem) => {
    dataM.push($(elem).text());
  });
  for (let i = 0; i < dataM.length - 4; i += 4) {
    result.push(
      {
        RU: Number(dataM[i].slice(-5, -3)),
        EU: dataM[i].slice(0, 2),
        BustCm: Number(dataM[i + 1].split('-')[0]),
        BustInch: (Number(dataM[i + 1].split('-')[0]) / 2.54).toFixed(2),
        WaistCm: Number(dataM[i + 2].split('-')[0]),
        WaistInch: (Number(dataM[i + 2].split('-')[0]) / 2.54).toFixed(2),
        HipsCm: Number(dataM[i + 3].split('-')[0]),
        HipsInch: (Number(dataM[i + 3].split('-')[0]) / 2.54).toFixed(2),
        sexId: 2
      },
      {
        RU: Number(dataM[i].slice(-8, -5)),
        EU: dataM[i].slice(0, 2),
        BustCm: Number(dataM[i + 1].split('-')[1].replace(' см', '')),
        BustInch: (Number(dataM[i + 1].split('-')[1].replace(' см', '')) / 2.54).toFixed(2),
        WaistCm: Number(dataM[i + 2].split('-')[1].replace(' см', '')),
        WaistInch: (Number(dataM[i + 2].split('-')[1].replace(' см', '')) / 2.54).toFixed(2),
        HipsCm: Number(dataM[i + 3].split('-')[1].replace(' см', '')),
        HipsInch: (Number(dataM[i + 3].split('-')[1].replace(' см', '')) / 2.54).toFixed(2),
        sexId: 2
      }
    );
  }
  $(
    'div#tabs-4 div#content-asset-size-chart-size-women-apparel.sizechart div.contentasset div.size_chart.man div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td'
  ).each((i, elem) => {
    dataF.push($(elem).text());
  });
  for (let i = 0; i < dataF.length - 6; i += 6) {
    result.push({
      RU: Number(dataF[i].slice(0, 2)),
      EU: dataF[i + 1],
      BustCm: Number(dataF[i + 3].split(' cm')[0]),
      BustInch: (Number(dataF[i + 3].split(' cm')[0]) / 2.54).toFixed(2),
      WaistCm: Number(dataF[i + 4].split(' cm')[0]),
      WaistInch: (Number(dataF[i + 4].split(' cm')[0]) / 2.54).toFixed(2),
      HipsCm: Number(dataF[i + 5].split(' cm')[0]),
      HipsInch: (Number(dataF[i + 5].split(' cm')[0]) / 2.54).toFixed(2),
      sexId: 1
    });
  }
  const now = new Date();
  now.setDate(now.getDate() + 3);
  return result
    .map(
      (el) =>
        `(${el.RU},'${el.EU}',${el.BustCm},${el.BustInch},${el.WaistCm},${el.WaistInch},
          ${el.HipsCm},${el.HipsInch},${el.sexId},'${now.toISOString()}')`
    )
    .join(',');
};
getAdidasSizeChart('clothes');
