const hbs = require('hbs');
hbs.registerPartials(`${__dirname}/../views/partials`);

hbs.registerHelper('formattedDate', (date) => {
  if (date) {
    let day = date.getDay();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }
})

hbs.registerHelper('isCurrentUser', (currentUser, userId, options) => {
  if (userId == currentUser?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
})

hbs.registerHelper('isOwnedBy', (currentUser, project, options) => {
  if (project.author.id == currentUser?.id) {
    return options.fn();
  } else {
    return options.inverse();
  }
})

hbs.registerHelper('isLoggedIn', (currentUser, options) => {
  if (!currentUser) {
    return options.fn();
  } else {
    return options.inverse();
  }
})