package me.nickellis.html

import kotlinx.html.*

fun BODY.navbar() {
  val navbarMenuId = "navbarMenu"
  nav("navbar has-shadow") {
    div("container") {
      div("navbar-brand") {
        div("navbar-item") {
          h1 { text("Nick Ellis") }
        }
        a(classes = "navbar-item", href = "https://github.com/nwellis") {
          span("icon is-medium has-text") {
            i("fab fa-lg fa-github-alt")
          }
          span { text("GitHub") }
        }
        a(classes = "navbar-item", href = "https://www.linkedin.com/in/linkednickellis/") {
          span("icon is-medium has-text-link") {
            i("fab fa-lg fa-linkedin")
          }
          span { text("LinkedIn") }
        }
//        a(classes = "navbar-burger burger") {
//          role = "button"
//          target = navbarMenuId
//          attributes["data-target"] = navbarMenuId
//        }
      }
      div("navbar-menu") {
        id = navbarMenuId
        div("navbar-start") {
        }
      }
    }
  }
}