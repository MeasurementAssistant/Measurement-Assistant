export const getSizeShoes = (footLength: number, sex: string, unit: string): string => `
select scs.uk "UK", scs.usa "USA", scs.eu "EU", scs.cm, scs.inch inch, sx.type "Sex"
from size_chart_shoes scs, sexes sx
where scs.${unit}>=${footLength}
and sx.type='${sex}'
and scs.sex_id=sx._id
order by scs.${unit} limit 1;`;

export const insertARShoes = (values: string, name: string): string => `
insert into size_chart_shoes_${name}(
    ru, eu, usa, uk, sex_id, cm, inch, expired_date)
values ${values};`;

export const getSizeShoesAR = (
  footLength: number,
  sex: string,
  unit: string,
  name: string
): string => `
select scs.ru "RU", scs.eu "EU",  scs.uk "UK", scs.usa "USA", scs.cm, scs.inch inch, sx.type "Sex"
from size_chart_shoes_${name} scs, sexes sx
where scs.${unit}>=${footLength}
and sx.type='${sex}'
and scs.sex_id=sx._id
order by scs.${unit} limit 1;`;

export const getExpiredDate = (name: string) =>
  `select scs.expired_date from size_chart_shoes_${name} scs limit 1;`;

export const deleteDataFromTableAR = (name: string) => `DELETE from size_chart_shoes_${name};`;
