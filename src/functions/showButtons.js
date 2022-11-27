const showButton = (arrayButtons, keyButton) => {
	const changedButtons = [];
	const btnToChange = arrayButtons.find(button => button.key == keyButton);

	arrayButtons.forEach(button => {
		if (button === btnToChange) {
			btnToChange.disabled = false;
			btnToChange.display = '';
			changedButtons.push(btnToChange);
		} else {
			changedButtons.push(button);
		}
	});

	return changedButtons;
};

export default showButton;