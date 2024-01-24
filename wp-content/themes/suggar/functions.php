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



add_action('rest_api_init', function() {

	/* unhook default function */
	remove_filter('rest_pre_serve_request', 'rest_send_cors_headers');

	/* then add your own filter */
	add_filter('rest_pre_serve_request', function( $value ) {
		 header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS, READ');

		 return $value;
	});
}, 15);

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

	// Obter todos os menus registrados no WordPress
    $menus = get_terms('nav_menu', ['hide_empty' => false]);

    $menu_data = [];

    $featured_image_url = get_the_post_thumbnail_url(21, 'full');
    $page_content = get_post_field('post_content', 21);
	$page_title = get_the_title(21);

    // Iterar sobre cada menu e obter seus itens
    foreach ($menus as $menu) {
        $menu_items = wp_get_nav_menu_items($menu->term_id);

        // Adicionar dados do menu e seus itens ao array
        $menu_data[$menu->name] = $menu_items;
    }
	//mini_banner_1
	$data = [
		'full_banner' => wp_get_attachment_image_url( get_theme_mod('section_full_banner'), 'full' ),
		'mini_banner_1' => wp_get_attachment_image_url( get_theme_mod('mini_banner_1'), 'full' ),
		'about_excerpt' => get_theme_mod('about_excerpt'),
		'contact_mail' => get_theme_mod( 'contact_mail' ),
		'corporate_reason' => get_theme_mod( 'corporate_reason' ),
		'copyright' => get_theme_mod( 'copyright_message' ),
		'media_middle' => wp_get_attachment_url(get_theme_mod( 'media_middle' )),
		'logos' => [
			'agencia' => wp_get_attachment_image_url( get_theme_mod('logo_agency'), 'full' ),
			'empresa' => wp_get_attachment_image_url( get_theme_mod('logo_work'), 'full' ),
		],
		'cep' => get_theme_mod( 'cep' ),
		'menus' => $menu_data,
		'ruler_options' => [
			'ruler_options_1' => get_theme_mod( 'ruller_options_1' ),
			'ruler_options_2' => get_theme_mod( 'ruller_options_2' ),
			'ruler_options_3' => get_theme_mod( 'ruller_options_3' ),
			'ruler_options_4' => get_theme_mod( 'ruller_options_4' )
		],
		'about' => [
			'title' => $page_title,
			'image' => $featured_image_url,
			'content' => $page_content
		]
	];

	return rest_ensure_response($data);
}

function register_get_nonce_route() {
    register_rest_route('shop/v1', 'get-nonce', array(
        'methods' => 'GET',
        'callback' => 'get_nonce_request',
    ));

    register_rest_route('shop/v1', 'get-integration-keys', array(
        'methods' => 'GET',
        'callback' => 'get_integrations_keys',
    ));
}

add_action('rest_api_init', 'register_get_nonce_route');

function get_integrations_keys($request) {
    // Gere o nonce
    $consumerKey = get_theme_mod( 'woo_customer_key' );
    $consumerSecret = get_theme_mod( 'woo_customer_secret' );

    // Retorne o nonce como JSON
    return rest_ensure_response(array('consumer_key' => $consumerKey, 'consumer_secret' => $consumerSecret));
}

function get_nonce_request($request) {
    // Gere o nonce
    $nonce = wp_create_nonce('wp_rest');
	$woononce = wp_create_nonce('wc_store_api');

    // Retorne o nonce como JSON
    return rest_ensure_response(array('nonce' => $nonce, 'woo_nonce' => $woononce));
}


if (!function_exists('rmb_setup')) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function rmb_setup()
	{
		/*
	 * Make theme available for translation.
	 * Translations can be filed in the /languages/ directory.
	 * If you're building a theme based on auaha, use a find and replace
	 * to change 'auaha' to the name of your theme in all the template files.
	 */
		load_theme_textdomain('pamper', get_template_directory() . '/languages');

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
			'menu-1' => esc_html__('Primary', 'suggar'),
			'menu-footer' => esc_html__('Footer', 'suggar'),
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
add_action('after_setup_theme', 'rmb_setup');


add_filter( 'rest_allow_anonymous_comments', function ( $allow_anonymous, $request ) {
    // ... custom logic here ...
    return true; // or false to prohibit anonymous comments via post
}, 10, 2 ); 


/**
 * Enqueue scripts and styles.
 */

function theme_scripts()
{
	// Obtém o caminho do arquivo de manifesto
	$manifest_path = get_template_directory_uri() . '/app/theme/dist/manifest.json';

	// Lê o arquivo de manifesto
	$manifesto = file_get_contents($manifest_path);
	$manifesto_json = json_decode($manifesto, true);

	// Verifica se o nome do arquivo existe no manifesto
	if (isset($manifesto_json["index.html"])) {
		$url_do_arquivo = $manifesto_json["index.html"]["file"];
		$url_css = $manifesto_json["index.css"]["file"];

		

		if(isset($manifesto_json["index.css"]["file"])) {

			wp_enqueue_style('Vite Style', get_template_directory_uri() . '/app/theme/dist/' . $url_css, false, '1.0.2');
		}

		wp_enqueue_script('meu-script', get_template_directory_uri() . '/app/theme/dist/' . $url_do_arquivo, array(), '1.2', true);
	}

	wp_enqueue_style('Invoice Style', get_template_directory_uri() . '/assets/style.css', '1.0.0');

	wp_enqueue_script( 'wp-api' );

	wp_localize_script( 'wp-api', 'wpApiSettings', array(
		'root' => esc_url_raw( rest_url() ),
		'nonce' => wp_create_nonce( 'wc_store_api' )
	) );

	// Verifica se a página atual é a de checkout
	// Verifica se é a página de pagamento e se o parâmetro 'order-pay' está presente na URL
	global $wp;
	if ( isset($wp->query_vars['order-pay']) && absint($wp->query_vars['order-pay']) > 0 ) {
		$order_id = absint($wp->query_vars['order-pay']);

		if ($order_id) {
			wp_enqueue_script('wp-api');
			wp_localize_script('wp-api', 'wpCheckoutOrder', array(
				'order' => $order_id
			));
		}
	}


}
add_action('wp_enqueue_scripts', 'theme_scripts');

add_action( 'woocommerce_review_order_after_cart_contents', 'ts_review_order_before_cart_contents', 10, 1 );

function ts_review_order_before_cart_contents(){
	//remove_action('woocommerce_review_order_after_cart_contents', array( 'classe', 'woocommerce_review_order_after_cart_contents' ), 10, 1);
	echo '<h2>woocommerce_review_order_before_cart_contents</h2>';
}


/**
 * Functions which enhance the theme by hooking into WordPress.
 */
require get_template_directory() . '/inc/template-functions.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';



