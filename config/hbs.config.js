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
  if (currentUser) {
    return options.fn();
  } else {
    return options.inverse();
  }
})

hbs.registerHelper('isOpen', (projectState, options) => {
  if (projectState === "Open") {
    return options.fn();
  } else {
    return options.inverse();
  }
})

hbs.registerHelper('isNotContributor', (currentUser, projectUsers, options) => {
  if (projectUsers.indexOf(currentUser) === -1) {
    return options.fn();
  } else {
    return options.inverse();
  }
})

// nota mental: utilizar este helper con tres bigotitos en vez de 2
hbs.registerHelper('languageIcon', (language) => {
  if (language === 'JavaScript') {
    return '<i class="fa-brands fa-square-js fa-2xl"></i>'
  } else if (language === 'HTML') {
      return '<i class="fa-brands fa-html5 fa-2xl"></i>'
  } else if (language === 'CSS') {
      return '<i class="fa-brands fa-css3-alt fa-2xl"></i>'
  } else if (language === 'PHP') {
      return '<i class="fa-brands fa-php fa-2xl"></i>'
  } else if (language === 'Java') {
      return '<i class="fa-brands fa-java fa-2xl"></i>'
  } else if (language === 'Python') {
    return '<i class="fa-brands fa-python fa-2xl"></i>'
}
})

