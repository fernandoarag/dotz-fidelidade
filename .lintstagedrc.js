module.exports = {
  'src/*.{js,jsx,ts,tsx}': ['biome check --apply'],
  'src/*.{json,md,html,css}': ['biome format --write'],
};

// module.exports = {
//   // Lint & Prettify TS and JS files
//   '*.{js,jsx,ts,tsx}': (filenames) => [
//     `prettier --write ${filenames.join(' ')}`,
//     `npm run lint --fix . ${filenames.join(' --file')}`,
//     `npm test -- --findRelatedTests ${filenames.join(' ')}`
//   ]
// }
