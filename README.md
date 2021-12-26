# dcl-integration-scene
Simple Decentraland scene that shows integration with Fanszoid's event tickets by querying the thegraph.com [Subgraph](https://github.com/Fanszoid/fanszoid-graph).


## Description

Checks whether the user owns a valid ticket for a Fanszoid event, in order to grant access to the event itself ( by opening the door to the building ).

The scene was originally created with Decentraland's [builder](https://builder.decentraland.org/), then integration with the subgraph was added, based on examples from  [this repository](https://github.com/decentraland-scenes/)

## Integration

Currently, the test subgraph on the Mumbai network is being used:  https://thegraph.com/hosted-service/subgraph/fanszoid/fanszoid-tickets-mumbai (Qmet5aan4BBBVMANTmgwWiQrkXQK9Yir7SLuZEwxqqgv6X)

The relevant code for the subgraph integration is located at <kbd>/src/ticketGraph.ts</kbd>, the <kbd>eventId</kbd> within this file can be modified to specify a different event.

**Queries**

When the player tries to access the building, two different queries are executed. The first one fetches the different tickets the event supports:

```typescript
{
    ticketTypes(where:{event:$eventId}) {
        id
    }
}
```

Then, the valid tickets that the user owns for this event are fetched:

```typescript
{
    tickets(where:{owner:$owner, ticketType_in: $ticketTypes}) {
        id
        amount
    }
}
```

If this query returns any valid tickets, then the access is granted.

## Try it out

**Install the CLI**
Download and install the Decentraland CLI by running the following command:

```
$ npm i -g decentraland
```

**Try the scene**

Download this repository and run:

```
$  dcl start --web3
```

The scene will start on a new browser tab ( make sure you have a wallet in your browser like Metamask to test the scene correctly).