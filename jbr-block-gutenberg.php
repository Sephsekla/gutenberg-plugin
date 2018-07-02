<?php
/**
 * Plugin Name: JBR Gutenberg Block
 * Plugin URI: https://joebr.io/
 * Description: Gutenberg Block Development
 * Author: Joe Bailey-Roberts
 * Plugin URI: https://joebr.io/
 * Version: 1.0.0
 * License: None
 * License URI: None
 * 
 * Developed using instructions provided by Catapult Themes (https://github.com/Catapult-Themes/Feature-Block-Gutenberg)
 *
 * @package JBR_Gutenberg_Block
 */
// Exit if accessed directly.
defined('ABSPATH') || exit;


function gfblock_enqueue_block_editor_assets() {
	// Scripts.
	wp_enqueue_script(
		'gfblock-block', // Handle.
		plugin_dir_url( __FILE__ ) . 'block/block.js', // File.
		array( 'wp-blocks', 'wp-i18n', 'wp-element' ), // Dependencies.
		filemtime( plugin_dir_path( __FILE__ ) . 'block/block.js' ) // filemtime â€” Gets file modification time.
	);

	// Styles.
	wp_enqueue_style(
		'gfblock-block-editor', // Handle.
		plugin_dir_url( __FILE__ ) . 'assets/css/editor.css', // File.
		array( 'wp-edit-blocks' ), // Dependency.
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/editor.css' ) // filemtime â€” Gets file modification time.
	);
}
add_action( 'enqueue_block_editor_assets', 'gfblock_enqueue_block_editor_assets' );

/**
 * Enqueue the block's assets for the frontend.
 *
 * @since 1.0.0
 */
function gfblock_enqueue_block_assets() {
	wp_enqueue_style(
		'gfblock-frontend', // Handle.
		plugin_dir_url( __FILE__ ) . 'assets/css/style.css', // File.
		array( 'wp-blocks' ), // Dependency.
		filemtime( plugin_dir_path( __FILE__ ) . 'assets/css/style.css' ) // filemtime â€” Gets file modification time.
	);
}
add_action( 'enqueue_block_assets', 'gfblock_enqueue_block_assets' );