module.exports = function (stylecow) {

	//Save all custom-media in the root
	stylecow.addTask({
		filter: {
			type: 'AtRule',
			name: 'custom-media'
		},
		fn: function (customMedia) {
			var root = customMedia.getParent('Root');

			root.setData('@custom-media-' + customMedia.get('ExtensionName').name, customMedia.get('MediaQueries'));
			customMedia.detach();
		}
	});

	//Replace the custom-media
	stylecow.addTask({
		filter: {
			type: 'AtRule',
			name: 'media'
		},
		fn: function (media) {
			media
				.getAll('ExtensionName')
				.forEach(function (extension) {
					var mediaqueries = extension.getData('@custom-media-' + extension.name);

					if (mediaqueries) {
						extension.getParent('ConditionalExpression').replaceWith(mediaqueries.clone());
					}
				});
		}
	});
};
