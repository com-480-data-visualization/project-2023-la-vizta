
import pandas as pd
from database import insert_db

relations = pd.read_json('relations_simplified.json')
centroids = pd.read_csv('centroids_processed.csv')
countries = pd.merge(relations, centroids, on=['iso'])

# Update name to match region name from Spotify Charts
countries.loc[countries.name == 'Russian Federation', 'name'] = 'Russia'
countries.loc[countries.name == 'Czech Republic', 'name'] = 'Czechia'

print(countries)

query = """
INSERT into countries(id, iso, name, lat, lng, geom) VALUES
"""
args = [(int(x['id']), x['iso'], x['name'], x['lat'], x['lng'], str(x['feature']['geometry'])) for _, x in countries.iterrows()]
insert_db(query, args)
