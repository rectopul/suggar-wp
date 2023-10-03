<?php

/**
 * auaha functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package auaha
 */

define( 'WP_ENVIRONMENT_TYPE', 'development' );
define('WP_SITEURL', 'http://' . $_SERVER['HTTP_HOST']);
define('WP_HOME', 'http://' . $_SERVER['HTTP_HOST']);
//after wp_enqueue_script
wp_localize_script( 'javascriptVariables', 'wpvariables', $translation_array );

add_filter( 'woocommerce_rest_check_permissions', 'my_woocommerce_rest_check_permissions', 90, 4 );

function my_woocommerce_rest_check_permissions( $permission, $context, $object_id, $post_type  ){
  return true;
}



// add_action('rest_api_init', function() {

// 	/* unhook default function */
// 	remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');

// 	/* then add your own filter */
// 	add_filter('rest_pre_serve_request', function( $value ) {
// 		 header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS, READ');

// 		 return $value;
// 	});
// }, 15);

function user_login_api() {
	//section_full_banner
    register_rest_route('shop/v1/user', 'login', array(
        'methods' => 'POST',
        'callback' => 'user_login_function',
		'permission_callback' => '__return_true'
    ));
}

add_action('rest_api_init', 'user_login_api');

function my_get_wc_user_fields( $id, $echo = false ) {
 
	$fields = array(
	  'billing_address_1',
	  'billing_address_2',
	  'billing_city',
	  'billing_company',
	  'billing_country',
	  'billing_email',
	  'billing_first_name',
	  'billing_last_name',
	  'billing_phone',
	  'billing_postcode',
	  'billing_state',
   
	  'shipping_address_1',
	  'shipping_address_2',
	  'shipping_city',
	  'shipping_company',
	  'shipping_country',
	  'shipping_email',
	  'shipping_first_name',
	  'shipping_last_name',
	  'shipping_postcode',
	  'shipping_state',
	);
   
	$return = array(
	  'billing' => array(),
	  'shipping' => array(),
	);
   
	$meta = get_user_meta( $id );
   
	if ( ! empty ( $id ) && ! empty ( $meta ) ) {
	  foreach ( $fields as $field ) {
		if ( is_array( $meta[ $field ] ) && ! empty( $meta[ $field ][0] ) ) {
		  $key = explode('_', $field);
		  
		  if ( ! empty( $key[1] ) && is_array( $return[ $key[0] ] ) ) {
			$return[ $key[0] ][ $key[1] ] = $meta[ $field ][0];
		  }
   
		  $return[$field] = $meta[ $field ][0];
   
		  if ( $echo ) {
			echo "$field : {$meta[ $field ]} <br />";
		  }
		}
	  }
	}
   
	return $return;
   
}

function user_login_function( $request ) {
	$creds = array(
		'user_login'    => $request['username'],
		'user_password' => $request['password'],
		'remember'      => true
	);

	$user = wp_signon( $creds, false );

	if ( is_wp_error( $user ) ) {
		$msg = $user->get_error_message();
		return wp_send_json($user);
	}else{
		wp_clear_auth_cookie();
		wp_set_current_user( $user->ID ); // Set the current user detail
		wp_set_auth_cookie( $user->ID ); // Set auth details in cookie

		return wp_send_json(['user' => $user, 'address' => get_user_meta($user->ID, 'billing_postcode', true)]);
	}
}

function get_product_reviews() {
	//section_full_banner
    register_rest_route('shop/v1/products', '/reviews/(P<product_id>[a-zA-Z]+)', array(
        'methods' => 'GET',
        'callback' => 'get_reviews_by_id',
		'permission_callback' => '__return_true'
    ));
}

add_action('rest_api_init', 'get_product_reviews');

function get_reviews_by_id( WP_REST_Request $request ) {
	$parameters = $request->get_params();

   	return $parameters;
}

function get_shop_infos() {
	//section_full_banner
    register_rest_route('shop/v1', 'infos', array(
        'methods' => 'GET',
        'callback' => 'get_shop_info',
    ));
}

add_action('rest_api_init', 'get_shop_infos');


add_filter('template_include', 'custom_product_template');

function custom_product_template($template) {
    if (is_page('produto-personalizado')) { // Substitua 'produto-personalizado' pelo slug da sua página personalizada.
        return get_template_directory() . '/product-react.php'; // Substitua o caminho pelo local do seu aplicativo React.
    }
    return $template;
}



function get_shop_info() {
	//mini_banner_1
	$data = [
		'full_banner' => wp_get_attachment_image_url( get_theme_mod('section_full_banner'), 'full' ),
		'mini_banner_1' => wp_get_attachment_image_url( get_theme_mod('mini_banner_1'), 'full' ),
		'about_excerpt' => get_theme_mod('about_excerpt'),
		'contact_mail' => get_theme_mod( 'contact_mail' ),
		'corporate_reason' => get_theme_mod( 'corporate_reason' ),
		'cep' => get_theme_mod( 'cep' ),
		'menus' => [
			'footer' => wp_get_nav_menu_items('menu-footer')
		],
		'ruler_options' => [
			'ruler_options_1' => get_theme_mod( 'ruller_options_1' ),
			'ruler_options_2' => get_theme_mod( 'ruller_options_2' ),
			'ruler_options_3' => get_theme_mod( 'ruller_options_3' ),
			'ruler_options_4' => get_theme_mod( 'ruller_options_4' )
		]
	];

	return rest_ensure_response($data);
}

function register_get_nonce_route() {
    register_rest_route('shop/v1', 'get-nonce', array(
        'methods' => 'GET',
        'callback' => 'get_nonce_request',
    ));
}

add_action('rest_api_init', 'register_get_nonce_route');

function get_nonce_request($request) {
    // Gere o nonce
    $nonce = wp_create_nonce('wp_rest');
	$woononce = wp_create_nonce('wc_store_api');

    // Retorne o nonce como JSON
    return rest_ensure_response(array('nonce' => $nonce, 'woo_nonce' => $woononce));
}


if (!function_exists('auaha_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function auaha_setup()
	{
		/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on auaha, use a find and replace
	 * to change 'auaha' to the name of your theme in all the template files.
	 */
		load_theme_textdomain('auaha', get_template_directory() . '/languages');

		// Add default posts and comments RSS feed links to head.
		add_theme_support('automatic-feed-links');

		/*
	 * Let WordPress manage the document title.
	 * By adding theme support, we declare that this theme does not use a
	 * hard-coded <title> tag in the document head, and expect WordPress to
	 * provide it for us.
	 */
		add_theme_support('title-tag');

		/*
	 * Enable support for Post Thumbnails on posts and pages.
	 *
	 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
	 */
		add_theme_support('post-thumbnails');

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus(array(
			'menu-1' => esc_html__('Primary', 'pampers'),
			'menu-footer' => esc_html__('Footer', 'pampers'),
		));

		/*
	 * Switch default core markup for search form, comment form, and comments
	 * to output valid HTML5.
	 */
		add_theme_support('html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		));

		// Set up the WordPress core custom background feature.
		add_theme_support('custom-background', apply_filters('auaha_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		)));

		// Add theme support for selective refresh for widgets.
		add_theme_support('customize-selective-refresh-widgets');

		/**
		 *	Custom images size
		 *	Add Images sizes customizables in system
		 */

		add_image_size('solutions_thumbnail', 376, 185, true);
		add_image_size('case', 831, 398, false);
		add_image_size('perfil', 190, 190, false);
		add_image_size('marketplace', 630, 113, true);

		/**
		 * Add support for core custom logo.
		 *
		 * @link https://codex.wordpress.org/Theme_Logo
		 */
		add_theme_support('custom-logo', array(
			'height'      => 40,
			'width'       => 200,
			'flex-width'  => true,
			'flex-height' => true,
			'header-text' => array('site-title', 'site-description')
		));

		add_theme_support('post-thumbnails', array('marketplace', 'post', 'gallery-items', 'audio-items', 'video-items', 'page', 'event-items', 'staff'));
	}
endif;
add_action('after_setup_theme', 'auaha_setup');



/**
 * Enqueue scripts and styles.
 */

function auaha_scripts()
{
	// Obtém o caminho do arquivo de manifesto
	$manifest_path = get_template_directory_uri() . '/app/theme/dist/manifest.json';

	// Obtém o nome do arquivo desejado
	$nome_do_arquivo = 'mini-cart.js';

	// Lê o arquivo de manifesto
	$manifesto = file_get_contents($manifest_path);
	$manifesto_json = json_decode($manifesto, true);

	//var_dump($manifesto_json["index.css"]["file"]);
	// Verifica se o nome do arquivo existe no manifesto
	if (isset($manifesto_json["index.html"])) {
		$url_do_arquivo = $manifesto_json["index.html"]["file"];
		$url_css = $manifesto_json["index.css"]["file"];

		

		if(isset($manifesto_json["index.css"]["file"])) {

			wp_enqueue_style('Vite Style', get_template_directory_uri() . '/app/theme/dist/' . $url_css, false, '1.0.0');
		}

		wp_enqueue_script('meu-script', get_template_directory_uri() . '/app/theme/dist/' . $url_do_arquivo, array(), '1.0', true);
	}

	wp_enqueue_style('Invoice Style', get_template_directory_uri() . '/assets/style.css', '1.0.0');

	wp_enqueue_script( 'wp-api' );

	wp_localize_script( 'wp-api', 'wpApiSettings', array(
		'root' => esc_url_raw( rest_url() ),
		'nonce' => wp_create_nonce( 'wc_store_api' )
	) );


}
add_action('wp_enqueue_scripts', 'auaha_scripts');




/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';



