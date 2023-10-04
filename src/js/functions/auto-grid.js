/* 
 * Resizes grid columns based on image widths
 */
const AutoGrid = (grid) => {
  const desktopMax = 1440
  const cols = grid.querySelectorAll('.column')

  // Get the largest image height.
  const heights = [...cols].map(col => {
    const image = col.querySelector('.auto-grid-image')
    return image.naturalHeight;
  })

  const maxHeight = Math.max(...heights)

  // Normalize all cols to largest image height.
  const normalizedcols = [...cols].map(col => {
    const image = col.querySelector('.auto-grid-image')
    const imageRatio = image.naturalHeight / maxHeight;
    
    return {
      height: image.naturalHeight / imageRatio,
      width: image.naturalWidth / imageRatio
    }
  });

  // Find the width of the normalized row and resize to 1440px breakpoint.
  const normalizedRowWidth = Object.keys(normalizedcols).reduce((accumulator, key) => {
    return accumulator + normalizedcols[key].width
  }, 0)

  const rowRatio = normalizedRowWidth / 1440;

  cols.forEach((col, i) => {
    const flexWidth = normalizedcols[i].width * rowRatio;
    col.style.flex = flexWidth;
  });
}

export default AutoGrid;