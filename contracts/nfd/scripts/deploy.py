from ape import accounts, project
from ape.cli import ConnectedProviderCommand
import click

@click.command(cls=ConnectedProviderCommand)
def cli():
    account = accounts.load("tableland-local")

    # Assume your project has a contract named 'MyContract' with constructor that accepts argument '123'.
    contract = project.Domain.deploy(account, "agriculture", sender=account, publish=True)
    project.deployments.track(contract)
