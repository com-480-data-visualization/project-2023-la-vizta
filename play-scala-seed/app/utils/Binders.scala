package utils

import play.api.mvc.QueryStringBindable

object Binders {
	implicit object StringTupleSetQueryBindable extends QueryStringBindable[Seq[(String, String)]] {
		override def bind(key: String, params: Map[String, Seq[String]]): Option[Either[String, Seq[(String, String)]]] =
			params.get(key).flatMap(_.headOption).map { value =>
				try {
					Right( value.split(",").map(
						_.split(";") match {
							case Array(track, region) => (track, region)
							case _ => throw new Exception()
						}
					) )
				} catch {
					case e: Exception => Left("Cannot parse parameter " + key + " as Set[(Track,Region)]")
				}
			}
		
		override def unbind(key: String, value: Seq[(String, String)]): String = key + "=" + value.toString
	}
	
	implicit object StringSetQueryBindable extends QueryStringBindable[Seq[String]] {
		override def bind(key: String, params: Map[String, Seq[String]]): Option[Either[String, Seq[String]]] =
			params.get(key).flatMap(_.headOption).map { value =>
				try {
					Right(value.split(","))
				} catch {
					case e: Exception => Left("Cannot parse parameter " + key + " as Set[(Track,Region)]")
				}
			}
		
		override def unbind(key: String, value: Seq[String]): String = key + "=" + value.toString
	}
}