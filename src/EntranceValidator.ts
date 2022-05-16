import * as EthereumController from "@decentraland/EthereumController"


export class EntranceValidator {
    fanzEventId: string;

    graphUrl: string = "https://api.thegraph.com/subgraphs/name/fanz-events/fanz-events-matic"
    userAddress: string = ""

    getGraphReqBody = ( owner: string, eventId: string ) => {
        return {
            query: "{ balances( where: {type: Ticket, owner: \"" + owner+ "\", event: \"" + eventId + "\"}) {\n    ticket {\n      name\n    }\n  }\n}\n"
        }
    }
  
    constructor(
        fanzEventId: string
    ) {
      this.fanzEventId = fanzEventId;
    }
  
    public async checkAccess(validTickets: string[]): Promise<boolean> {
      this.userAddress = await EthereumController.getUserAccount()

      let response = await fetch(this.graphUrl, {
        headers: { "Content-Type": "application/json" },
        method: "POST",
        body: JSON.stringify(this.getGraphReqBody(this.userAddress, this.fanzEventId)),
      })

      let json = await response.json()

      let ticketsFound = []
      if( json.data && json.data.balances ) {
        ticketsFound = json.data.balances.map((tb: any) => tb.ticket.name);
      }

      if( ticketsFound.length == 0 ){
        return false;
      } else {
        if(!validTickets || validTickets.length == 0 ) {
            // if there is any ticket found access is granted.
            return true;
        } 
        else {
            // Only grant access if address has one of the valid tickets.
            return ticketsFound.some((ticket: any)  => validTickets.indexOf(ticket) >= 0)
        }
      }
      
    }
  }