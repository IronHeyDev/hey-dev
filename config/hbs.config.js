const hbs = require('hbs');

hbs.registerHelper('formattedDate', (date) => {
  if (date) {
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
})

//TO DO: NOT WORKING - ERROR
hbs.registerHelper('isOwnedBy', (project, userId, options) => {
  const data = options.data;
  const root = data.root;
  const params = root.params;
  userId = params[1];

  if (userId == currentUser?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
})