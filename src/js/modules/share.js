var $ = require('../vendor/jquery.js');

var pageUrl = window.location.href;
var title = 'Donald Trump\'s first 100 days as president – daily updates';

module.exports =  {
    init: function() {
        this.setLinks();
    },

    setLinks: function() {
        $('.trump-tracker-header__share-link--twitter').attr('href', this.getTwitterLink());
        $('.trump-tracker-header__share-link--facebook').attr('href', this.getFacebookLink());
        $('.trump-tracker-header__share-link--email').attr('href', this.getEmailLink());
    },

    getTwitterLink: function(id) {
        return 'https://twitter.com/intent/tweet?text=' + encodeURIComponent(title) + 
                '&url=' + encodeURIComponent(pageUrl + (id ? '#' + id : '') + '?CMP=share_btn_tw');
    },

    getFacebookLink: function(id) {
        return 'https://www.facebook.com/dialog/share?app_id=180444840287&href=' + encodeURIComponent(pageUrl + '?CMP=share_btn_fb');
    },

    getEmailLink: function(id) {
        return 'mailto:?subject=' + encodeURIComponent(title) +
                '&body=' + encodeURIComponent(pageUrl + '?CMP=share_btn_link');
    }
};