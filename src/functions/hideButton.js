const hideButton = (arrayButtons, keyButton) => {
	const changedButtons = [];
	const btnToChange = arrayButtons.find(button => button.key == keyButton);

	arrayButtons.forEach(button => {
		if (button === btnToChange) {
			btnToChange.disabled = true;
			btnToChange.display = 'none';
			changedButtons.push(btnToChange);
		} else {
			changedButtons.push(button);
		}
	});

	return changedButtons;
};

export default hideButton;