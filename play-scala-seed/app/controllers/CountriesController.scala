package controllers

import models.dao.{CountriesDAO, CountriesDAOImpl}
import play.api.db.slick.DatabaseConfigProvider
import play.api.libs.json.Json
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

//    implicit val countryWrites: Writes[Country] = (
//        (JsPath \ "id")  .write[Int]    and
//        (JsPath \ "name").write[String] and
//        (JsPath \ "geom").write[String]
//    )(unlift(Country.unapply))

    def getAll: Action[AnyContent] = Action.async( {
        dao.getAll.map( c => Ok(Json.toJson(c)) )
    } )
}
