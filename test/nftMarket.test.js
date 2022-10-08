const NftMarket = artifacts.require("NftMarket");
const { ethers } = require("ethers");

contract("NftMarket", accounts => {
    let _contract = null;
    let _nftPrice = ethers.utils.parseEther("0.3").toString();

    before(async () => {
        _contract = await NftMarket.deployed();
    })

    describe("Mint token", () => {
        const tokenURI = "https://test.com";
        before(async () => {
            await _contract.mintToken(tokenURI, _nftPrice, {
                from: accounts[0]
            })
        })

        it("owner of first token should be address[0]", async () => {
            const owner = await _contract.ownerOf(1);
            assert(owner === "0x0705318386325Db0fec3eB1255eb891978C37964", "owner of token is not matching accounts[0]");
            // assert.equal(owner, "0x0705318386325Db0fec3eB1255eb891978C37964");
        })

        it("first token should point to the correct token URI", async () => {
            const actualTokenURI = await _contract.tokenURI(1);

            assert.equal(actualTokenURI, tokenURI, "tokenURI is not correctly set!");
        })

        it("should not be possible to create NFT with existing tokenURI", async () => {
            try {
                await _contract.mintToken(tokenURI, _nftPrice, {
                    from: accounts[0]
                })
            } catch (error) {
                assert(error, "NFT was minted with previously used tokenURI")
            }
        })

        it("should have one listed item", async () => {
            const listedItemCount = await _contract.listedItemsCount();
            assert.equal(listedItemCount, 1, "Listed items count is not 1");
        })

        it("should have created NFT item", async () => {
            const nftItem = await _contract.getNftItem(1);

            assert.equal(nftItem.price, _nftPrice, "Incorrect price");
            assert.equal(nftItem.tokenId, 1, "Token id is not 1");
            assert.equal(nftItem.creator, accounts[0], "Token id is not 1");
            assert.equal(nftItem.isListed, true, "Token should be listed");
        })
    })
})