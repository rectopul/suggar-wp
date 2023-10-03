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
    
    <?php if (is_product()):?>
        <?php 
            $product_id = get_the_ID(); // Obtém o ID do produto atual
            $product = wc_get_product($product_id);

            $attr = ['id' => $product_id];
            $attributes = $product->get_attributes();

            foreach ($attributes as $attribute) {
                $attribute_name = $attribute->get_name(); // Obtém o nome do atributo
                $terms = $attribute->get_terms();

                $attr['variations'] = [$attribute_name => []];

                foreach ($terms as $key => $term) {
                    $attr['variations'][$attribute_name][] = [
                        'count' => $term->count,
                        'description' => $term->description,
                        'filter' => $term->filter,
                        'parent' => $term->parent,
                        'taxonomy' => $term->taxonomy,
                        'term_group' => $term->term_group,
                        'term_id' => $term->term_id,
                        'term_taxonomy_id' => $term->term_taxonomy_id,
                        'name' => $term->name,
                        'slug' => $term->slug,
                        // Adicione qualquer outra informação do termo que você deseja incluir
                    ];
                }
            }
        ?>
        <script>
            var product_Infos = JSON.parse('<?php echo json_encode($attr); ?>')
        </script>
        
        <div id="root_product"></div>
    <?php elseif (is_checkout()): ?>
        <div id="root_checkout"></div>
    <?php endif; ?>

<?php  endif; ?>

<?php get_footer(); ?>
