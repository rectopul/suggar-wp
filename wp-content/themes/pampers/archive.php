<?php
/**
 * The template for displaying archive pages
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package auaha
 */

get_header();?>
<main>
	<section class="cases-page" style="background: url('<?php bloginfo('template_directory'); ?>/img/bg-cases-page.png')">
		<div class="cases-page__wrapper">
			<h2 class="cases-page__title">cases de sucesso</h2>

			<div class="cases-page__filter">
				<h4 class="cases-page__filter-title">Filtre nossos cases</h4>
				<?php wp_dropdown_categories( 'taxonomy=cases_category&value_field=slug&show_option_none=Plataforma' ); ?>
			</div>
			
			<div class="cases-page__posts">
			<?php
			if ( have_posts() ) : ?>

				<?php
				/* Start the Loop */
				while ( have_posts() ) : the_post();
				?>
					<article class="cases-page__posts-item">
						<a class="cases-page__link" href="<?php the_field('link_case'); ?>" target="_blank">
							<div class="cases-page__img-wrapper">
								<figure class="cases-page__img-1">
									<img src="<?php the_field('case_foto_1'); ?>" alt="<?php the_title(); ?>">
									<figcaption><?php the_title(); ?></figcaption>
								</figure>
								<div class="cases-page__img-wrapper-2">
									<figure class="cases-page__img-2">
										<img src="<?php the_field('case_foto_2'); ?>" alt="<?php the_title(); ?>">
										<figcaption><?php the_title(); ?></figcaption>
									</figure>
								</div>
							</div>
						</a>
					</article>
				<?php
				endwhile;

				the_posts_navigation();

			else :

				get_template_part( 'template-parts/content', 'none' );

			endif; ?>

			</div>
		</div>
	</section>
</main>
<?php include('components/cases/contrate.php')?>

<?php
get_footer();
