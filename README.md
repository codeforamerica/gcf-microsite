## GetCalFresh: Fresh Look at the Facts Microsite

This microsite examines who really uses food assistance, based on our experience
running GetCalFresh, a service that helps Californians apply for SNAP/CalFresh.
The site includes data and stories from real users of the service, which
highlight the financial instability and common shocks that often lead to their
need for food assistance, as well as how CalFresh helps them through these
challenging times.

It is a static single page application built with Jekyll, html, css, and
javascript.

## Running Locally

To get started:

```console
git clone https://github.com/codeforamerica/gcf-microsite
cd gcf-microsite
bundle install
```

The only other step is to run Jekyll, which is a simple static site generator.
Doing this will both start a local server on port 4000 and start watching for
changes to source files. Any changes will result in updates to the generated
static files found in the _site directory, and picked up by your local server.
For more on Jekyll see [here](https://jekyllrb.com/docs/)

```console
bundle exec jekyll serve
```

You can now access the microsite at http://localhost:4000
