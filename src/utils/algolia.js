import algoliasearch from "algoliasearch";

const client = algoliasearch("EM7J4USRU5","7959866a9bb34ad031c67f7f3f6de88a");

const algolia = client.initIndex("socialcool");

export default algolia;