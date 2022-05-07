// Load dependencies
const { expect } = require('chai');

// Import utilities from Test Helpers
const { BN, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

// Load compiled artifacts
const Box = artifacts.require('Box');

// Start test block
contract('Box', function ([owner, other]) {
	// Use large integers aka 'big numbers'
	const value = new BN('42');

	beforeEach(async function () {
		// Deploy a new Box contract for each test
		this.box = await Box.new();
	});

	// Test case
	it('retrieve returns a value previously stored', async function () {
		// Store a value
		await this.box.store(value, { from: owner });

		// Use large integer comparisons
		// Test if the returned value is the same one
		// Strings are needed to compare the 256 bit integers
		expect(await this.box.retrieve()).to.be.bignumber.equal(value);
	});

	it('store emits an event', async function () {
		const receipt = await this.box.store(value, { from: owner });

		// Test that a ValuChanged event was emitted with the new value
		expectEvent(receipt, 'ValueChanged', { value: value });
	});

	it('non owner cannot store a value', async function () {
		// Test that transaction reverts
		await expectRevert(
			this.box.store(value, { from: other }),
			'Ownable: caller is not the owner'
		);
	});
});
