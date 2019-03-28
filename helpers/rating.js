const Sentiment = require('sentiment');
const sentiment = new Sentiment();

module.exports = ratingGiver = (comment) => {
  let result = sentiment.analyze(comment)
  let reviewConvert = null
  if (result.comparative > 0.5) {
    reviewConvert = 5
  } else if (result.comparative > 0.3) {
    reviewConvert = 4
  } else if (result.comparative > 0.1) {
    reviewConvert = 3
  } else if (result.comparative > 0) {
    reviewConvert = 2
  } else {
    reviewConvert = 1
  }
  return reviewConvert
}