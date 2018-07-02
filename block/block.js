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
          edit: function( props ) {

            /*Set Variables from passed data*/
            var focus = props.focus;
			var focusedEditable = props.focus ? props.focus.editable || 'titleOne' : null;
			var alignment = props.attributes.alignment;
			var attributes = props.attributes;
			var columns = props.attributes.columns;

			/* Event handlers */
			var onSelectImageOne = function( media ) {
				return props.setAttributes( {
					mediaURLOne: media.url,
					mediaIDOne: media.id,
				} );
			};
			var onSetHrefOne = ( value ) => {
				props.setAttributes( {
					hrefOne: value,
				} );
			};

			var onSelectImageTwo = function( media ) {
				return props.setAttributes( {
					mediaURLTwo: media.url,
					mediaIDTwo: media.id,
				} );
			};
			var onSetHrefTwo = ( value ) => {
				props.setAttributes( {
					hrefTwo: value,
				} );
			};

			function onChangeAlignment( newAlignment ) {
				props.setAttributes( { alignment: newAlignment } );
			}
			function onChangeCols( newColumns ) {
				props.setAttributes( { columns: newColumns } );
			}

			return [
				!! focus && el( // Display controls when the block is clicked on.
					blocks.BlockControls,
					{ key: 'controls' },
					el(
						blocks.AlignmentToolbar,
						{
							value: alignment,
							onChange: onChangeAlignment,
						}
					),
				),
				!! focus && el(
					blocks.InspectorControls,
					{ key: 'inspector' },
					el( 'div', { className: 'components-block-description' }, // A brief description of our block in the inspector.
						el( 'p', {}, i18n.__( 'Feature block options.' ) ),
					),
					el( 'h3', {}, i18n.__( 'Layout' ) ), // The number of columns.
					el(
						SelectControl,
						{
							type: 'number',
							label: i18n.__( 'Number of Columns' ),
							value: columns,
							onChange: onChangeCols,
							options: [
							  { value: '1', label: i18n.__( 'One column' ) },
							  { value: '2', label: i18n.__( 'Two columns' ) },
							],
						}
					),
				),
				el( 'div', { className: props.className + ' gfblocks-cols-' + attributes.columns },
					el( 'div', {
						className: 'gfblocks-block gfblocks-block-1'
					},
						el( 'div', {
							className: attributes.mediaIDOne ? 'gfblocks-feature-image gfblocks-feature-image-1 image-active' : 'gfblocks-feature-image gfblocks-feature-image-1 image-inactive',
						},
							el( blocks.MediaUpload, {
								onSelect: onSelectImageOne,
								type: 'image',
								value: attributes.mediaIDOne,
								render: function( obj ) {
									return el( components.Button, {
										className: attributes.mediaIDOne ? 'image-button-1' : 'components-button button button-large button-one',
										onClick: obj.open
									},
									attributes.mediaIDOne ? el( 'img', { src: attributes.mediaURLOne } ) : i18n.__( 'Upload Image' )
									);
								}
							})
						),
						el( 'div', {
							className: 'gfblocks-feature-content gfblocks-feature-content-1', style: { textAlign: alignment } },
							el( blocks.Editable, {
								tagName: 'h3',
								className: 'gfblocks-title-1',
								inline: true,
								placeholder: i18n.__( 'Feature Title 1' ),
								value: attributes.titleOne,
								onChange: function( newTitle ) {
									props.setAttributes( { titleOne: newTitle } );
								},
								focus: focusedEditable === 'titleOne' ? focus : null,
								onFocus: function( focus ) {
									props.setFocus( _.extend( {}, focus, { editable: 'titleOne' } ) );
								},
							} ),
							el( blocks.Editable, {
								tagName: 'p',
								className: 'gfblocks-text-1',
								inline: true,
								placeholder: i18n.__( 'Enter feature text...' ),
								value: attributes.textOne,
								onChange: function( newText ) {
									props.setAttributes( { textOne: newText } );
								},
								focus: focusedEditable === 'textOne' ? focus : null,
								onFocus: function( focus ) {
									props.setFocus( _.extend( {}, focus, { editable: 'textOne' } ) );
								},
							} ),
						),
					),
					el( 'div', {
						className: 'gfblocks-block gfblocks-block-2'
					},
						el( 'div', {
							className: attributes.mediaIDTwo ? 'gfblocks-feature-image gfblocks-feature-image-2 image-active' : 'gfblocks-feature-image gfblocks-feature-image-2 image-inactive',
						},
							el( blocks.MediaUpload, {
								onSelect: onSelectImageTwo,
								type: 'image',
								value: attributes.mediaIDTwo,
								render: function( obj ) {
									return el( components.Button, {
										className: attributes.mediaIDTwo ? 'image-button-2' : 'components-button button button-large button-two',
										onClick: obj.open
									},
									attributes.mediaIDTwo ? el( 'img', { src: attributes.mediaURLTwo } ) : i18n.__( 'Upload Image' )
									);
								}
							}),
						),
						el( 'div', {
							className: 'gfblocks-feature-content gfblocks-feature-content-2', style: { textAlign: alignment } },
							el( blocks.Editable, {
								tagName: 'h3',
								className: 'gfblocks-title-2',
								inline: false,
								placeholder: i18n.__( 'Feature Title 2' ),
								value: attributes.titleTwo,
								onChange: function( newTitle ) {
									props.setAttributes( { titleTwo: newTitle } );
								},
								focus: focusedEditable === 'titleTwo' ? focus : null,
								onFocus: function( focus ) {
									props.setFocus( _.extend( {}, focus, { editable: 'titleTwo' } ) );
								},
							} ),
							el( blocks.Editable, {
								tagName: 'p',
								className: 'gfblocks-text-2',
								inline: true,
								placeholder: i18n.__( 'Enter feature text...' ),
								value: attributes.textTwo,
								onChange: function( newText ) {
									props.setAttributes( { textTwo: newText } );
								},
								focus: focusedEditable === 'textTwo' ? focus : null,
								onFocus: function( focus ) {
									props.setFocus( _.extend( {}, focus, { editable: 'textTwo' } ) );
								},
							} ),
						),
					),
				)
			];
		},
        
save: function( props ) {
	var attributes = props.attributes;
	var alignment = props.attributes.alignment;

	return (
		el( 'div', { className: props.className + ' gfblocks-cols-' + attributes.columns },
			el( 'div', {
				className: 'gfblocks-block gfblocks-block-1'
			},
				attributes.mediaURLOne &&
				el( 'div', { className: 'gfblocks-feature-image gfblocks-feature-image-1', style: {} },
					el( 'img', { src: attributes.mediaURLOne } ),
				),
				el( 'div', { className: 'gfblocks-feature-content gfblocks-feature-content-1', style: { textAlign: attributes.alignment } },
					el( 'h3', { className: 'gfblocks-title-1' }, attributes.titleOne ),
					el( 'p', { className: 'gfblocks-text-1' }, attributes.textOne ),
				),
			),
		)
	);
},
      })
    
  } )(
     window.wp.blocks,
     window.wp.i18n,
     window.wp.element,
  );