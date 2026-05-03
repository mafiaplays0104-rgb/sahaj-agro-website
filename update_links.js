const fs = require('fs');
let html = fs.readFileSync('urad-dal-recipe.html', 'utf8');

const links = [
    'urad-dal-idli-recipe.html',
    'urad-dal-dosa-recipe.html',
    'urad-dal-makhani-recipe.html',
    'urad-dal-medu-vada-recipe.html',
    'urad-dal-papad-recipe.html',
    'urad-dal-khichdi-recipe.html',
    'urad-dal-bedmi-puri-recipe.html',
    'urad-dal-dahi-vada-recipe.html',
    'urad-dal-kachori-recipe.html',
    'urad-dal-bisi-bele-bath-recipe.html',
    'urad-dal-uttapam-recipe.html',
    'urad-dal-halwa-recipe.html'
];

for (let link of links) {
    html = html.replace('<a href="#"', `<a href="${link}"`);
}

fs.writeFileSync('urad-dal-recipe.html', html);
console.log('Links sequentially updated');
