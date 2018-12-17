package me.nickellis.html

import kotlinx.html.*

fun HEAD.defaultHeaders(title: String) {
  title(title)
  link(rel = "icon", href = "/static/favicon.png")
  meta(charset = "utf-8")
  responsiveViewport()
  styles()
  fontAwesomeScript()
}

fun HEAD.styles() = link(rel = "stylesheet", href = "/static/bulma.min.css")

fun HEAD.responsiveViewport() = meta(name = "viewport", content = "width=device-width, initial-scale=1")

fun HEAD.fontAwesomeScript() =
    script(type = "text/javascript", src = "https://use.fontawesome.com/releases/v5.3.1/js/all.js") { defer=true }