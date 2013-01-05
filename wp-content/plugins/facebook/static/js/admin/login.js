// avoid collisions
var FB_WP = FB_WP || {};
FB_WP.admin = FB_WP.admin || {};
FB_WP.admin.login = {
	attach_events: function() {
		// Facebook JavaScript SDK not present
		if ( typeof FB === "undefined" ) {
			return;
		}

		jQuery(".facebook-login").each(function(index) {
			var login_el = jQuery(this);
			var scope = login_el.data("scope");
			if ( scope === "person" ) {
				login_el.click( FB_WP.admin.login.post_to_timeline );

				// match link style
				login_el.css( "cursor", "pointer" );
				login_el.css( "color", "#21759B" );
				login_el.css( "text-decoration", "underline" );
			} else if ( scope === "page" ) {
				login_el.click( FB_WP.admin.login.post_to_page );

				// match link style
				login_el.css( "cursor", "pointer" );
				login_el.css( "color", "#21759B" );
				login_el.css( "text-decoration", "underline" );
			}
		});
	},
	post_to_timeline: function(){
		FB.login( function(response){
			if ( response.authResponse ) {
				FB_WP.admin.login.redirect_with_parameter("fb_extended_token", -1);
			}
		}, {scope:"publish_stream,publish_actions"} );
	},
	post_to_page: function(){
		FB.login( function(response){
			if ( response.authResponse ) {
				FB_WP.admin.login.redirect_with_parameter("fb_extended_token", -1);
			}
		}, {scope:"manage_pages,publish_stream,publish_actions"} );
	},
	redirect_with_parameter: function(key, value) {
		var param = new Object();
		param[key] = value;
		key = escape(key);
		value = escape(value);

		var kvp = document.location.search.substr(1).split("&");
		if (kvp == "") {
			document.location.search = '?' + jQuery.param(param);
		} else {
			var i = kvp.length;
			var x;
			while (i--) {
				x = kvp[i].split("=");

				if ( x[0] == key ) {
					x[1] = value;
					kvp[i] = jQuery.param(param);
					break;
				}
			}

			if (i < 0) {
				kvp[kvp.length] = jQuery.param(param);
			}

			document.location.search = kvp.join("&");
		}
	}
}