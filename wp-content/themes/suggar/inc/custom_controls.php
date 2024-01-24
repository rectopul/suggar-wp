<?php 
if (!class_exists('WP_Customize_Image_Control')) {
    return null;
}

class Multi_Image_Custom_Control extends WP_Customize_Control
{
    public function enqueue()
    {
      wp_enqueue_style('multi-image-style', get_template_directory_uri().'/assets/css/multi-image.css');
      wp_enqueue_script('multi-image-script', get_template_directory_uri().'/assets/js/controls.js', array( 'jquery' ), rand(), true);
    }

    public function render_content()
    { ?>
          <label>
            <span class='customize-control-title'>Image</span>
          </label>
          <div>
            <ul class='images'></ul>
          </div>
          <div class='actions'>
            <a class="button-secondary upload">Add</a>
          </div>

          <input class="wp-editor-area" id="images-input" type="hidden" <?php $this->link(); ?>>
      <?php
    }
}