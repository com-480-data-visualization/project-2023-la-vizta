import os
import spotipy
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

def query_tracks(offset: int):
    query = f"select title, artist, url from spotify_charts limit 100 offset {offset}"
    df = select_db(query)
    df['url'] = df['url'].apply(lambda x: x.replace('https://open.spotify.com/track/', ''))
    print(df)
    genres = fetch_genres(df['id'])
    print(genres)
    df['genres'] = genres
    print(df)
    df.to_csv('./genres.csv', index=False, mode='a', header=False) 


query = f"select distinct on (url) title, artist, url from spotify_charts group by (url)"
res = select_db(query)
print(res)

# query_tracks(0)