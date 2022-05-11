// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// import './Box.sol';

contract BoxV2 {
    uint256 private _value;

    // Emitted when the stored value changes
    event ValueChanged(uint256 value);

    // The onlyOwner modifier restricts who can call the store function
    function store(uint256 value) public {
        _value = value;
        emit ValueChanged(value);
    }

    // Reads the last stored value
    function retrieve() public view returns (uint256) {
        return _value;
    }

    function increment() public {
        _value = _value + 1;
        emit ValueChanged(_value);
    }
}
