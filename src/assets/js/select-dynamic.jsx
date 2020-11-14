/**
 * Script for Select Dynamic Control
 */
import SelectDynamicControl from './select-dynamic-control';

const {
	addFilter,
} = wp.hooks;

const { __ } = wp.i18n;

const {
	Fragment,
} = wp.element;

const {
	PanelBody,
	BaseControl,
	RadioControl,
} = wp.components;

/**
 * Control render in editor.
 */
addFilter('lzb.editor.control.select_dynamic.render', 'lzb.editor', (render, props) => (
  <SelectDynamicControl
	label={props.data.label}
	help={props.data.help}
	entityType={props.data.entity_type}
	postType={props.data.post_type}
	taxonomyType={props.data.taxonomy_type}
	parentEntity={props.data.parent_entity}
	value={props.getValue()}
	onChange={props.onChange}
  />
));

/**
 * Control settings render in lazy block constructor mode.
 */
addFilter('lzb.constructor.control.select_dynamic.settings', 'lzb.constructor', (render, props) => {
	const {
		updateData,
		data,
	} = props;

	return (
	  <Fragment>
		  <PanelBody>
			  <BaseControl
				label={__('Entity Type', '@@text_domain')}
				help={__('Allows you to select the entity type to render as select options', '@@text_domain')}
			  >
				  <RadioControl
					options={[
						{
							label: __('Posts', '@@text_domain'),
							value: 'posts',
						}, {
							label: __('Pages', '@@text_domain'),
							value: 'pages',
						}, {
							label: __('Taxonomies', '@@text_domain'),
							value: 'taxonomies',
						}
					]}
					selected={data.entity_type || ''}
					onChange={(value) => updateData({ entity_type: value })}
				  />
			  </BaseControl>

			  {props.data.entity_type && props.data.entity_type === 'posts' && (
				<BaseControl
				  label={__('Post type', '@@text_domain')}
				  help={__('Allows you to select a custom post type. Defaults to "Post" if nothing is selected', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType='post-type'
					  value={props.data.post_type}
					  onChange={(value) => updateData({ post_type: value })}
					/>
				</BaseControl>
			  )}

			  {props.data.entity_type && props.data.entity_type === 'taxonomies' && (
				<BaseControl
				  label={__('Taxonomy type', '@@text_domain')}
				  help={__('Allows you to select a custom taxonomy type. Defaults to "Category" if nothing is selected', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType='taxonomy-type'
					  value={props.data.taxonomy_type}
					  onChange={(value) => updateData({ taxonomy_type: value })}
					/>
				</BaseControl>
			  )}

			  {((props.data.entity_type && props.data.entity_type === 'pages') || (props.data.taxonomy_type && props.data.taxonomy_type === 'category')) && (
				<BaseControl
				  label={__('Parent entity', '@@text_domain')}
				  help={__('Allows you to restrict the select options to a certain parent entity, otherwise leave blank', '@@text_domain')}
				>
					<SelectDynamicControl
					  entityType={props.data.entity_type}
					  postType={props.data.post_type}
					  taxonomyType={props.data.taxonomy_type}
					  value={props.data.parent_entity}
					  onChange={(value) => updateData({ parent_entity: value })}
					/>
				</BaseControl>
			  )}
		  </PanelBody>
	  </Fragment>
	);
});
