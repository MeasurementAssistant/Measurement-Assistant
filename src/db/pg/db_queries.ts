export const getSizeShoesCm = (footLength: number, sex: string): string => `
select scs.uk "UK", scs.usa "USA", scs.eu "EU", scs.cm, scs.inch inch, sx.type "Sex"
from sizechartshoes scs, sexes sx
where scs.cm>=${footLength}
and sx.type='${sex}'
and scs.sex_id=sx._id
order by scs.cm limit 1;`;

export const getSizeShoesIn = (footLength: number, sex: string): string => `
select scs.uk "UK", scs.usa "USA", scs.eu "EU", scs.cm, scs.inch inch, sx.type "Sex"
from sizechartshoes scs, sexes sx
where scs.inch>=${footLength}
and sx.type='${sex}'
and scs.sex_id=sx._id
order by scs.inch limit 1;`;
