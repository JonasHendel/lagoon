const courseQueries = ({router, page, folderPath}) => {
  const path = router.pathname
  const query = router.query
  if(page) query.page = parseInt(page)-1
  if(folderPath) query.path = folderPath


  router.push({
    pathname: path,
    query: query
  })
}

export default courseQueries