<?php
/**
 * Plugin Name:       Image Marquee Block
 * Description:       A block that creates a horizontal infinite marquee of selected images.
 * Version:           1.0
 * Author:            ChatGPT
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
    exit;
}

function imgb_marquee_block_init() {
    wp_register_script(
        'imgb-marquee-block',
        plugins_url('dist/block.bundle.js', __FILE__),
        array('wp-blocks', 'wp-element', 'wp-editor', 'wp-components', 'wp-data', 'wp-i18n'),
        filemtime(plugin_dir_path(__FILE__) . 'dist/block.bundle.js')
    );

    // Register the frontend-specific script
    wp_register_script(
        'imgb-marquee-frontend',
        plugins_url('dist/frontend.js', __FILE__), // Assuming the frontend.js will be in the dist folder
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'dist/frontend.js'),
        true
    );

    wp_register_style(
        'imgb-marquee-block-editor-style',
        plugins_url('style.css', __FILE__),
        array(),
        filemtime(plugin_dir_path(__FILE__) . 'style.css')
    );

    register_block_type('imgb/marquee-block', array(
        'editor_script' => 'imgb-marquee-block',
        'style'         => 'imgb-marquee-block-editor-style',
        'render_callback' => 'imgb_render_marquee_block',
        'attributes'    => array(
            'images' => array(
                'type' => 'array',
                'default' => [],
            ),
        ),
    ));

    // Enqueue the frontend.js script only on the frontend
    add_action('wp_enqueue_scripts', function() {
        wp_enqueue_script('imgb-marquee-frontend');
    });
}
add_action('init', 'imgb_marquee_block_init');

