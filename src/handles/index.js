import { default as UrlWrapper } from "./url-wrapper.js";
import { default as Iterator } from "./iterate-open-save.js";

// specify handles to use. Are applied in order on each others results (composed).
// handles must be of the form:
//      (input) => {result, process_tag}.
// The base input is specified by:
//      input: { [doi]: {address: url, title: string, doi: string} }
// However, a handler may extend or modify this.
// (e.g. the url-wrapper modifies the address field)
// export {default as OpenBrowser} from './open-browser.js'

const handles = [UrlWrapper, Iterator];

export default handles;
