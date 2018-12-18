package me.nickellis

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.http.HttpStatusCode
import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.response.respond
import io.ktor.routing.*
import me.nickellis.routes.root


fun Application.main() {
  install(DefaultHeaders)
  install(CallLogging)

  install(StatusPages) {
    exception<Throwable> {
      call.respond(HttpStatusCode.InternalServerError)
    }
  }

  routing {
    root()

    static("/static") {
      resources("static/styles")
      resources("static/images")
    }
  }
}