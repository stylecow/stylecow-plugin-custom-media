module.exports = function (stylecow) {

	//Save all custom-media in the root
	stylecow.addTask({
		fn: function (root) {
			root.
				getAll({
					type: 'AtRule',
					name: 'custom-media'
				})
				.forEach(function (customMedia) {
					root.setData(customMedia.get('ExtensionName').name, customMedia.get('MediaQueries'));
					customMedia.detach();
				});
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
					var mediaqueries = extension.getData(extension.name);

					if (mediaqueries) {
						extension.getParent('ConditionalExpression').replaceWith(mediaqueries.clone());
					}
				});
		}
	});
};
