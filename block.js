const { registerBlockType } = wp.blocks;
const { MediaUpload, InspectorControls } = wp.blockEditor;
const { Button, PanelBody, TextControl} = wp.components;
const { Fragment } = wp.element;
const { __ } = wp.i18n;

// Register the block type
registerBlockType('imgb/marquee-block', {
    title: __('Image Marquee', 'imgb'),
    icon: 'format-gallery',
    category: 'media',
    attributes: {
        images: {
            type: 'array',
            default: [],
        },
        imageWidth: {
            type: 'string',
            default: '100px',
        },
        speed: {
            type: 'number', // New attribute for speed
            default: 1, // Default speed (1 for normal scrolling speed)
        },
    },
    edit: ({ attributes, setAttributes }) => {
        const { images, imageWidth, speed } = attributes;

        const onSelectImages = (newImages) => {
            setAttributes({ images: newImages });
        };

        const onChangeImageWidth = (newWidth) => {
            setAttributes({ imageWidth: newWidth });
        };

        // Handle speed change
        const onChangeSpeed = (newSpeed) => {
            setAttributes({ speed: parseFloat(newSpeed) }); // Ensure the speed is a number
        };

        return (
            <Fragment>
                <InspectorControls>
                    <PanelBody title={__('Images Settings', 'imgb')}>
                        <MediaUpload
                            multiple
                            gallery
                            value={images.map((img) => img.id)}
                            onSelect={onSelectImages}
                            allowedTypes={['image']}
                            render={({ open }) => (
                                <Button onClick={open} isPrimary>
                                    {__('Select Images', 'imgb')}
                                </Button>
                            )}
                        />
                        <TextControl
                            label={__('Image Width', 'imgb')}
                            value={imageWidth || '100px'}
                            onChange={onChangeImageWidth}
                            help={__('Enter the width of the images, e.g., "100px" or "50%".')}
                        />
                        <TextControl
                            label={__('Scroll Speed', 'imgb')}
                            value={speed}
                            onChange={onChangeSpeed}
                            help={__('Enter the scroll speed. Negative numbers will reverse the direction.')}
                            type="number"
                        />
                    </PanelBody>
                </InspectorControls>
                <div className="imgb-marquee-preview">
                    {images.length ? (
                        images.map((image) => (
                            <img class="marquee-img" key={image.id} src={image.url} alt={image.alt} style={{ width: imageWidth }} />
                        ))
                    ) : (
                        <p>{__('No images selected', 'imgb')}</p>
                    )}
                </div>
            </Fragment>
        );
    },
    save: ({ attributes }) => {
        const { images, imageWidth, speed } = attributes;

        return (
            <div className="imgb-marquee" data-speed={speed}>
                <div className="imgb-marquee-inner">
                    {images.map((image) => (
                        <img key={image.id} src={image.url} alt={image.alt} style={{ width: imageWidth }} />
                    ))}
                </div>
            </div>
        );
    }
});

