package me.nickellis.html

import kotlinx.html.*

fun FlowContent.footerBar() {
  footer("footer") {
    div("content has-text-centered") {
      p {
        text("Built with ")
        a(href = "https://ktor.io/") { strong { text("Ktor") } }
        text(", powered by ")
        a(href = "https://www.docker.com/") { strong { text("Docker") } }
        text(", and styled with ")
        a(href = "https://bulma.io/") { strong { text("Bulma") } }
      }
      p {
        text("See the ")
        a(href = "https://github.com/nwellis/nweb") { strong { text("Code") } }
      }
    }
  }
}