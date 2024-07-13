import ape
import pytest

@pytest.fixture(scope="module")
def owner(accounts):
    return accounts[0]

@pytest.fixture(scope="module")
def domain(networks, owner, project):
    return project.Domain.deploy(owner, "agriculture", sender=owner)

@pytest.fixture(scope="module")
def tableland(domain):
    return ape.Contract(
        domain._tableland(),
        # partial IERC721 abi
        abi=[{
            "name": "ownerOf",
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "tokenId",
                    "type": "uint256"
                }
            ],
            "outputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }]
    )
