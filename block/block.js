( function( blocks, i18n, element ) {
    /* Set up variables */

    var el = element.createElement;  // createElement from React, allows the block creation in the DOM
    var children = blocks.source.children;
    var BlockControls = wp.blocks.BlockControls; // Controls toolbar in the editor
    var AlignmentToolbar = wp.blocks.AlignmentToolbar; // Alignment toolbar in the editor
    var MediaUpload = wp.blocks.MediaUpload; // Standard add media button from WP
    var InspectorControls = wp.blocks.InspectorControls; // Tools in sidebar "inspector" panel in the editor
    var TextControl = wp.blocks.InspectorControls.TextControl; // Text field in inspector panel
    var SelectControl = wp.blocks.InspectorControls.SelectControl; // Select field in inspector panel

    /* Register block type */

    blocks.registerBlockType('gfblocks/feature-block', {
        title: i18n.__( 'Feature' ), // The title of our block.
        icon: 'info', // Dashicon icon for our block
        category: 'common', // The category of the block.
        attributes: {}, /* Placeholder */
        edit: {}, /* Placeholder */
        save: {} /* Placeholder */
      })
    
  } )(
     window.wp.blocks,
     window.wp.i18n,
     window.wp.element,
  );