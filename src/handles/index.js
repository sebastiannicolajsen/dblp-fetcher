import {default as UrlWrapper} from './url-wrapper.js'
import {default as Iterator} from './iterate-open-save.js' 

// specify handles to use. Are applied in order on each others results (composed).
// handles must be of the form (input) => {result, process_tag}.

// export {default as OpenBrowser} from './open-browser.js'


const handles = [
    UrlWrapper, Iterator
]

export default handles
