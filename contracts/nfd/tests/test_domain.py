import ape
import json
import requests


TABLELAND_API = "http://localhost:8080/api/v1"
ZERO_ADDRESS = "0x0000000000000000000000000000000000000000"
WORLDCOIN_ADDRESS = "0x999999cf1046e68e36e1aa2e0e07105eddd1f08e"

def testConstruct(domain, owner, tableland):
    assert owner == domain.owner()
    assert "agriculture" == domain.name()

    tables = domain.tables()

    assert tableland.ownerOf(tables.producer[0]) == domain
    assert tableland.ownerOf(tables.schema[0]) == domain
    assert tableland.ownerOf(tables.dataset[0]) == domain

    assert 200 == requests.get(f'{domain.getBaseURI()}/tables/{domain.getChainId()}/{tables.producer[0]}').status_code
    assert 200 == requests.get(f'{domain.getBaseURI()}/tables/{domain.getChainId()}/{tables.schema[0]}').status_code
    assert 200 == requests.get(f'{domain.getBaseURI()}/tables/{domain.getChainId()}/{tables.dataset[0]}').status_code

def testRegisterSchema(domain, owner, chain):
    SCHEMAS = {
        "fields": [
            { "name": "id", "type": "integer" },
            { "name": "surface", "type": "integer" }
        ],
        "production": [
            { "name": "id", "type": "integer" },
            { "name": "field_id", "type": "integer" },
            { "name": "year", "type": "integer" },
            { "name": "production", "type": "integer" }
        ]
    }

    domain.registerSchema("fields", json.dumps(SCHEMAS["fields"]), "fields registry", sender=owner),
    domain.registerSchema("yearly_production", json.dumps(SCHEMAS["production"]), "fields production", sender=owner)

    tables = domain.tables()

    response = requests.get(f'{domain.getBaseURI()}/query?statement=SELECT * FROM {tables.schema[1]}')
    data = response.json()

    assert "fields" == data[0]["name"]
    assert "fields registry" == data[0]["description"]
    assert SCHEMAS["fields"] == data[0]["columns"]
    assert SCHEMAS["production"] == data[1]["columns"]

def testAddProducer(domain, producers):
    domain.addProducer(ZERO_ADDRESS, sender=producers[0])
    domain.addProducer(WORLDCOIN_ADDRESS, sender=producers[1])

    tables = domain.tables()
    response = requests.get(f'{domain.getBaseURI()}/query?statement=SELECT * FROM {tables.producer[1]}')

    PRODUCERS = [
        {'eth_address': producers[0].address.lower(), 'wc_address': None},
        {'eth_address': producers[1].address.lower(), 'wc_address': WORLDCOIN_ADDRESS.lower()}
    ]

    assert PRODUCERS == response.json()

def testAddDataset(domain, producers):
    domain.addDataset("fields", "cid00000fields", sender=producers[0])
    domain.addDataset("fields", "cid00001fields", sender=producers[1])
    domain.addDataset("production", "cid00000production", sender=producers[1])
    domain.addDataset("production", "cid00001production", sender=producers[1])

    tables = domain.tables()
    fields = requests.get(f"{domain.getBaseURI()}/query?statement=SELECT cid, producer_id FROM {tables.dataset[1]} WHERE schema_name='fields'")
    production = requests.get(f"{domain.getBaseURI()}/query?statement=SELECT cid, producer_id FROM {tables.dataset[1]} WHERE schema_name='production'")

    DATASETS = [
        [
            { "cid": "cid00000fields", "producer_id": producers[0].address.lower() },
            { "cid": "cid00001fields", "producer_id": producers[1].address.lower() },
        ],
        [
            { "cid": "cid00000production", "producer_id": producers[1].address.lower() },
            { "cid": "cid00001production", "producer_id": producers[1].address.lower() },
        ],
    ]

    assert DATASETS == [fields.json(), production.json()]

def testComposeQueries():
    pass
