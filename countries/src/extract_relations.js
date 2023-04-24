const fs = require('fs');

// "Andorra", "Argentina", "Australia", "Austria", "Belgium", "Bolivia", "Brazil", "Bulgaria", "Canada", 
// "Chile", "Colombia", "Costa Rica", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", 
// "Egypt", "El Salvador", "Estonia", "Finland", "France", "Germany", "Global", "Greece", "Guatemala", 
// "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", 
// "Japan", "Latvia", "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", 
// "Nicaragua", "Norway", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Romania", 
// "Russia", "Saudi Arabia", "Singapore", "Slovakia", "South Africa", "South Korea", "Spain", "Sweden", 
// "Switzerland", "Taiwan", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", 
// "United States", "Uruguay", "Vietnam"

const countries = JSON.parse( fs.readFileSync('countries.json') )
const data = JSON.parse( fs.readFileSync('overpass_data.json') )

const relations = data.features.filter( f => {
    const iso = f.properties.tags['ISO3166-1']
    return f.properties.type === 'relation' && countries.includes(iso)
} )

console.log("Got all:", relations.length == countries.length);

const relations_db = relations.map( r => ({
    id: r.properties.id, 
    iso: r.properties.tags['ISO3166-1'], 
    geometry: r.geometry
}))

const json = JSON.stringify(relations_db, null, 4);
fs.writeFileSync('relations.json', json);
