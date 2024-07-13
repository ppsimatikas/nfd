pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/utils/ERC721Holder.sol";
import { TablelandDeployments, TablelandTablesImpl } from "tableland/contracts/utils/TablelandDeployments.sol";
import { ITablelandTables } from "tableland/contracts/interfaces/ITablelandTables.sol";
import { SQLHelpers } from "tableland/contracts/utils/SQLHelpers.sol";

struct Table {
  uint256 id;
  string description;
  string schema;
}

contract Domain is Ownable, ERC721Holder {

  string public name;
  string[] private tables;
  mapping(string => Table) public tablesmap;

  constructor(address initialOwner, string memory _name) Ownable(initialOwner) {
    name = _name;
  }

  function initTable (string calldata name, string calldata schema, string calldata description) external returns (uint256) {
    // call Tableland contract
    uint256 table_id = _tableland().create(
      address(this),
      SQLHelpers.toCreateFromSchema(schema, name)
    );

    // store references and metadata
    tables.push(name);
    tablesmap[name] = Table(table_id, description, schema);
    return table_id;
  }

  function fetchTables() external view returns (string[] memory) {
    return tables;
  }

  function fetchSchema (string calldata name) external view returns (Table memory) {
    return tablesmap[name];
  }

  function _tableland () public view returns (ITablelandTables) {
    return TablelandDeployments.get();
  }

  function writeData (string table, ) external returns (bool) {


  }



}
