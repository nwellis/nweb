package me.nickellis

import io.ktor.application.*
import io.ktor.content.*
import io.ktor.locations.*
import io.ktor.response.*
import io.ktor.routing.*

@Location("/styles/skeleton.css")
class MainCss

@Location("/styles/normalize.css")
class NormalizeCss

fun Route.styles() {
  get<MainCss> {
    call.respond(call.resolveResource("styles/skeleton.css")!!)
  }
  get<NormalizeCss> {
    call.respond(call.resolveResource("styles/normalize.css")!!)
  }
}