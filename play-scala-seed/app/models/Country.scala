package models

import models.Types.{CountryId, Region, Geometry}

case class Country(
                  id: CountryId,
                  name: Region,
                  geom: Geometry );
