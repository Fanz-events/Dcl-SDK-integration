import { getUserData, UserData } from '@decentraland/Identity'
import { getCurrentRealm, Realm } from '@decentraland/EnvironmentAPI'
import * as EthereumController from '@decentraland/EthereumController'
import * as ui from '@dcl/ui-scene-utils'

export let ethController = EthereumController

export let subgraphQueriesUrl = 'https://api.thegraph.com/subgraphs/name/fanszoid/fanszoid-tickets-mumbai'

export let eventId = "0x3"

export let userData: UserData
export let playerRealm: Realm

export async function fetchUserData() {
  const data = await getUserData()
  log("userData fetched for user: ", data.displayName)
  return data
}

export async function setUserData() {
  const data = await getUserData()
  log("userData set for user: ", data.displayName)
  userData = data
}

// fetch the player's realm
export async function setRealm() {
  let realm = await getCurrentRealm()
  log(`You are in the realm: ${JSON.stringify(realm.displayName)}`)
  playerRealm = realm
}

export async function getValidTickets(){
  if (!userData) {
    await setUserData()
  }

  if (!playerRealm) {
    await setRealm()
  }

  if (userData.hasConnectedWeb3) {
    let ticketTypes = await getTicketTypes()

    if(ticketTypes.length > 0 ){
        let userTickets = await getUserTickets(ticketTypes)

        if(userTickets.length > 0 ){
           return userTickets;
        } else {
            let p = new ui.OkPrompt(
                "No valid tickets found, try buying some at fanszoid.com!",
                () => {
                    p.close()
                },
                'Ok',
                true
            )
        }
    } else {
        let p = new ui.OkPrompt(
            "This event has no tickets!",
            () => {
                p.close()
            },
            'Ok',
            true
        )
    }

  } else {
    let p = new ui.OkPrompt(
      'You need an in-browser Ethereum wallet (eg: Metamask) to access the event.',
      () => {
        p.close()
      },
      'Ok',
      true
    )
  }

  return []
}

export async function getTicketTypes() {
  if (!userData) {
    await setUserData()
  }
  if (!playerRealm) {
    await setRealm()
  }

  try {
    let response = await fetchGraph({
        operationName: "ticketTypes",
        variables: {
            eventId: eventId,
        },
        query: `query Tickets($eventId: String) {\nticketTypes(where:{event:$eventId}) {\n    id\n  }\n}`,
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.data) {
            return r.data;
          } else {
            return r;
          }
        });
    
    if( !response.ticketTypes || response.ticketTypes.length === 0) {
        log("No ticketTypes found.")

        return []
    }

    let data = response.ticketTypes.map(tt => tt.id)
    log("TicketTypes: ", data)

    return data
  } catch {
    log('error fetching ticketTypes for event.')
  }
}

export async function getUserTickets(ticketTypes: Array<string>) {
    if (!userData) {
      await setUserData()
    }
    if (!playerRealm) {
      await setRealm()
    }
  
    try {
      let response = await fetchGraph({
          operationName: "userTickets",
          variables: {
            owner: userData.publicKey,
            ticketTypes: ticketTypes
          },
          query: `query UserTickets($owner: String, $ticketTypes: [String]) {\n  tickets(where:{owner:$owner, ticketType_in: $ticketTypes}) {\n    id\n    amount\n  }\n}`,
        })
          .then((r) => r.json())
          .then((r) => {
            if (r.data) {
              return r.data;
            } else {
              return r;
            }
          });
      
      if( !response.tickets || response.tickets.length === 0 ) {
          log("No valid user tickets found.")

          return []
      }


      let data = response.tickets.filter(tt => tt.amount && tt.amount > 0)
      if( data.length === 0) {
        log("No remaining user tickets found.")

        return []
      }

      log("tickets: ", data)
      return data
    } catch {
      log('error fetching ticketTypes for event.')
    }
  }


async function fetchGraph(request: Object) {
    return fetch(subgraphQueriesUrl, {
      method: "POST",
      body: JSON.stringify(request),
    });
  }