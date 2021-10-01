# dblp-fetcher

A repository for fetching articles and skimming articles related to specific venues (journals and conferences) via dbpl using a custom scraper as the existing api is lacking.

To execute:

```javascript
npm install
npm start [venue_1] [venue_2] ... [venue_n]
```

Hereafter the script will fetch the articles and allow you to navigate them using the following:

```javascript
[F]orward, [B]ackward, [O]pen, [L]abel, [C]omment, [S]ave, [J]ump
```

(Comments are finished by pressing `enter`)

(`Jump` moves you to the next proceedings or workshop in the list. Note that these titles are included)

Furthermore, the script can be run with different flags (remember to always add `--` after venue specification to enable flags):

```
--silent (disables automatic opening when navigating using F/B)
--save [filename] (saves the fetched articles in json format for further treatment / reload)
--file [filename] (utilises a specific file instead of fetching anew)
--wrapper [url] (wraps the url when using [O]pen, can be utilised for google searches)
```

#### Filters

Furthermore the script utilises filters to remove specific entries. These can be specified in `./src/filters.js`. Currently, the only filter there removes articles with the word _transcript_ in them. This is run after the initial load as defined by its `initial` process tag. Other tags occur as a result of running different `handlers`.

#### Handlers

The handler chain specifies processing of the input data after fetching. The order (and used) handlers are specified in `./src/handles/index.js`. The specification of how these should be defined is specified in the same file.

Furthermore, some handles may only run if a given flag is set (as is the case with the `url-wrapper` handle which only runs with the `--wrapper [url]` flag). I encourage looking at the `url-wrapper` for a simple example.

##### Included handlers

`open-browser` - opens all addresses if included, passes forward the input object. [process_tag: `open_browser`]

`url-wrapper` - wraps the address field of the input and returns this modified object [process_tag: `wrapped_url`]

`iterate-open-save` - allows the default controls introduced before and consumes the input (should be last). [process_tag: `iterate_open_save`]
