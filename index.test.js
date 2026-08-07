const assert = require('assert')
const {
  generateProgressBar,
  getYearProgress,
  renderReadme,
} = require('./index')

const sampleDate = new Date('2026-08-07T07:07:22Z')
const sampleProgress = getYearProgress(sampleDate)

assert.deepStrictEqual(getYearProgress(new Date('2026-01-01T00:00:00Z')), {
  year: 2026,
  progress: 0,
  totalDays: 365,
  daysPassed: 0,
  daysRemaining: 365,
})

assert.deepStrictEqual(sampleProgress, {
  year: 2026,
  progress: (218 * 24 * 60 * 60 * 1000 + 7 * 60 * 60 * 1000 + 7 * 60 * 1000 + 22 * 1000) /
    (365 * 24 * 60 * 60 * 1000),
  totalDays: 365,
  daysPassed: 218,
  daysRemaining: 147,
})

assert.strictEqual(generateProgressBar(sampleProgress.progress).length, 30)
assert.strictEqual(
  generateProgressBar(sampleProgress.progress),
  '██████████████████░░░░░░░░░░░░'
)

assert.deepStrictEqual(getYearProgress(new Date('2024-02-29T00:00:00Z')), {
  year: 2024,
  progress: 59 / 366,
  totalDays: 366,
  daysPassed: 59,
  daysRemaining: 307,
})

assert.deepStrictEqual(getYearProgress(new Date('2027-01-01T00:00:00Z')), {
  year: 2027,
  progress: 0,
  totalDays: 365,
  daysPassed: 0,
  daysRemaining: 365,
})

assert.strictEqual(
  renderReadme(sampleDate),
  `### Hi there 👋

## 2026 Progress

██████████████████░░░░░░░░░░░░  59.8%

218 / 365 days

147 days remaining

![Progress Bar CI](https://github.com/fuscoyu/fuscoyu/workflows/Progress%20Bar%20CI/badge.svg)`
)

console.log('All tests passed')
