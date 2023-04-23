
import json
from database import insert_db

with open('relations_simplified.json') as f:
    data = json.load(f)
    query = """
    INSERT into country(id, name, geom) VALUES
    """
    args = [(int(x['id']), x['name'], str(x['feature']['geometry'])) for x in data]
    insert_db(query, args)
    