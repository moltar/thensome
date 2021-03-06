// const wtfNHL = require('wtf-nhl')
const wtfNHL = require('/Users/spencer/mountain/nhl-wtf')
let teams = require('../data/teams')
// teams = teams.slice(0, 3)
const year = 2012
let results = {}

const doTeam = function(i, cb) {
  wtfNHL
    .fetch(teams[i], year)
    .catch(console.log)
    .then(data => {
      if (!data) {
        console.log(teams[i])
      } else {
        let games = data.games.filter(g => !g.inFuture)
        games = games.map(g => {
          let fifty = g.record.games / 2
          let underOver = g.record.wins - fifty
          let date = g.date.replace(/\(.*?\)/, '') //+ ' ' + year
          return [date, underOver]
        })
        games = games.filter(g => g[1] !== null)
        results[teams[i]] = {
          team: teams[i],
          year: year,
          games: games
        }
      }
      i += 1
      if (teams[i]) {
        return doTeam(i, cb)
      }
      return cb()
    })
}
doTeam(0, () => {
  console.log('module.exports = ' + JSON.stringify(results, null, 2))
})
