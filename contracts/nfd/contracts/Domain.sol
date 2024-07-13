pragma solidity ^0.8.20;

import { Ownable } from "@openzeppelin/contracts/access/Ownable.sol";
import { Strings } from "@openzeppelin/contracts/utils/Strings.sol";
import { ERC721Holder } from "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import { TablelandDeployments, TablelandTablesImpl } from "tableland/contracts/utils/TablelandDeployments.sol";
import { ITablelandTables } from "tableland/contracts/interfaces/ITablelandTables.sol";
import { SQLHelpers } from "tableland/contracts/utils/SQLHelpers.sol";

struct Ref {
  uint256 id;
  string name;
}

struct Tables {
  Ref producer;
  Ref schema;
  Ref dataset;
}

string constant PRODUCER_TABLE_PREFIX = "producer";
string constant SCHEMA_TABLE_PREFIX = "schema";
string constant DATASET_TABLE_PREFIX = "dataset";

contract Domain is Ownable, ERC721Holder {
  string public name;
  Tables public tables;

  constructor(address initialOwner, string memory _name) Ownable(initialOwner) {
    name = _name;

    string[] memory statements = new string[](3);
    statements[0] = SQLHelpers.toCreateFromSchema(
      "eth_address text PRIMARY KEY," // address
      "wc_address text UNIQUE DEFAULT NULL", // address
      PRODUCER_TABLE_PREFIX
    );
    statements[1] = SQLHelpers.toCreateFromSchema(
      "name text PRIMARY KEY,"
      "description text,"
      "columns text", // json
      SCHEMA_TABLE_PREFIX
    );
    statements[2] = SQLHelpers.toCreateFromSchema(
      "cid text PRIMARY KEY,"
      "producer_id text NOT NULL," // address, FOREIGN KEY PRODUCER_TABLE_PREFIX.eth_address
      "schema_name text NOT NULL," // string,  FOREIGN KEY SCHEMA_TABLE_PREFIX.name
      "blocktime integer",
      DATASET_TABLE_PREFIX
    );

    uint256[] memory _tableIds = getTablelandContract().create(
        address(this), // Table owner, i.e., this contract
        statements // Array of statement strings
    );

    tables.producer = Ref(_tableIds[0], SQLHelpers.toNameFromId(PRODUCER_TABLE_PREFIX, _tableIds[0]));
    tables.schema = Ref(_tableIds[1], SQLHelpers.toNameFromId(SCHEMA_TABLE_PREFIX, _tableIds[1]));
    tables.dataset = Ref(_tableIds[2], SQLHelpers.toNameFromId(DATASET_TABLE_PREFIX, _tableIds[2]));
  }
    
  function registerSchema(string calldata name, string calldata schema, string calldata description) external {
    string memory columns = "name, description, columns";
    string memory vals = string.concat(
      SQLHelpers.quote(name),
      ',',
      SQLHelpers.quote(description),
      ',',
      SQLHelpers.quote(schema) // json
    );
    TablelandDeployments.get().mutate(
      address(this), // Table owner, i.e., this contract
      tables.schema.id,
      SQLHelpers.toInsert(
          SCHEMA_TABLE_PREFIX,
          tables.schema.id,
          columns,
          vals
      )
    );
  }

  function addProducer(address worldcoin) external {
    string memory columns = (worldcoin == address(0)) ? "eth_address" : "eth_address, wc_address";
    string memory vals = (worldcoin == address(0)) 
      ? SQLHelpers.quote(Strings.toHexString(msg.sender))
      : string.concat(SQLHelpers.quote(Strings.toHexString(msg.sender)), ',', SQLHelpers.quote(Strings.toHexString(worldcoin)));
    TablelandDeployments.get().mutate(
      address(this), // Table owner, i.e., this contract
      tables.producer.id,
      SQLHelpers.toInsert(
          PRODUCER_TABLE_PREFIX,
          tables.producer.id,
          columns,
          vals
      )
    );
  }

  function addDataset(string calldata schema, string calldata cid) external {
    // TODO assert producer and schema exist
    string memory columns = "cid, producer_id, schema_name, blocktime";
    string memory vals = string.concat(
      SQLHelpers.quote(cid),
      ',',
      SQLHelpers.quote(Strings.toHexString(msg.sender)),
      ',',
      SQLHelpers.quote(schema),
      ',',
      Strings.toHexString(block.number)
    );
    TablelandDeployments.get().mutate(
      address(this), // Table owner, i.e., this contract
      tables.dataset.id,
      SQLHelpers.toInsert(
          DATASET_TABLE_PREFIX,
          tables.dataset.id,
          columns,
          vals
      )
    );
  }

  //function fetchTables() external view returns (Tables) {
  //  return tables;
  //}

  function getTablelandContract () public view returns (ITablelandTables) {
    return TablelandDeployments.get();
  }

  function getBaseURI () public view returns (string memory) {
    return TablelandDeployments.getBaseURI();
  }

  function getChainId () public view returns (uint256) {
    return block.chainid;
  }

}
