name := """play-scala-seed"""
organization := "com.example"

version := "1.0-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala).settings(
    routesImport += "utils.Binders._"
)

scalaVersion := "2.13.10"

val playSlickVersion = "5.1.0"

libraryDependencies += guice
libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % playSlickVersion % Test

libraryDependencies ++= Seq(
    "com.typesafe.play" %% "play-slick" % playSlickVersion,
    "org.postgresql" % "postgresql" % "42.5.4",
)

// Adds additional packages into Twirl
//TwirlKeys.templateImports += "com.example.controllers._"

// Adds additional packages into conf/routes
// play.sbt.routes.RoutesKeys.routesImport += "com.example.binders._"
