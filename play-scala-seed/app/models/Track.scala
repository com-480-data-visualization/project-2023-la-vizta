package models

import models.Types.{TrackId, Title, Artist}

case class Track(
                  id: TrackId,
                  title: Title,
                  artist: Artist );
