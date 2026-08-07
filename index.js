const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000
const PROGRESS_BAR_CAPACITY = 30

function getYearProgress(now = new Date()) {
  const year = now.getUTCFullYear()
  const startOfYear = Date.UTC(year, 0, 1)
  const startOfNextYear = Date.UTC(year + 1, 0, 1)
  const duration = startOfNextYear - startOfYear
  const elapsed = now.getTime() - startOfYear
  const progress = elapsed / duration
  const totalDays = duration / MILLISECONDS_PER_DAY
  const daysPassed = Math.floor(elapsed / MILLISECONDS_PER_DAY)

  return {
    year,
    progress,
    totalDays,
    daysPassed,
    daysRemaining: totalDays - daysPassed,
  }
}

function generateProgressBar(progress) {
  const filledCells = Math.round(progress * PROGRESS_BAR_CAPACITY)

  return (
    '█'.repeat(filledCells) +
    '░'.repeat(PROGRESS_BAR_CAPACITY - filledCells)
  )
}

function renderReadme(now = new Date()) {
  const { year, progress, totalDays, daysPassed, daysRemaining } =
    getYearProgress(now)
  const progressBar = generateProgressBar(progress)
  const percentage = (progress * 100).toFixed(1)

  return `### Hi there 👋

## ${year} Progress

${progressBar}  ${percentage}%

${daysPassed} / ${totalDays} days

${daysRemaining} days remaining

![Progress Bar CI](https://github.com/fuscoyu/fuscoyu/workflows/Progress%20Bar%20CI/badge.svg)`
}

if (require.main === module) {
  console.log(renderReadme())
}

module.exports = { generateProgressBar, getYearProgress, renderReadme }
