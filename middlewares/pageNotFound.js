const pageNotFound = (req, res) => {
  res.status(404).send('Page not found!!!')
}

export default pageNotFound