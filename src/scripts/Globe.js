// Gen random data
const N = 10;
const arcsData = [...Array(N).keys()].map(() => ({
  startLat: (Math.random() - 0.5) * 180,
  startLng: (Math.random() - 0.5) * 360,
  endLat: (Math.random() - 0.5) * 180,
  endLng: (Math.random() - 0.5) * 360,
  color: [['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)], ['red', 'pink', 'white', 'magenta'][Math.round(Math.random() * 3)]]
}));
    // const labelsData = {
    // }

Globe()
  .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
  .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
  .arcsData(arcsData)
  .arcColor('color')
  .arcDashGap(() => Math.random())
  .backgroundColor('black')
  .atmosphereColor('pink')
  // .labelsData()
  .arcDashAnimateTime(() => Math.random() * 4000 + 500)
  (document.getElementById('globeViz'))

module.exports = Globe;