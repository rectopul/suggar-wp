<?php
/**
 * The template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site may use a
 * different template.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package auaha
 */

get_header(); ?>
	<?php
		while ( have_posts() ) : the_post();
		
		if (is_page(7)){ ?>
			<div id="root_checkout"></div>
		<?php 

		}elseif (is_product_category()) {
			$catalog = [
				'title' => get_the_title(),
				'id' => get_queried_object_id()
			];
			echo '<script>var categoryProps = '.json_encode($catalog).'</script>';
			echo '<div id="root_catalog"></div>';
		}elseif (is_shop()){
			echo '<div id="root_shop"></div>';
		}else{
			get_template_part( 'template-parts/content', 'page' );
		?>
		<?php };

		endwhile; // End of the loop.
	?>
<?php
get_footer();
