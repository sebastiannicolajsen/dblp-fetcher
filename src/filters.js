
const filters = [
    {
        process_tag: "initial",  //only runs when receiving this tag.
        filter: (key, value) => !value.includes("transcript"),
    },
    // {
    //     process_tag: "pdf_html",
    //     filter: (key, value) => value.includes(""),
    // }
]

export default filters