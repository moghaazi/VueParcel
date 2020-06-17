if (module.hot) {
  module.hot.accept() // HMR
}
import normalize from 'normalize.css' // Normalize

// Varibles ===========================================
let input = document.querySelector(`input`)
let btn = document.querySelector(`button`)
let showRepos = document.querySelector(`.show-repos`)

// Get Repos ===========================================
btn.onclick = () => {
  input.value === ``
    ? (showRepos.innerHTML = `<h1> You've To Write The Username </h1>`)
    : (showRepos.innerHTML = ``)
  fetch(`https://api.github.com/users/${input.value}/repos`)
    .then(res => res.json())
    .then(repos => {
      repos.forEach(repo => {
        //Add repos
        let mainDiv = document.createElement(`div`)
        let repoName = document.createTextNode(`${repo.name}`)
        mainDiv.appendChild(repoName)

        //Add repos stars
        let starSpan = document.createElement(`span`)
        let starText = document.createTextNode(`Stars: ${repo.stargazers_count} `)
        starSpan.append(starText)
        mainDiv.appendChild(starSpan)

        //Add link to repos
        let url = document.createElement(`a`)
        let urlText = document.createTextNode(`Link`)
        url.append(urlText)
        url.href = `https://github.com/${input.value}/${repo.name}`
        url.setAttribute(`target`, `_blanck`)
        mainDiv.appendChild(url)

        showRepos.appendChild(mainDiv)
      })
    })
}
