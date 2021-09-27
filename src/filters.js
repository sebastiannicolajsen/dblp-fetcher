
const filters = [
    {
        process_tag: "initial",  //only runs when receiving this tag.
        filter: (key, {title, address}) => !title.toLowerCase().includes("transcript"),
    },
]

export default filters