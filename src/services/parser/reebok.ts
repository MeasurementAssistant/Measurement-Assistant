import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

const url = 'https://www.reebok.ru/help-topics-size_charts.html';

export const getReebokSizeChart = async (type: string): Promise<string> => {
  let result = '';
  await axios
    .get(url)
    .then((response) => {
      result = getData(response.data, type);
    })
    .catch((error) => {
      console.log(error);
    });
  return result;
};

const getData = (html: string, type: string): string => {
  const result: Array<{ [key: string]: string | number }> = [];
  const $ = cheerio.load(html);
  let insert1,
    insert2 = '';
  if (type == 'shoes') {
    insert1 = convertShoesToResult(result, $, 'm');
    insert2 = convertShoesToResult(result, $, 'w');
  } else {
    insert1 = convertClothesToResult(result, $, 'm');
    insert2 = convertClothesToResult(result, $, 'w');
  }
  return `${insert1},${insert2}`;
};

const convertShoesToResult = (
  result: Array<{ [key: string]: string | number }>,
  $: CheerioAPI,
  letter: string
) => {
  const data: Array<string> = [];
  $(
    `div#tabs-4 div#content-asset-size-chart-size-${letter}_shoes.sizechart div.contentasset div.size_chart.shoes div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td`
  ).each((i, elem) => {
    data.push($(elem).text());
  });

  for (let i = 0; i < data.length; i += 5) {
    result.push({
      RU: Number(data[i].replace(',', '.')),
      EU: Number(data[i + 1]),
      USA: Number(data[i + 3]),
      UK: Number(data[i + 4]),
      sexId: letter == 'm' ? 2 : 1,
      cm: Number(data[i + 2].split(' cm')[0]),
      inch: (Number(data[i + 2].split(' cm')[0]) / 2.54).toFixed(2)
    });
  }
  const now = new Date();
  now.setDate(now.getDate() + 3);
  return result
    .map(
      (el) =>
        `(${el.RU},${el.EU},${el.USA},${el.UK},${el.sexId},${el.cm}, ${
          el.inch
        },'${now.toISOString()}')`
    )
    .join(',');
};

const convertClothesToResult = (
  result: Array<{ [key: string]: string | number }>,
  $: CheerioAPI,
  letter: string
) => {
  const data: Array<string> = [];
  $(
    `div#tabs-4 div#content-asset-size-chart-size-${letter}_bottoms.sizechart div.contentasset div.size_chart.man div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td`
  ).each((i, elem) => {
    data.push($(elem).text());
  });

  for (let i = 0; i < data.length - 15; i += 5) {
    result.push({
      RU: Number(data[i + 4]),
      EU: data[i],
      BustCm: Number(data[i + 1]),
      BustIn: (Number(data[i + 1]) / 2.54).toFixed(2),
      WaistCm: Number(data[i + 2]),
      WaistIn: (Number(data[i + 2]) / 2.54).toFixed(2),
      HipsCm: Number(data[i + 3]),
      HipsIn: (Number(data[i + 3]) / 2.54).toFixed(2),
      sexId: letter == 'm' ? 2 : 1
    });
  }
  const now = new Date();
  now.setDate(now.getDate() + 3);
  return result
    .map(
      (el) =>
        `(${el.RU},${el.EU},${el.BustCm},${el.BustIn},${el.WaistCm},${el.WaistIn},${el.HipsCm},${
          el.HipsIn
        },${el.sexId},${now.toISOString()})`
    )
    .join(',');
};
