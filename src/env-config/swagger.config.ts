import envConfig from '.';

export default {
  routePrefix: '/documentation',
  exposeRoute: true,
  swagger: {
    info: {
      title: 'Measurement-Assistant',
      description:
        'A web service, which helps you choose the right size for clothes or shoes based on your parameters for most size charts, including following brands: Adidas, Reebok.\n\n' +
        '- API Authentication with access_key'.bold() +
        '\n\n' +
        '- API Features for Guest-user:'.bold() +
        '\n' +
        '- Find out the right size for clothes or shoes, based on your parameters for most international size charts, including well-known brands (e.g. reebok, adidas)\n' +
        '- Find out your body type, based on parameters\n\n' +
        '- API Features for Authorized-user:'.bold() +
        '\n\n' +
        '- Do all things that Unauthorized user can do\n' +
        '- Create a file (excel, pdf) with your parameters, international sizes and body type\n\n' +
        'Options:'.bold().italics() +
        '\n\n' +
        '- Units Parameter:'.italics() +
        '\n\n' +
        '- Imperial units (in)\n' +
        '- Metric units (cm)\n\n' +
        '- Language Parameter:'.italics() +
        '\n' +
        'The API is capable of delivering results in a total of 10 world languages. To change the default value (English) to another language, simply attach the language parameter to your API URL and set it to the 2-letter ISO Code of your preferred language.\n\n' +
        'Supported Languages'.italics() +
        '\n\n' +
        '- Ukrainian\n' +
        '- Russian\n' +
        '- Spanish\n' +
        '- French\n' +
        '- German\n' +
        '- Italian\n' +
        '- Polish\n' +
        '- Korean\n' +
        '- Japanese\n' +
        '- Portuguese\n',
      version: '0.1.0'
    },
    host:
      process.env.NODE_ENV == 'production'
        ? envConfig.domain
        : `${envConfig.host}:${envConfig.port}`,
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json']
  }
};
