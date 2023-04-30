package controllers

import models.Countries
import models.Types.{GeoJSON, Lat, Lng, Region}
import models.dao.{CountriesDAO, CountriesDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.functional.syntax.{toFunctionalBuilderOps, unlift}
import play.api.libs.json.{JsPath, Json, Writes}
import play.api.mvc._

import javax.inject._
import scala.concurrent.ExecutionContext

/**
 * This controller creates an `Action` to handle HTTP requests to the
 * application's home page.
 */
@Singleton
class CountriesController @Inject()(val dbConfigProvider: DatabaseConfigProvider, val controllerComponents: ControllerComponents)(implicit ec: ExecutionContext) extends BaseController {

    val dao: CountriesDAO = new CountriesDAOImpl(dbConfigProvider)
    
    case class ResCountry(name: Region, lat: Lat, lng: Lng, geom: GeoJSON)
    
    implicit val resCountriesWrites: Writes[ResCountry] = (
        (JsPath \ "name").write[Region] and
        (JsPath \ "lat").write[Lat] and
        (JsPath \ "lng").write[Lng] and
        (JsPath \ "geom").write[GeoJSON]
    )(unlift(ResCountry.unapply))
    
    def getAll: Action[AnyContent] = Action.async( {
        dao.getAll.map( countries => {
            val r_ = countries.map {
                case (name, lat, lng, geom) => ResCountry(name, lat, lng, geom)
            }
            Ok(Json.toJson(r_))
        } )
    } )
}
