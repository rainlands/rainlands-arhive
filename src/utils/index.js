// export renderMap from './renderMap';
// export * as controls from './controls';
// export objectGenerator from './objectGenerator';
// export * as lights from './lights';

module.exports = {
  renderMap: require('./renderMap').default,
  objectGenerator: require('./objectGenerator').default,
  createRandomChunkedMap: require('./createRandomChunkedMap').default,
  stats: require('./stats').default,
  controls: require('./controls'),
  lights: require('./lights'),
}
