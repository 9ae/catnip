## Token Data Structure

Token structure

`struct Token {

address mintedBy;

uint64 creationTime;

bytes32 message;

uint value;

}`

Token Minting Call `function Mint(address _to, uint _value)`
