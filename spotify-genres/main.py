import os
import spotipy
import pandas as pd
from tqdm import tqdm
from spotipy.oauth2 import SpotifyClientCredentials, SpotifyOAuth
from dotenv import load_dotenv
load_dotenv()

from database import insert_db, select_db

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

manager = SpotifyClientCredentials(CLIENT_ID, CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=manager)


def fetch_genres(ids: list):
    genres = []
    for id in tqdm(ids):
        track = sp.track(id)
        albums_id = track['album']['id']
        album = sp.album(albums_id)
        if len(album['genres']) > 0:
            genres.append(album['genres'])
        else:
            artist_id = track['artists'][0]['id']
            artist = sp.artist(artist_id)
            genres.append(artist['genres'])
    return genres

def query_tracks(df):
    genres = fetch_genres(df['url'])
    df['genres'] = genres
    df.to_csv('./genres.csv', index=False, mode='a', header=False) 


# query = f"select distinct on (url) title, artist, url from spotify_charts group by (title, artist, url)"
# res = select_db(query)
# res['url'] = res['url'].apply(lambda x: x.replace('https://open.spotify.com/track/', ''))
# res.to_csv('./cached_db.csv', index=False) 

res = pd.read_csv('cached_db.csv')

start = pd.read_csv('genres.csv')
computed = start.shape[0]

samples = 100
rows = res.shape[0] - computed

print(computed, rows, samples)

for i in tqdm(range(computed, rows, samples)):
    df = res.take(range(i, i + samples))
    query_tracks(df)