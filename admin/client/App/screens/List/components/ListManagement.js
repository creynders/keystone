import React, { PropTypes } from 'react';
import { InputGroup } from 'elemental';
import { Button, InlineGroup as Group, InlineGroupSection as Section, FormInput } from '../../../elemental';

function ListManagement ({
	checkedItemCount,
	handleDelete,
	handleSelect,
	handleToggle,
	isOpen,
	itemCount,
	itemsPerPage,
	nodelete,
	noedit,
	...props,
}) {
	// do not render if there's no results
	// or if edit/delete unavailable on the list
	if (!itemCount || (nodelete && noedit)) return;

	const buttonNoteStyles = { color: '#999', fontWeight: 'normal' };

	// delete button
	const actionButtons = isOpen && (
		<Section>
			<Button onClick={handleDelete} disabled={!checkedItemCount}>Delete</Button>
		</Section>
	);

	// select buttons
	const selectAllButton = itemCount > itemsPerPage && (
		<Button onClick={() => handleSelect('all')} title="Select all rows (including those not visible)">All <small style={buttonNoteStyles}>({itemCount})</small></Button>
	);
	const selectButtons = isOpen ? (
		<Section>
			<Group contiguous>
				{selectAllButton}
				<Button onClick={() => handleSelect('visible')} title="Select all rows">
					{itemCount > itemsPerPage ? 'Page ' : 'All '}
					<small style={buttonNoteStyles}>({itemCount > itemsPerPage ? itemsPerPage : itemCount})</small>
				</Button>
				<Button onClick={() => handleSelect('none')} title="Deselect all rows">None</Button>
			</Group>
		</Section>
	) : null;

	// selected count text
	const selectedCountText = isOpen ? (
		<Section grow>
			<span style={{ color: '#666', display: 'inline-block', lineHeight: '2.4em', margin: 1 }}>
				{checkedItemCount} selected
			</span>
		</Section>
	) : null;

	// put it all together
	return (
		<div>
			<Group style={{ float: 'left', marginRight: '.75em', marginBottom: 0 }}>
				<Section>
					<Button active={isOpen} onClick={() => handleToggle(!isOpen)}>
						Manage
					</Button>
				</Section>
				{selectButtons}
				{actionButtons}
				{selectedCountText}
			</Group>
		</div>
	);
};

ListManagement.propTypes = {
	checkedItems: PropTypes.number,
	handleDelete: PropTypes.func.isRequired,
	handleSelect: PropTypes.func.isRequired,
	handleToggle: PropTypes.func.isRequired,
	isOpen: PropTypes.bool,
	itemCount: PropTypes.number,
	itemsPerPage: PropTypes.number,
	nodelete: PropTypes.bool,
	noedit: PropTypes.bool,
};

module.exports = ListManagement;
