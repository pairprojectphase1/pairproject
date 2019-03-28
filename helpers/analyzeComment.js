const Sentiment = require('sentiment');
const sentiment = new Sentiment();

module.exports = (comment) => {
  let result = sentiment.analyze(comment)
  let reviewConvert = null
  if (result.comparative > 0.4) {
    reviewConvert = 'Excelent Review'
  } else if (result.comparative > 0.2) {
    reviewConvert = 'Good Review'
  } else if (result.comparative > 0) {
    reviewConvert = 'Average Review'
  } else {
    reviewConvert = 'Bad Review'
  }
  return reviewConvert
}