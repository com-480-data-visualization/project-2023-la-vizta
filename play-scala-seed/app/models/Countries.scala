package models

import models.Types.{CountryId, Geometry, ISO, Lat, Lng, Region}

case class Countries(
                  id: CountryId,
                  iso: ISO,
                  name: Region,
                  lat: Lat,
                  lng: Lng,
                  geom: Geometry );
