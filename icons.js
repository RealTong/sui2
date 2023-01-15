import { resolve } from 'path'
import { readFileSync } from 'fs'
import { getIconData, iconToSVG, replaceIDs } from '@iconify/utils';

const svgAttributesBase = {
  'xmlns': 'http://www.w3.org/2000/svg',
  'xmlns:xlink': 'http://www.w3.org/1999/xlink',
}

export const getIconSVG = function(name,set,color) {
  const iconPath = resolve(__dirname,  `node_modules/@iconify/json//json/${set}.json`)
  const iconsData = JSON.parse(readFileSync(iconPath))

  const icon = getIconData(iconsData, name)
  if (!icon) return
  const renderData = iconToSVG(icon, {
    height: 'auto',
  });

  const svgAttributes = {
    ...svgAttributesBase,
    ...renderData.attributes,
    color: color?color:"",
  };

  const svgAttributesStr = Object.keys(svgAttributes)
    .map(
      (attr) => `${attr}="${svgAttributes[attr]}"`
    )
    .join(' ');
  console.log(svgAttributesStr)

  // Generate SVG
  const svg = `<svg ${svgAttributesStr}>${replaceIDs(renderData.body)}</svg>`;
  return svg
}
