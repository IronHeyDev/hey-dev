const Contributor = require('../models/contributor.model');
const Project = require('../models/project.model');

module.exports.join = (req, res, next) => {
  function isContributor(contributors, userId) {
    let users = contributors.map(contributor => contributor.user.id);
    return users.includes(userId);
  }

  Project.findById(req.params.id)
    .populate('author')
    .populate({
      path: "contributors",
      populate: {
        path: "user"
      }
    })
    .then((project) => {
      if (project.author.id === req.user.id) {
        res.redirect(`/projects/${project.id}`);
      } else if (isContributor(project?.contributors, req.user.id)) {
        res.redirect(`/projects/${project.id}`);
      } else if (project?.contributors.length >= project.maxContributors) {
        project.state = 'In progress';
        return project
          .save()
          .then((project) => res.redirect(`/projects/${project.id}`))
      } else {
        return Contributor
          .create({
            user: req.user.id,
            project: project.id
          })
          .then(() => {
            res.redirect(`/projects/${project.id}`)
          })
          
      }
    })
    .catch(next)
}