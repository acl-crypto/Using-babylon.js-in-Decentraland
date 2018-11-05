# Pay-to-open: Generic payments example

The scene is partly based on the [interactive door sample scene](https://github.com/decentraland/sample-scene-script), but it only allows you to open the door if you've paid 10 MANA first. Click on the door, sign the transaction in Metamask pop-up and wait until you see "Enter".
It uses generic payments API from Decentraland's SDK.


**Install the CLI**

Download and install the Decentraland CLI by running the following command

```bash
npm i -g decentraland
```

For a more details, follow the steps in the [Installation guide](https://docs.decentraland.org/documentation/installation-guide/).

**Clone the repo to your local drive**


  `git clone https://github.com/decentraland/sample-scene-memory-game.git`


**Previewing the scene**

_from the scene directory:_

```
$:  dcl preview
```

Any dependencies are installed and then the CLI will open the scene in a new browser tab automatically.


You can learn more about handling user inputs in our documentation: https://docs.decentraland.org



### Usage

1. Download the [Metamask chrome extension](https://metamask.io/) and create an account

2. Purchase MANA with that account.

3. Run a demo of the scene and verify that you're not allowed to open the door.

4. Make a transaction sending 10 MANA to the following wallet address: 0x9dbc8ae2586267126e5067c9958720245d8cc53f

5. Run the scene again, this time you should be able to open the door.
