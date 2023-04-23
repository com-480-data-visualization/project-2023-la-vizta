
import pandas as pd
import json

df = pd.read_csv('data.csv')
data = df.copy()

all_genres = ["" for _ in range(df.shape[0])]

for i, row in df.iterrows():
    genres = row['genres'].replace('\'', '"')
    genres = json.loads(genres)

    genres.remove('Music')
    if 'Singer/Songwriter' in genres:
        genres.remove('Singer/Songwriter')
    if 'Soundtrack' in genres:
        genres.remove('Soundtrack')

    if len(genres) == 0 and row['title'] == 'Outnumbered':
        genres = ["Pop"]
    if len(genres) == 0 and row['title'] == 'Shallow':
        genres = ["Pop/Rock"]

    main_genre = genres[0]
    if main_genre == 'Urbano latino' or main_genre == 'Latin' or main_genre == 'Pop Latino':
        main_genre = 'Latino'
    all_genres[i] = main_genre

data['genres'] = all_genres
data.to_csv('data_processed.csv')
