import { Links } from '/imports/api/links/links.js';
import { Meteor } from 'meteor/meteor';
import './links.html';

Template.links_Page.onCreated(function () {
  Meteor.subscribe('links.all');
});

// Template.links_Page.onRendered(function () {
//   $('.ui.dropdown').dropdown();
// });

Template.links_Page.helpers({
  links() {
    return Links.find({});
  },
});

Template.links_Page.events({
  'submit .info-link-add'(event) {
    event.preventDefault();

    const target = event.target;
    const title = target.title;
    const url = target.url;
    const group = target.group;

    let newLink = {title: title.value, url: url.value, group: group.value}

    Meteor.call('links.insert', newLink, (error) => {
      if (error) {
        alert(error.error);
      } else {
        title.value = '';
        url.value = '';
        group.value = '';
      }
    });
  },
});
