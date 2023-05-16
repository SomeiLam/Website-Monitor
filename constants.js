// Website URL to monitor
const websiteList = [
  {
    id: 0,
    name: 'FDA',
    url: 'https://www.fda.gov/news-events/fda-newsroom/press-announcements',
    selector: 'div.view-press-announcements'
  },
  {
    id: 1,
    name: 'Amy Github',
    url: 'https://github.com/SomeiLam',
    selector: 'div.profile-readme'
  }
];

const ONE_SECOND = 1000;
const TEN_SECONDS = ONE_SECOND * 10;
const ONE_MINUTE = TEN_SECONDS * 6;
const TEN_MINUTES = ONE_MINUTE * 10;
const ONE_HOUR = TEN_MINUTES * 12;

const checkingTime = TEN_SECONDS;

module.exports = {
  websiteList,
  checkingTime
};
