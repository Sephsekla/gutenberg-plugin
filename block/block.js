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
        attributes: { // Necessary for saving block content.
            titleOne: {
              type: 'array', //Title for first feature
              source: 'children',
              selector: '.gfblocks-title-1',
            },
            textOne: {
              type: 'array', //Text for first feature
              source: 'children',
              selector: '.gfblocks-text-1',
            },
            mediaIDOne: {
              type: 'number', // Media ID for first feature
            },
            mediaURLOne: {
              type: 'string', // Media URL for first feature
              source: 'attribute',
              selector: '.gfblocks-feature-image-1 img',
              attribute: 'src',
            },
            hrefOne: {
              type: 'url', // Link for first feature
            },
            titleTwo: {
              type: 'array',
              source: 'children',
              selector: '.gfblocks-title-2',
            },
            textTwo: {
              type: 'array',
              source: 'children',
              selector: '.gfblocks-text-2',
            },
            mediaIDTwo: {
              type: 'number',
            },
            mediaURLTwo: {
              type: 'string',
              source: 'attribute',
              selector: '.gfblocks-feature-image-2 img',
              attribute: 'src',
            },
            hrefTwo: {
              type: 'url',
            },
            alignment: {
              type: 'string',
              default: 'center',
            },
            columns: {
              type: 'select', //Number of columns
              default: '2'
            }
          },
        edit: {}, /* Placeholder */
        save: {} /* Placeholder */
      })
    
  } )(
     window.wp.blocks,
     window.wp.i18n,
     window.wp.element,
  );