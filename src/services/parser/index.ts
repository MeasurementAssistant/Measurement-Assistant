import axios from 'axios';
import cheerio from 'cheerio';

const url = 'https://www.adidas.ru/help-topics-size_charts.html';

export const getAdidasSizeChart = () => {
  axios
    .get(url)
    .then((response) => {
      getData(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
};

const getData = (html: string) => {
  const result: Array<{ [key: string]: string | number }> = [];
  const data: Array<string> = [];
  const $ = cheerio.load(html);

  $(
    'div#tabs-4 div#content-asset-size-chart-size-shoes div.contentasset div.size_chart.shoes div.size_chart_content div.size_chart_table table tbody tr:not(:first-of-type) td'
  ).each((i, elem) => {
    data.push($(elem).text());
  });

  for (let i = 0; i < data.length; i += 6) {
    result.push({
      RU: Number(data[i].split('RU')[0]),
      EU: data[i + 1],
      USmale: Number(data[i + 2]),
      USfemale: data[i + 3] == '-' ? 0 : Number(data[i + 3]),
      UK: Number(data[i + 4]),
      cm: Number(data[i + 5].split('см')[0])
    });
  }
  return result;
};
getAdidasSizeChart();
