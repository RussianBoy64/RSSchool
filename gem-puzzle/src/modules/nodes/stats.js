export default async function createStatsNode() {
  const stats = document.createElement('span')
  stats.classList.add('gameboard__stats')

  stats.innerHTML = `
  <span>
      <span class="stats__name">Moves:</span>
      <span class="stats__moves">00</span>
  </span>
  <span>
      <span class="span stats__name">Time:</span>
      <span class="stats__time">
          <span class="stats__time_minutes">00</span>
          :
          <span class="stats__time_seconds">00</span>
      </span>
  </span>
  `

  return stats
}
