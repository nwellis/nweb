package me.nickellis.routes

import io.ktor.application.call
import io.ktor.html.respondHtml
import io.ktor.routing.Routing
import io.ktor.routing.get
import kotlinx.html.body
import kotlinx.html.head
import kotlinx.html.link
import kotlinx.html.p

fun Routing.root() {
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
}