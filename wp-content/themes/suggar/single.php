<?php

/**
 * The template for displaying all single posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/#single-post
 *
 * @package auaha
 */

get_header(); ?>
<?php if (have_posts()) : the_post(); ?>

    <?php
        $comments = get_comments(array(
            'post_id' => get_the_ID(),
            'status' => 'approve', // Apenas comentários aprovados
        ));

        $categories = get_the_category();

        $category_list = [];

        foreach ($categories as $category) {
            $theCategory = [
                'name' => $category->name,
                'link' => get_term_link($category->term_id),
            ];
            $category_list[] = $theCategory;
        };
    ?>
    
    <script>

        var post_info = {
            id: <?php echo json_encode(get_the_ID()); ?>,
            title: '<?php echo get_the_title(); ?>',
            content: <?php echo json_encode(wp_strip_all_tags(get_the_content())); ?>,
            image: '<?php echo get_the_post_thumbnail_url(); ?>',
            author: '<?php echo get_author_name(); ?>',
            date: '<?php echo get_the_date('Y-m-d'); ?>', // Alterei para obter a data no formato desejado
            comments: <?php echo json_encode($comments); ?>,
            breadcrumbs: <?php echo json_encode($category_list); ?>,
        };
    </script>

<?php  endif; ?>

<div id="root_single"></div>

<?php get_footer(); ?>
