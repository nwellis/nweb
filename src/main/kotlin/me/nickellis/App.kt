package me.nickellis

import io.ktor.application.*
import io.ktor.features.*
import io.ktor.html.respondHtml
import io.ktor.http.content.file
import io.ktor.http.content.files
import io.ktor.http.content.resources
import io.ktor.http.content.static
import io.ktor.routing.*
import kotlinx.html.body
import kotlinx.html.head
import kotlinx.html.link
import kotlinx.html.p


fun Application.main() {
  install(DefaultHeaders)
  install(CallLogging)
  routing {
    get("/") {
      call.respondHtml {
        head {
          link(rel = "stylesheet", href = "/static/skeleton.css")
          link(rel = "stylesheet", href = "/static/normalize.css")
        }
        body {
          p {
            text("Hello World")
          }
        }
      }
    }

    static("/static") {
      resources("static/styles")
      resources("static/images")
    }
  }
}