export const getSizeShoes = (footLength: number, sex: string, unit: string): string => `
  select scs.uk "UK", scs.usa "USA", scs.eu "EU", scs.cm, scs.inch inch, sx.type "Sex"
  from size_chart_shoes scs, sexes sx
  where scs.${unit}>=${footLength}
  and sx.type='${sex}'
  and scs.sex_id=sx._id
  order by scs.${unit} limit 1;`;

export const getSizeClothes = (
  bustSize: number,
  waistSize: number,
  hipsSize: number,
  sex: string,
  unit: string
): string => `
  select scs.eu "EU", scs.uk "UK", scs.usa "USA", scs.international "International", sx.type "Sex", 
  scs.bustcm "BustCm", scs.bustinch "BustInch", 
  scs.waistcm "WaistCm", scs.waistinch "WaistInch", 
  scs.hipscm "HipsCm", scs.hipsinch "HipsInch"
  from size_chart_clothes scs, sexes sx
  where scs.bust${unit}>=${bustSize}
  and scs.waist${unit}>=${waistSize}
  and scs.hips${unit}>=${hipsSize}
  and sx.type='${sex}'
  and scs.sex_id = sx._id
  order by scs.waist${unit} limit 1;`;

export const insertARShoes = (values: string, name: string): string => `
  insert into size_chart_shoes_${name}(
      ru, eu, usa, uk, sex_id, cm, inch, expired_date)
  values ${values};`;

export const insertARClothes = (values: string, name: string): string => `
  insert into size_chart_clothes_${name}(
    ru, eu, bustcm, bustinch, waistcm, waistinch,
    hipscm, hipsinch, sex_id, expired_date)
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

export const getSizeClothesAR = (
  bustSize: number,
  waistSize: number,
  hipsSize: number,
  sex: string,
  unit: string,
  name: string
): string => `
  select scs.ru "RU", scs.eu "EU",
  scs.bustcm "BustCm", scs.bustinch "BustInch", 
  scs.waistcm "WaistCm", scs.waistinch "WaistInch", 
  scs.hipscm "HipsCm", scs.hipsinch "HipsInch",
  sx.type "Sex"
  from size_chart_clothes_${name} scs, sexes sx
  where scs.bust${unit}>=${bustSize}
  and scs.waist${unit}>=${waistSize}
  and scs.hips${unit}>=${hipsSize}
  and sx.type='${sex}'
  and scs.sex_id=sx._id
  order by scs.waist${unit} limit 1;`;

export const getShoesExpiredDate = (name: string) =>
  `select scs.expired_date from size_chart_shoes_${name} scs limit 1;`;

export const getClothesExpiredDate = (name: string) =>
  `select scs.expired_date from size_chart_clothes_${name} scs limit 1;`;

export const deleteDataFromShoesTableAR = (name: string) => `DELETE from size_chart_shoes_${name};`;

export const deleteDataFromClothesTableAR = (name: string) =>
  `DELETE from size_chart_clothes_${name};`;

export const createAccessKey = (accessKey: string): string => `
  insert into access_keys (value)
  values ('${accessKey}') returning _id`;

export const updateAccessKey = (accessKey: string, id: number): string => `
  update access_keys
  set value = '${accessKey}' 
  where _id = ${id}`;

export const findUserAccessKeyId = (username: string): string => `
  select u.access_key_id "accessKeyId" from users u where u.username = '${username}';`;

export const createUser = (username: string, accessKeyId: number): string => `
  insert into users(username, role_id, access_key_id)
  values ('${username}',1,${accessKeyId});`;

export const findUser = (username: string): string => `
  select * from users u where u.username = '${username}';`;

export const getUserInfo = (username: string) => `
  select u.username, ak.value "accessKey" 
  from users u, access_keys ak 
  where u.username = '${username}' 
  and u.access_key_id = ak._id;`;

export const findAccessKey = (accessKey: string) => `
select * from access_keys ak
where ak.value='${accessKey}';`;
