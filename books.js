// This comes from https://github.com/chhoumann/quickadd/blob/master/docs/docs/Examples/Attachments/BookFinder.js

const notice = e => new Notice(e, 5e3),
  log = e => console.log(e),
  GOOGLE_BOOKS_API_URL = "https://www.googleapis.com/books/v1/volumes",
  GOOGLE_BOOKS_TITLE_TERM = "intitle:";
let QuickAdd;

function replaceIllegalFileNameCharactersInString(e) {
  return e.replace(/[\\,#%&\{\}\/*<>?$\'\":@]*/g, "")
}
module.exports = async function(e) {
  QuickAdd = e;
  let t = await QuickAdd.quickAddApi.utility.getClipboard();
  const i = await QuickAdd.quickAddApi.inputPrompt("Enter Book title: ", t, t);
  if (!i) throw new Notice("No title entered.", 5e3), new Error("No title entered.");
  const recomendedBy = await QuickAdd.quickAddApi.inputPrompt('Was this recommended by someone?');
  const o = encodeURIComponent("intitle:" + i),
    l = GOOGLE_BOOKS_API_URL + "?q=" + o + "&maxResults=10",
    n = await fetch(l),
    a = await n.json();
  QuickAdd.variables = {
    ...a.items[0],
    title: a.items[0].volumeInfo.title,
    authors: a.items[0].volumeInfo.authors,
    categories: a.items[0].volumeInfo.categories,
    description: a.items[0].volumeInfo.description,
    fileName: replaceIllegalFileNameCharactersInString(a.items[0].volumeInfo.title),
    poster: a.items[0].volumeInfo.imageLinks?.smallThumbnail,
    year: a.items[0].volumeInfo.publishedDate,
    recomendedBy,
  }
};
