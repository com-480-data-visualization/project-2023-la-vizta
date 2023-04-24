

const fs = require('fs');
const simplify = require('simplify-geojson')

const tolerance = 0.015

fs.readFile('relations.json', 'utf8', (err, data) => {
    if (err) {
		console.error(err);
		return;
    }
    const d = JSON.parse(data)
    const s_data = d.map( r => {
		const f = {"type":"Feature", "geometry": r.geometry}
		return {id: r.id, iso: r.iso, feature: simplify(f, tolerance)}
    } )
	const json = JSON.stringify(s_data, null, 2);
	fs.writeFileSync('relations_simplified.json', json);
});
