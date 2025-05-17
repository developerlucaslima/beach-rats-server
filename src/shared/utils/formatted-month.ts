export const formattedMonth = (month: Date) => {
  return month.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
  })
}
