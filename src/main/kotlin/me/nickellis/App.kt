package me.nickellis

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.*
import io.ktor.response.*
import io.ktor.routing.*

fun Application.main() {
  install(DefaultHeaders)
  install(CallLogging)
  install(Routing) {
    get("/") {
      call.respondText("Hello World!", ContentType.Text.Html)
    }
  }
}