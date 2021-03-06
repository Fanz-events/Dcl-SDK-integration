# DCL SDK Integration

Simple scene that provides a validator for Fanz tickets ready for use on your custom DCL Scenes

## Try it out

Once the Fanz event and tickets are created, initialize the `EntranceValidator` object on the `game.ts` file, sending your EventID as parameter.

For example, if the event you want to check access for has an Id of "e0x1", your `game.ts` file should look like this:

```ts
const FANZValidator = new EntranceValidator('e0x1')
```

Then, you can check access for the event calling the function `FANZValidator`. The only function parameter receives an (optional) array of strings, that specifies which Event tickets are considered valid. If this parameter is omitted, function will return `true` if the Player on the scene has any ticket for the event.

```ts
if( FANZValidator.checkAccess()) {
   log("Player has one valid ticket for the event!")
}

if( FANZValidator.checkAccess(["VIP", "Super VIP"])) {
   log("Player has either a VIP or Supe VIP ticket!")
}
```