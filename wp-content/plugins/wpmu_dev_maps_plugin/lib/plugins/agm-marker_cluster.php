<?php
/*
Plugin Name: Marker cluster
Description: Cleans up your maps by grouping nearby markers into clusters.
Plugin URI: http://premium.wpmudev.org/project/wordpress-google-maps-plugin
Version: 1.0
Author: Ve Bailovity (Incsub)
*/

class Agm_Mc_UserPages {
	
	private function __construct () {}
	
	public static function serve () {
		$me = new Agm_Mc_UserPages;
		$me->_add_hooks();
	}
	
	private function _add_hooks () {
		add_action('agm_google_maps-load_user_scripts', array($this, 'load_scripts'));
	}
	
	function load_scripts () {
		wp_enqueue_script('agm-marker-clusterer', AGM_PLUGIN_URL . '/js/external/markerclusterer_packed.js');
		wp_enqueue_script('agm-marker_cluster-user', AGM_PLUGIN_URL . '/js/marker_cluster-user.js', array('jquery'));
	}
}

if (!is_admin()) Agm_Mc_UserPages::serve();
