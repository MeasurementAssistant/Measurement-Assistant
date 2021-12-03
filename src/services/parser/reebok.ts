import axios from 'axios';
import cheerio, { CheerioAPI } from 'cheerio';

const url = 'https://www.reebok.ru/help-topics-size_charts.html';

export const getReebokSizeChart = async (
  type: string
): Promise<Array<{ [key: string]: number | string }>> => {
  let result: Array<{ [key: string]: number | string }> = [];
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

const getData = (html: string, type: string) => {
  const result: Array<{ [key: string]: string | number }> = [];
  const $ = cheerio.load(html);
  if (type == 'shoes') {
    convertShoesToResult(result, $, 'm');
    convertShoesToResult(result, $, 'w');
  } else {
    convertClothesToResult(result, $, 'm');
    convertClothesToResult(result, $, 'w');
  }
  return result;
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
      Sex: letter == 'm' ? 'male' : 'female',
      cm: Number(data[i + 2].split(' cm')[0])
    });
  }
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
      WaistCm: Number(data[i + 2]),
      HipsCm: Number(data[i + 3]),
      Sex: letter == 'm' ? 'male' : 'female'
    });
  }
};
