pragma solidity ^0.4.19;
import "./erc271.sol";

contract kl {

  // Events
  //Event broadcasts new erc271 token creation
  event Mint(address owner, uint256 tokenId);
  event gift(uint256 A,uint256 B);
  event Transfer(address from, address to, uint256 tokenId);
  event Approval(address owner, address approved, uint256 tokenId);


  /*** CONSTANTS ***/

  string public constant name = "Kitty-Love";
  string public constant symbol = "KL";

  bytes4 constant InterfaceID_ERC165 =
  bytes4(keccak256('supportsInterface(bytes4)'));

  bytes4 constant InterfaceID_ERC721 =
  bytes4(keccak256('name()')) ^
  bytes4(keccak256('symbol()')) ^
  bytes4(keccak256('totalSupply()')) ^
  bytes4(keccak256('balanceOf(address)')) ^
  bytes4(keccak256('ownerOf(uint256)')) ^
  bytes4(keccak256('approve(address,uint256)')) ^
  bytes4(keccak256('transfer(address,uint256)')) ^
  bytes4(keccak256('transferFrom(address,address,uint256)')) ^
  bytes4(keccak256('tokensOfOwner(address)'));


  /*** DATA TYPES ***/

  struct Token {
    address mintedBy;
    uint64 mintedAt;
    string message;
    int value;
  }

  /*** STORAGE ***/

  Token[] tokens;

  mapping (uint256 => address) public tokenIndexToOwner;
  mapping (address => uint256) public ownershipTokenCount;
  mapping (uint256 => address) public tokenIndexToApproved;

  /*** INTERNAL FUNCTIONS ***/

  function _owns(address _claimant, uint256 _tokenId) internal view returns (bool) {
    return tokenIndexToOwner[_tokenId] == _claimant;
  }

  function _approvedFor(address _claimant, uint256 _tokenId) internal view returns (bool) {
    return tokenIndexToApproved[_tokenId] == _claimant;
  }

  function _approve(address _to, uint256 _tokenId) internal {
    tokenIndexToApproved[_tokenId] = _to;

    Approval(tokenIndexToOwner[_tokenId], tokenIndexToApproved[_tokenId], _tokenId);
  }

  function _transfer(address _from, address _to, uint256 _tokenId) internal {
    ownershipTokenCount[_to]++;
    tokenIndexToOwner[_tokenId] = _to;

    if (_from != address(0)) {
      ownershipTokenCount[_from]--;
      delete tokenIndexToApproved[_tokenId];
    }

    Transfer(_from, _to, _tokenId);
  }

  function mintGift(address _owner, int r)public{
    _mint(_owner,r);
  }

  function _mint(address _owner, int r) internal returns (uint256 tokenId) {
    Token memory token = Token({
      mintedBy: _owner,
      mintedAt: uint64(now),
      message: "Catnip.fun",
      value: r
      });
      tokenId = tokens.push(token) - 1;

      Mint(_owner, tokenId);

      _transfer(0, _owner, tokenId);
    }

    /*** ERC721 IMPLEMENTATION ***/

    function supportsInterface(bytes4 _interfaceID) external view returns (bool) {
      return ((_interfaceID == InterfaceID_ERC165) || (_interfaceID == InterfaceID_ERC721));
    }

    function totalSupply() public view returns (uint256) {
      return tokens.length;
    }

    function balanceOf(address _owner) public view returns (uint256) {
      return ownershipTokenCount[_owner];
    }

    function ownerOf(uint256 _tokenId) external view returns (address owner) {
      owner = tokenIndexToOwner[_tokenId];
      require(owner != address(0));
    }

    function approve(address _to, uint256 _tokenId) external {
      require(_owns(msg.sender, _tokenId));

      _approve(_to, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) external {
      require(_to != address(0));
      require(_to != address(this));
      require(_owns(msg.sender, _tokenId));

      _transfer(msg.sender, _to, _tokenId);
    }

    function transferFrom(address _from, address _to, uint256 _tokenId) external {
      require(_to != address(0));
      require(_to != address(this));
      require(_approvedFor(msg.sender, _tokenId));
      require(_owns(_from, _tokenId));

      _transfer(_from, _to, _tokenId);
    }

    function tokensOfOwner(address _owner) external view returns (uint256[]) {
      uint256 balance = balanceOf(_owner);

      if (balance == 0) {
        return new uint256[](0);
        } else {
          uint256[] memory result = new uint256[](balance);
          uint256 maxTokenId = totalSupply();
          uint256 idx = 0;

          uint256 tokenId;
          for (tokenId = 1; tokenId <= maxTokenId; tokenId++) {
            if (tokenIndexToOwner[tokenId] == _owner) {
              result[idx] = tokenId;
              idx++;
            }
          }
        }

        return result;
      }


      /*** OTHER EXTERNAL FUNCTIONS ***/

      function mint(int r) external returns (uint256) {
        return _mint(msg.sender,r);
      }

      function getToken(uint256 _tokenId) external view returns (address mintedBy, uint64 mintedAt) {
        Token memory token = tokens[_tokenId];

        mintedBy = token.mintedBy;
        mintedAt = token.mintedAt;
      }

      function getData(uint256 _tokenId) external view returns (string){
        Token memory t = tokens [_tokenId];
        return t.message;
      }
    }

    //Contract Is what's called by both users upon acceptance of breeding
    contract Mate is kl{

      event Mate(address A, address B);
      event sendGifts(address owner,uint256 tokenId);

      address public A;
      address public B;
      address public mintFactory;

      mapping(address=>bool) public signatures;

      constructor(){
        mintFactory = new kl();
      }


      function sign(address _counterParty) public{
        require(_counterParty != msg.sender && !signatures[A]);
        A = msg.sender;
        B = _counterParty;
        signatures[A] = true;
      }

      function counterSign(int _r)public{
        require(msg.sender == B && signatures[A]);
        signatures[B] = true;

        //FIRE OFF MATE FUNCTION

        /* Mate( A, B);
        sendGifts(A,uint256 tokenId); */
        kl instance = kl(mintFactory);
        instance.mintGift(A,_r);
        instance.mintGift(B,_r);
      }


    }
    /**
