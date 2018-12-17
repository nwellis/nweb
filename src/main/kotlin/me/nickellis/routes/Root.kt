package me.nickellis.routes

import io.ktor.application.call
import io.ktor.html.respondHtml
import io.ktor.routing.Routing
import io.ktor.routing.get
import kotlinx.html.*
import me.nickellis.html.defaultHeaders
import me.nickellis.html.navbar

fun Routing.root() {
  get("/") {
    call.respondHtml {
      head {
        defaultHeaders("About")
      }
      body {
        navbar()
      }
    }
  }
}