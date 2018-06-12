export const sortPosts = (postList, sortBy) => {
    let sortedPosts = [];
    if (sortBy === 'timestamp') {
      sortedPosts = postList.sort( (post1, post2) => {
        return post1.timestamp - post2.timestamp;
      });
    } else if (sortBy === 'title') {
      sortedPosts = postList.sort( (post1, post2) => {
        let upperPost1 = post1.title.toUpperCase();
        let upperPost2 = post2.title.toUpperCase();
        if (upperPost1 < upperPost2) {
          return -1;
        } else if (upperPost1 > upperPost2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  
  return sortedPosts
}