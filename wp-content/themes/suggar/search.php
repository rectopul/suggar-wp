<?php
/**
 * The main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 *
 * @link https://codex.wordpress.org/Template_Hierarchy
 *
 * @package auaha
 */

get_header(); ?>

    <div id="primary" class="content-area">
        <main id="main" class="site-main">

            <div class="container">
                <div class="row">
                    <div class="category__page">

			<div class="container " style="margin-top: 50px;">
            <div class="row search-page">
            <?php
            // Check if there are any posts to display
            if (have_posts()) : ?>
                <?php

                while (have_posts()) : the_post(); ?>
                    <div class="conteudo-post">
                        <div class="foto-conteudo-post"><a
                                    href="<?php echo get_permalink($post->ID); ?>"><?php the_post_thumbnail(); ?></a>
                        </div>
                        <div class="titulo-conteudo-post"><p><a
                                        href="<?php echo get_permalink($post->ID); ?>"><? the_title(); ?></a>
                      		</p>
                   	 	</div>
               	 	</div>
                    
                <?php endwhile; ?>
            <?php endif; ?>
            



        </main>
    </div>

<?php
get_footer();
