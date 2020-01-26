const ghpages = require('gh-pages');

ghpages.publish('dist', error => {
  if (error) {
    throw error;
  }
  console.log('Published successfully');
});
