
import pandas as pd

from database import select_db

tracks = select_db("select * from tracks")

df = pd.read_csv('genres_spotify.csv')

df = pd.merge(df, tracks, how='left', left_on=['title','artist'], right_on = ['title','artist'])
df['id'] = [id if id != 'NaN' else df['url'][i].replace('', '') for i, row in df.]
df = df.drop(['url'], axis=1)
# df = df.rename(columns={'id_x': 'id'})

df.to_csv('data_processed_spotify.csv', index=False)
