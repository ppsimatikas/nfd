import ape

def test_construct(domain, owner):
    assert owner == domain.owner()
    assert "agriculture" == domain.name()

def test_init_table(domain, tableland, owner):
    receipt1 = domain.initTable('fields', "id integer primary key, surface integer", "fields registry", sender=owner)
    receipt2 = domain.initTable("yearly_production", "id integer primary key, field_id integer, year integer, production integer", "fields production", sender=owner)

    assert tableland.ownerOf(receipt1.return_value) == domain
    assert tableland.ownerOf(receipt2.return_value) == domain

def test_fetch_tables(domain):
    assert ["fields", "yearly_production"] == domain.fetchTables()

def test_fetch_schema(domain):
    fields = domain.fetchSchema('fields')
    production = domain.fetchSchema('yearly_production')
    
    assert "fields registry" == fields.description
    assert "id integer primary key, surface integer", "fields registry" == fields.schema
    assert "fields production" == production.description
    assert "id integer primary key, field_id integer, year integer, production integer", "fields registry" == production.schema


