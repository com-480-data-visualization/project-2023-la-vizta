const fs = require('fs');
const query_overpass = require('query-overpass')

const query = '[out:json];relation["boundary"="administrative"]["admin_level"="2"];out body;>;out skel qt;'

const callback = (err, data) => {
    if (err)
    {
        console.log(err);
        return
    }

    console.log(typeof data);

    const json = JSON.stringify(data);
    fs.writeFile('overpass_data.json', json, 'utf8');
}

query_overpass(query, callback, {})