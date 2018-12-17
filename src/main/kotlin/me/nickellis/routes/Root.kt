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
        section("section summary") {
          div("container") {
            languages()
            hr {  }
            workExperience()
            hr {  }
            education()
          }
        }
      }
    }
  }
}

private fun FlowContent.languages() = div {
  div("columns") {
    div("column is-5") {
      h3("title is-3") { text("Languages") }
      p("subtitle is-4") {
        text(listOf("Kotlin", "Java", "Python", "Typescript").joinToString(", "))
      }
    }
    div("column is-5") {
      h3("title is-3") { text("Technologies") }
      p("subtitle is-4") {
        text(listOf("Android SDK", "Docker", "TensorFlow").joinToString(", "))
      }
    }
  }
}

private fun FlowContent.workExperience() = div {
  h3("title is-3") { text("Work Experience") }
  listDescription(
      header = "Digi-Key Electronics",
      subHeader = "Software Developer",
      timeFrame = "February 2015 - Present",
      items = listOf(
          "Android development",
          "API design and development",
          "Object detection with TensorFlow",
          "Web development with Node.js and React"
      )
  )
  br {  }
  listDescription(
      header = "Thomson Reuters",
      subHeader = "Software Developer",
      timeFrame = "January 2013 - February 2015",
      items = listOf(
          "Developed automated GUI tests",
          "Web development with ASP.NET",
          "Managed virtual machines for automated testing"
      )
  )
  br {  }
  listDescription(
      header = "Thomson Reuters",
      subHeader = "Software Developer Intern",
      timeFrame = "May 2012 - August 2012",
      items = listOf(
          "Developed automated GUI tests",
          "Managed virtual machines for automated testing",
          "Increased the pass percentage of tests by 15%, and added 50% more tests to the testing project"
      )
  )
  br {  }
  listDescription(
      header = "Digi-Key Electronics",
      subHeader = "Software Developer Intern",
      timeFrame = "May 2011 - August 2011",
      items = listOf(
          "Wrote batch reporting software using C to read from databases",
          "Developed a program to parse, remove, and securely store sensitive information from Word documents"
      )
  )
}

private fun FlowContent.education() {
  h3("title is-3") { text("Education") }
  listDescription(
      header = "University of Minnesota - Twin Cities",
      subHeader = "B.S. Computer Science - GPA - 3.79",
      timeFrame = "September 2009 - December 2012",
      items = listOf(
          "Dean's List", "Community Adviser (Residential Assistant)", "Active Energy Club", "Residential Community Council and Hall Association"
      )
  )
}

private fun FlowContent.listDescription(
    header: String,
    subHeader: String,
    timeFrame: String,
    items: List<String>
) {
  h5("title is-5") {
    text(header)
    br
    text("$subHeader | $timeFrame")
  }
  if (items.isNotEmpty()) {
    ul("subtitle") {
      items.forEach {
        li { text(it) }
      }
    }
  }
}