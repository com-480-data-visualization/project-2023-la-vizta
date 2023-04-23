const fs = require('fs');
const query_overpass = require('query-overpass')

const countries = [
    "Andorra", "Argentina", "Australia", "Austria", "Belgium", "Bolivia", "Brazil", "Bulgaria", "Canada", 
    "Chile", "Colombia", "Costa Rica", "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", 
    "Egypt", "El Salvador", "Estonia", "Finland", "France", "Germany", "Global", "Greece", "Guatemala", 
    "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Ireland", "Israel", "Italy", 
    "Japan", "Latvia", "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", 
    "Nicaragua", "Norway", "Panama", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Romania", 
    "Russia", "Saudi Arabia", "Singapore", "Slovakia", "South Africa", "South Korea", "Spain", "Sweden", 
    "Switzerland", "Taiwan", "Thailand", "Turkey", "Ukraine", "United Arab Emirates", "United Kingdom", 
    "United States", "Uruguay", "Vietnam"
]

const query = '[out:json];relation["boundary"="administrative"]["admin_level"="2"];out body;>;out skel qt;'

const callback = (err, data) => {
    if (err)
    {
        console.log(err);
        return
    }

    const relations = data.features.filter( f => {
        const ee = f.properties.tags['name:ee']
        const en = f.properties.tags['name:en']
        const g = { ...f.geometry }
        delete g.coordinates
        return f.properties.type === 'relation' && (countries.includes(ee) || countries.includes(en))
    } )

    const relations_db = relations.map( r => ({id: r.properties.id, ee: r.properties.tags['name:ee'], en: r.properties.tags['name:en'], geometry: r.geometry}))
    const json = JSON.stringify(relations_db, null, 4);
    fs.writeFileSync('relations.json', json);
}
const options = {}
query_overpass(query, callback, options)
