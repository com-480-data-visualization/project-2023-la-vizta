import pandas as pd
import spotipy
from spotipy.oauth2 import SpotifyClientCredentials
import os

from dotenv import load_dotenv
load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')

manager = SpotifyClientCredentials(CLIENT_ID, CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=manager)


def fetch_genres(ids):
    genres = []
    # genres1 = []
    # genres2 = []
    # genres3 = []
    # def add_genres(genresList, newGenres, i):
    #     if len(newGenres) >= i + 1:
    #         genresList.append(newGenres[i])
    #     else:
    #         genresList.append(None)

    def add_all_genres(newGenres):
        if 'Music' in newGenres:
            newGenres.remove('Music')
        genres.append(newGenres)
        # add_genres(genres1, newGenres, 0)
        # add_genres(genres2, newGenres, 1)
        # add_genres(genres3, newGenres, 2)
        # print(newGenres)

    for id in ids:
        track = sp.track(id)
        albums_id = track['album']['id']
        album = sp.album(albums_id)
        if len(album['genres']) > 0:
            add_all_genres(album['genres'])
        else:
            artist_id = track['artists'][0]['id']
            artist = sp.artist(artist_id)
            add_all_genres(artist['genres'])
    return genres # genres1, genres2, genres3

def query_tracks(df):
    ids = df['url'].apply(lambda x: x.replace('https://open.spotify.com/track/', ''))
    # genres1, genres2, genres3 = fetch_genres(ids)
    genres = fetch_genres(ids)
    df['genres'] = genres
    # df['genre1'] = genres1
    # df['genre2'] = genres2
    # df['genre3'] = genres3
    df.to_csv('./genres_spotify.csv', index=False, mode='a', header=False) 

if __name__ == '__main__':
    cached = pd.read_csv('./cached_db.csv')
    cached = cached.drop(['avg'], axis=1)

    start = pd.read_csv('./genres_spotify.csv')
    computed = start.shape[0]

    print(computed)

    samples = 5
    rows = cached.shape[0] - computed

    for i in range(computed, rows, samples):
        df = cached.take(range(i, i + samples))
        query_tracks(df)

    