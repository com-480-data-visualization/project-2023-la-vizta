
import pandas as pd
import json

from database import select_db

def transform_genres(genres):
    genres = genres.replace('\'', '"')
    genres = json.loads(genres)

    genres.remove('Music')
    if 'Singer/Songwriter' in genres:
        genres.remove('Singer/Songwriter')
    if 'Soundtrack' in genres:
        genres.remove('Soundtrack')

    return ','.join(genres)

df = pd.read_csv('genres_shazam.csv')
df['genres'] = df['genres'].apply(transform_genres)

tracks = select_db("select * from tracks")

df = pd.merge(df, tracks, how='left', left_on=['title','artist'], right_on = ['title','artist'])
df['id'] = [
    row['id'] if isinstance(row['id'], str) else row['url'].replace('https://open.spotify.com/track/', '') 
    for _, row in df.iterrows()
]
df = df.drop(['url'], axis=1)
df.to_csv('data_processed_shazam.csv', index=False)
