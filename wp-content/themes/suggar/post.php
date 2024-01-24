<?php


get_header(); ?>

<?php if (have_posts()) : the_post(); ?>
    
    <script>
        var post_info = {
            title: '<?php echo get_the_title(); ?>',
            content: '<?php echo get_the_content(); ?>',
            image: '<?php echo get_the_post_thumbnail_url(); ?>',
            author: '<?php echo get_author_name(); ?>',
            author: '<?php echo get_post_datetime(); ?>',
        }
    </script>

<?php  endif;

get_footer();