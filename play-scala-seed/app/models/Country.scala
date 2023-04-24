package models

import models.Types.{Geometry, Region}

case class Country(
                  id: Int,
                  name: Region,
                  geom: Geometry );
