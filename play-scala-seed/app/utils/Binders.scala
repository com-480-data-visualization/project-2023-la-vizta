package utils

import play.api.mvc.{PathBindable, QueryStringBindable}

object Binders {
	
	implicit object SetStringQueryBindable extends QueryStringBindable[Set[String]] {
		override def bind(key: String, params: Map[String, Seq[String]]): Option[Either[String, Set[String]]] = {
			params.get(key).flatMap(_.headOption).map { value =>
				try {
					Right(value.split(",").toSet)
				} catch {
					case e: Exception => Left("Cannot parse parameter " + key + " as Set[TrackId]")
				}
			}
		}
		
		override def unbind(key: String, value: Set[String]): String = key + "=" + value.toString
	}
	
//	implicit object DoublePathBindable extends PathBindable[Set[TrackId]] {
//		override def bind(key: String, value: String): Either[String, Set[TrackId]] = try {
//			Right(value.)
//		}
//
//		override def unbind(key: String, value: Set[TrackId]): String = value.toString()
//	}
}
