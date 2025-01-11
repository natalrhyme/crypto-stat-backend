function calculateStandardDeviation(values) {
  const n = values.length;
  if (n === 0) return 0;

  // Calculate mean
  const mean = values.reduce((sum, value) => sum + value, 0) / n;

  // Calculate sum of squared differences from mean
  const squaredDiffs = values.map(value => Math.pow(value - mean, 2));
  const sumSquaredDiffs = squaredDiffs.reduce((sum, value) => sum + value, 0);

  // Calculate variance and standard deviation
  const variance = sumSquaredDiffs / n;
  return Math.sqrt(variance).toFixed(2);
}

module.exports = { calculateStandardDeviation };