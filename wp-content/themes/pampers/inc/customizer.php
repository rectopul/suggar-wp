<?php
/**
 * Insert all Customizes Panels in one function
 */
function rmb_customize_panels($wp_customize)
{
    $wp_customize->add_panel('pampers_theme_options', array(
        'priority'       => 40,
        'capability'     => 'edit_theme_options',
        'title'          => 'Opções tema Score',
        'description'    => 'Edite e altere informações do tema score',
    ));

    $wp_customize->add_panel('pampers_integration_options', array(
        'priority'       => 1,
        'capability'     => 'edit_theme_options',
        'title'          => 'Opções de integração',
        'description'    => 'Informações de integração de api do tema',
    ));
}
add_action('customize_register', 'rmb_customize_panels');

/**
 * Insert all Customizes Sections in one function
 */
function rmb_customize_sections($wp_customize)
{
    $wp_customize->add_section('woo_keys', array(
        'title'    => __('Credenciais do Woocommerce', 'pampers'),
        'capability' => 'edit_theme_options',
        'description' => __('Edite as informações de credenciais do woocommerce'),
        'priority' => 1,
        'panel'            => 'pampers_integration_options'
    ));

    $wp_customize->add_section('section_message_credit', array(
        'title'    => __('Mensagem de crédito', 'score'),
        'capability' => 'edit_theme_options',
        'description' => __('Edite os conteúdos da homepage'),
        'priority' => 1,
        'panel'            => 'pampers_theme_options'
    ));
    $wp_customize->add_section('section_full_banner', array(
        'title'    => __('Banner Principal', 'pampers'),
        'capability' => 'edit_theme_options',
        'description' => __('Edite o Banner Principal'),
        'priority' => 1,
        'panel'            => 'pampers_theme_options'
    ));

    $wp_customize->add_section('mini_banner_1', array(
        'title'    => __('Mini Banner 1', 'pampers'),
        'capability' => 'edit_theme_options',
        'description' => __('Edite o Banner Principal'),
        'priority' => 2,
        'panel'            => 'pampers_theme_options'
    ));

    $wp_customize->add_section('about_excerpt', array(
        'title'    => __('Texto curto Sobre nós', 'pampers'),
        'capability' => 'edit_theme_options',
        'description' => __('Edite o texto curto sobre nós'),
        'priority' => 1,
        'panel'            => 'pampers_theme_options'
    ));

	$wp_customize->add_section('phone_whats', array(
        'title'    => __('Telefone e Whatsapp', 'score'),
        'capability' => 'edit_theme_options',
        'description' => __('Altere o número de telefone e whatsapp do tema'),
        'priority' => 1,
        'panel'            => 'pampers_theme_options'
    ));

	$wp_customize->add_section('ruller_options', array(
        'title'    => __('Régua de opções', 'score'),
        'capability' => 'edit_theme_options',
        'description' => __('Altere a régua de opções'),
        'priority' => 1,
        'panel'            => 'pampers_theme_options'
    ));

	$wp_customize->add_section('contact_options', array(
        'title'    => __('Opções de contato', 'pampers'),
        'capability' => 'edit_theme_options',
        'description' => __('Altere as opções de contato'),
        'priority' => 1,
        'panel'            => 'pampers_theme_options'
    ));

}
add_action('customize_register', 'rmb_customize_sections');

/**
 * Insert all Customizes Settings in one function
 */
function rmb_customize_settings($wp_customize)
{
	 /**
     * Home page title
     * section: home_title
     */
    $wp_customize->add_setting('woo_customer_key', array(
        'default'           => '',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_setting('woo_customer_secret', array(
        'default'           => '',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_setting('section_full_banner', array(
        'default'           => '',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_setting('mini_banner_1', array(
        'default'           => '',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_setting('about_excerpt', array(
        'default'           => '',
        'transport' => 'postMessage',
    ));

    $wp_customize->add_setting('phone', array(
        'default'           => '',
        'transport' => 'refresh',
    ));

    $wp_customize->add_setting('whats', array(
        'default'           => '',
        'transport' => 'refresh',
    ));

    $wp_customize->add_setting('ruller_options_1', array(
        'default'           => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_setting('ruller_options_2', array(
        'default'           => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_setting('ruller_options_3', array(
        'default'           => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_setting('ruller_options_4', array(
        'default'           => '',
        'transport' => 'refresh',
    ));

    $wp_customize->add_setting('contact_mail', array(
        'default'           => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_setting('corporate_reason', array(
        'default'           => '',
        'transport' => 'refresh',
    ));
    $wp_customize->add_setting('cep', array(
        'default'           => '',
        'transport' => 'refresh',
    ));
}

add_action('customize_register', 'rmb_customize_settings');

function rmb_custom_controls($wp_customize)
{
    $wp_customize->add_control( 
		new WP_Customize_Media_Control( 
		  $wp_customize, 'section_full_banner', 
		  	[
				'label' => __( 'Banner Principal', 'theme_textdomain' ), 
				'section' => 'section_full_banner', 
				'mime_type' => 'image', // other options, e.g. audio 
			]
	) );

    $wp_customize->add_control( 
		new WP_Customize_Media_Control( 
		  $wp_customize, 'mini_banner_1', 
		  	[
				'label' => __( 'Mini Banner 1', 'theme_textdomain' ), 
				'section' => 'mini_banner_1', 
				'mime_type' => 'image', // other options, e.g. audio 
			]
	) );

	
	$wp_customize->add_control( 
		new WP_Customize_Media_Control( 
		  $wp_customize, 'advice_image', 
		  	[
				'label' => __( 'Imagem destaque', 'theme_textdomain' ), 
				'section' => 'advice', 
				'mime_type' => 'image', // other options, e.g. audio 
			]
	) );

	$wp_customize->add_control('woo_customer_key', array(
        'type' => 'text',
        'section' => 'woo_keys', // // Add a default or your own section
        'label' => __('Customer Key'),
        'description' => __('Customer Key gerada pelo woocommerce.'),
    ));

	$wp_customize->add_control('woo_customer_secret', array(
        'type' => 'text',
        'section' => 'woo_keys', // // Add a default or your own section
        'label' => __('Customer Secret'),
        'description' => __('Customer Secret gerada pelo woocommerce.'),
    ));

	$wp_customize->add_control('about_excerpt', array(
        'type' => 'textarea',
        'section' => 'about_excerpt', // // Add a default or your own section
        'label' => __('Texto curto sobre nós'),
        'description' => __('Altere o texto curto sobre nós.'),
    ));

	$wp_customize->add_control('ruller_options_1', array(
        'type' => 'textarea',
        'section' => 'ruller_options', // // Add a default or your own section
        'label' => __('Opção 1'),
        'description' => __('Altere o texto da primeira opção da régua de opções'),
    ));

	$wp_customize->add_control('ruller_options_2', array(
        'type' => 'textarea',
        'section' => 'ruller_options', // // Add a default or your own section
        'label' => __('Opção 2'),
        'description' => __('Altere o texto da segunda opção da régua de opções'),
    ));

	$wp_customize->add_control('ruller_options_3', array(
        'type' => 'textarea',
        'section' => 'ruller_options', // // Add a default or your own section
        'label' => __('Opção 3'),
        'description' => __('Altere o texto da terceira opção da régua de opções'),
    ));
	$wp_customize->add_control('ruller_options_4', array(
        'type' => 'textarea',
        'section' => 'ruller_options', // // Add a default or your own section
        'label' => __('Opção 4'),
        'description' => __('Altere o texto da quarta opção da régua de opções'),
    ));

	$wp_customize->add_control('contact_mail', array(
        'type' => 'text',
        'section' => 'contact_options', // // Add a default or your own section
        'label' => __('E-mail para contato'),
        'description' => __('Altere o e-mail para contato.'),
    ));

	$wp_customize->add_control('corporate_reason', array(
        'type' => 'text',
        'section' => 'contact_options', // // Add a default or your own section
        'label' => __('Razão social'),
        'description' => __('Altere a razão social.'),
    ));
	$wp_customize->add_control('cep', array(
        'type' => 'text',
        'section' => 'contact_options', // // Add a default or your own section
        'label' => __('CEP'),
        'description' => __('Altere o cep.'),
    ));

	$wp_customize->add_control('message_credit', array(
        'type' => 'textarea',
        'section' => 'section_message_credit', // // Add a default or your own section
        'label' => __('Mensagem de crédito'),
        'description' => __('Altere o texto da informação de crédito chamativa.'),
    ));

	//Contratação
	$wp_customize->add_control('contraction_title', array(
        'type' => 'text',
        'section' => 'contraction', // // Add a default or your own section
        'label' => __('Titulo Contratação'),
        'description' => __('Altere o texto do titulo da contratação.'),
    ));

	$wp_customize->add_control('contraction_text', array(
        'type' => 'textarea',
        'section' => 'contraction', // // Add a default or your own section
        'label' => __('Texto Contratação'),
        'description' => __('Altere o texto do bloco de contratação.'),
    ));

	$wp_customize->add_control('contract_title_content', array(
        'type' => 'text',
        'section' => 'contraction', // // Add a default or your own section
        'label' => __('Titulo Conteúdo Contratação'),
        'description' => __('Altere o texto do titulo do conteúdo do bloco de contratação.'),
    ));
	$wp_customize->add_control('contraction_content', array(
        'type' => 'textarea',
        'section' => 'contraction', // // Add a default or your own section
        'label' => __('Conteúdo Contratação'),
        'description' => __('Altere o texto do conteúdo do bloco de contratação.'),
    ));

	$wp_customize->add_control( 
		new WP_Customize_Media_Control( 
		  $wp_customize, 'contraction_image', 
		  	[
				'label' => __( 'Imagem destaque', 'theme_textdomain' ), 
				'section' => 'contraction', 
				'mime_type' => 'image', // other options, e.g. audio 
			]
	) );

	//Phone and Whats
	$wp_customize->add_control('phone', array(
        'type' => 'text',
        'section' => 'phone_whats', // // Add a default or your own section
        'label' => __('Telefone para contato'),
        'description' => __('Altere o número de telefone para contato.'),
    ));
	//Phone and Whats
	$wp_customize->add_control('whats', array(
        'type' => 'text',
        'section' => 'phone_whats', // // Add a default or your own section
        'label' => __('Número de whatsapp'),
        'description' => __('Altere o número de whatsapp para contato.'),
    ));
}

add_action('customize_register', 'rmb_custom_controls');

function rmb_custom_partials($wp_customize)
{
	//Message credit
	$wp_customize->selective_refresh->add_partial(
        'message_credit',
        [
            'selector' => '.message-credit-title',
            'render_callback' => 'theme_customize_message_score',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
	//Message credit
	$wp_customize->selective_refresh->add_partial(
        'contraction_title',
        [
            'selector' => '.contraction_title > h4',
            'render_callback' => 'theme_customize_contraction_title',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
	$wp_customize->selective_refresh->add_partial(
        'contraction_text',
        [
            'selector' => '.contraction_text > h2',
            'render_callback' => 'theme_customize_contraction_text',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'contraction_image',
        [
            'selector' => '.contraction_image',
            'render_callback' => 'theme_customize_contraction_image',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'contraction_content',
        [
            'selector' => '.contraction_content p',
            'render_callback' => 'theme_customize_contraction_content',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
	$wp_customize->selective_refresh->add_partial(
        'contract_title_content',
        [
            'selector' => '.contract_title_content',
            'render_callback' => 'theme_customize_contraction_title_content',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'advice_subtitle',
        [
            'selector' => '.advice_subtitle > h6',
            'render_callback' => 'theme_customize_advice_subtitle',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
	$wp_customize->selective_refresh->add_partial(
        'advice_title',
        [
            'selector' => '.advice_title > h6',
            'render_callback' => 'theme_customize_advice_title',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'advice_content_1_title',
        [
            'selector' => '.advice_content_1_title > h6',
            'render_callback' => 'theme_customize_advice_content_1_title',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
	$wp_customize->selective_refresh->add_partial(
        'advice_content_1',
        [
            'selector' => '.advice_content_1_title > p',
            'render_callback' => 'theme_customize_advice_content_1',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'advice_content_2_title',
        [
            'selector' => '.advice_content_2_title > h6',
            'render_callback' => 'theme_customize_advice_content_2_title',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
	$wp_customize->selective_refresh->add_partial(
        'advice_content_2',
        [
            'selector' => '.advice_content_2_title > p',
            'render_callback' => 'theme_customize_advice_content_2',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'clients_subtitle',
        [
            'selector' => '.clients_title > h6',
            'render_callback' => 'theme_customize_clients_subtitle',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );

	$wp_customize->selective_refresh->add_partial(
        'clients_title',
        [
            'selector' => '.clients_title > h2',
            'render_callback' => 'theme_customize_clients_title',
            'container_inclusive' => false,
            'fallback_refresh' => false
        ]
    );
}

add_action('customize_register', 'rmb_custom_partials');



function theme_customize_clients_subtitle() {
	echo nl2br(get_theme_mod('clients_subtitle'));
}
function theme_customize_clients_title() {
	echo nl2br(get_theme_mod('clients_title'));
}
function theme_customize_advice_content_1() {
	echo nl2br(get_theme_mod('advice_content_1'));
}
function theme_customize_advice_content_1_title() {
	echo nl2br(get_theme_mod('advice_content_1_title'));
}
function theme_customize_advice_content_2() {
	echo nl2br(get_theme_mod('advice_content_2'));
}
function theme_customize_advice_content_2_title() {
	echo nl2br(get_theme_mod('advice_content_2_title'));
}

function theme_customize_advice_subtitle() {
	echo nl2br(get_theme_mod('advice_subtitle'));
}

function theme_customize_advice_title() {
	echo nl2br(get_theme_mod('advice_title'));
}

function theme_customize_contraction_image() {
	echo wp_get_attachment_image(get_theme_mod('contraction_image'), 'view_large');
}

function theme_customize_contraction_title_content() {
	echo nl2br(get_theme_mod('contract_title_content'));
}
function theme_customize_contraction_content() {
	echo nl2br(get_theme_mod('contraction_content'));
}

function theme_customize_message_score() {
	echo nl2br(get_theme_mod('message_credit'));
}

function theme_customize_contraction_title() {
	echo nl2br(get_theme_mod('contraction_title'));
}
function theme_customize_contraction_text() {
	echo nl2br(get_theme_mod('contraction_text'));
}

/**
 * Render the site title for the selective refresh partial.
 *
 * @return void
 */
function auaha_customize_partial_blogname() {
	bloginfo( 'name' );
}

/**
 * Render the site tagline for the selective refresh partial.
 *
 * @return void
 */
function auaha_customize_partial_blogdescription() {
	bloginfo( 'description' );
}

/**
 * Binds JS handlers to make Theme Customizer preview reload changes asynchronously.
 */
function auaha_customize_preview_js() {
	wp_enqueue_script( 'auaha_customizer', get_template_directory_uri() . '/js/customizer.js', array( 'customize-preview' ), '20151215', true );
}
add_action( 'customize_preview_init', 'auaha_customize_preview_js' );

/**
 * Media gallery
 */

function featured_image_gallery_customize_register( $wp_customize ) {
 
    if ( ! class_exists( 'CustomizeImageGalleryControl\Control' ) ) {
        return;
    }
 
    $wp_customize->add_section( 'featured_image_gallery_section', array(
        'title'      => __( 'Gallery Section' ),
        'description' => __('As imagens do bloco de clientes'),
        'capability' => 'edit_theme_options',
        'priority'   => 25,
        'panel'            => 'score_theme_options'
    ) );
    $wp_customize->add_setting( 'featured_image_gallery', array(
        'default' => array(),
        'sanitize_callback' => 'wp_parse_id_list',
    ) );


    $wp_customize->add_control( new CustomizeImageGalleryControl\Control(
        $wp_customize,
        'featured_image_gallery',
        array(
            'label'    => __( 'Imagens Carrossel' ),
            'section'  => 'clients',
            'settings' => 'featured_image_gallery',
            'type'     => 'image_gallery',
        )
    ) );
}
add_action( 'customize_register', 'featured_image_gallery_customize_register' );
