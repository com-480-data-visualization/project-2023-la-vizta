import pandas as pd

# TODO: would have been better using: https://developers.google.com/public-data/docs/canonical/countries_csv?hl=en ? 

isos = list(pd.read_json('countries.json')[0])

# From: https://github.com/gavinr/world-countries-centroids
centroids = pd.read_csv('centroids.csv')
df = centroids[centroids.apply(lambda x: x['ISO'] in isos, axis=1)]
print(list(df['ISO']))
df = df.drop(['COUNTRYAFF', 'AFF_ISO'], axis=1)
df = df.rename(columns={"latitude": "lat", "longitude": "lng", "COUNTRY": "name", "ISO": "iso"})
df.to_csv('centroids_processed.csv', index=False)

diff = set(isos).difference(set(df['iso']))
got_all_countries = len(diff) == 0
print('Got all countries:', got_all_countries, "\nMissing:", diff)