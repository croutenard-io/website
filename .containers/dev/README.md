# Hugo Dev Container Image

The `croutenard/shop:${QUAY_OCI_IMAGE_TAG}-dev` is the container image used for the dev environment

The hugo server serves on port 1313 necessarily, you can change 1313 port number by any other port number above 1024, you just have to rebuild the docker image using `./.build.dev.sh`

The hugo server works with live reload on port 1313 :
* The hugo server injects a `JavaScript` script
* This script connects back to the Hugo dev server with a Websocket connection :

```Html
`<script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>`
```
* note that the port number used for the WebSocket Connection is set by hugo to `1313` : this is why the docker compose must use that port bind outside container
* see https://github.com/gohugoio/hugo/issues/8023#issuecomment-1157209642

To be able to change the live-reload port number injected by the hugo dev server, i will perhaps use a different dev server than the hugo server... That would allow to change port number, and keep live reload capabilty trough Websocket connection, without having to rebuild the docker image.


## ANNEX Other Alternatives Hugo Images


* https://github.com/devopsdays/docker-hugo-server


## ANNEX: About the live reload

The container runs the dev server in watch mode :
* everytime source code changes, the dev server restarts in container
* but the dev server is inside the container, and the browser is outside the container
* so the problem is I have to reload browser page to see changes in hugo website, every time I change

What we want :
* We want real hot reload, so i 'll test with a gulp hot reload running the hugo server. Will Gulp be able to hot reload the Docker host browser ?
* For now, we will deal with having to reload browser on code change
* I serached the subject _"What are the techniques to live reload browser ?"_ :
  * It seems the main technique is injeting in the response, a live-reload `JavaScript` script
  * see https://discourse.gohugo.io/t/live-reload-broken/20584
  * see also https://github.com/intesso/connect-livereload
  * and many other examples it seems indeed
  * Oh and in my hugo Website, I see the injeced script in my age its `<script src="/livereload.js?mindelay=10&amp;v=2&amp;port=1313&amp;path=livereload" data-no-instant defer></script>`
  * And now i understand the issue with hot reloading : the hot reload scripts uses the 1313 port number
  * By the way the live rload scriupt uses a Websocket (of course..) : https://github.com/gohugoio/hugo/issues/2205
  * So my first fix would be to use same port number inside and outside container , that is `1313`
  * "Et Voilà! Now it works! :) "
  * see also https://github.com/gohugoio/hugo/issues/8023#issuecomment-1157209642
