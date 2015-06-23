module.exports = function (stylecow) {

	var allCustomMedia = {};

	//Reset customMedia variable
	stylecow.addTask({
		position: 'before',
		fn: function (root) {
			allCustomMedia = {};
		}
	});

	//Save all custom-media
	stylecow.addTask({
		filter: {
			type: 'AtRule',
			name: 'custom-media'
		},
		fn: function (customMedia) {
			allCustomMedia[customMedia.get('ExtensionName').name] = customMedia.get('MediaQuery');
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
					var mediaquery = allCustomMedia[extension.name];

					if (mediaquery) {
						var expression = extension.getParent('ConditionalExpression');

						mediaquery.forEach(function (child) {
							expression.before(child.clone());
						});

						expression.detach();
						//extension.getParent('ConditionalExpression').replaceWith(mediaqueries.clone());
					}
				});
		}
	});
};
