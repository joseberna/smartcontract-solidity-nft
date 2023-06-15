// contracts/GameItem.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTDegree is ERC721 {
    struct NFT {
        string name;
        string metadataURI;
    }
    mapping(uint256 => NFT) private nfts;
    uint256 private nextTokenId;

    constructor() ERC721("Degree", "DeeNFT") {}

    // funcionar para crear el nft. recibe el hash para el tokenid, la direccion del propietario, el nombre y la uri del nft
    function createNFT(
        address add_owner,
        uint256 _tokenId,
        string memory name,
        string memory metadataURI
    ) public {
        _safeMint(add_owner, _tokenId);
        nfts[_tokenId] = NFT(name, metadataURI);
    }

    // funcionar para obtener la información de un nft a partir de su token id
    function getNFT(uint256 tokenId)
        public
        view
        returns (string memory, string memory)
    {
        require(_exists(tokenId), "El NFT no existe");
        return (nfts[tokenId].name, nfts[tokenId].metadataURI);
    }
}