import { createInventory } from '../node_modules/decentraland-builder-scripts/inventory'
import { getValidTickets } from './ticketGraph'
import { Door } from './door'

const _scene = new Entity('_scene')
engine.addEntity(_scene)
const transform = new Transform({
  position: new Vector3(0, 0, 0),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
_scene.addComponentOrReplace(transform)

const entity = new Entity('entity')
engine.addEntity(entity)
entity.setParent(_scene)
const gltfShape = new GLTFShape("models/d32dcb91-b3a0-4d09-8044-75ac60d0ea4b/FloorFantasyRocks_02/FloorFantasyRocks_02.glb")
gltfShape.withCollisions = true
gltfShape.isPointerBlocker = true
gltfShape.visible = true
entity.addComponentOrReplace(gltfShape)
const transform2 = new Transform({
  position: new Vector3(8, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity.addComponentOrReplace(transform2)

const entity2 = new Entity('entity2')
engine.addEntity(entity2)
entity2.setParent(_scene)
entity2.addComponentOrReplace(gltfShape)
const transform3 = new Transform({
  position: new Vector3(24, 0, 8),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity2.addComponentOrReplace(transform3)

const entity3 = new Entity('entity3')
engine.addEntity(entity3)
entity3.setParent(_scene)
entity3.addComponentOrReplace(gltfShape)
const transform4 = new Transform({
  position: new Vector3(8, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity3.addComponentOrReplace(transform4)

const entity4 = new Entity('entity4')
engine.addEntity(entity4)
entity4.setParent(_scene)
entity4.addComponentOrReplace(gltfShape)
const transform5 = new Transform({
  position: new Vector3(24, 0, 24),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
entity4.addComponentOrReplace(transform5)

const door = new Door(new GLTFShape('models/ed36149f-76c5-45c4-a678-d4b31c4ed9ca/models/Door_Fantasy.glb'))

let openDoorClip = new AudioClip('models/ed36149f-76c5-45c4-a678-d4b31c4ed9ca/sounds/open.mp3')

door.setParent(_scene)
const transform6 = new Transform({
  position: new Vector3(13.75, 0, 13.75),
  rotation: new Quaternion(5.776981117192352e-15, -1, 1.1920927533992653e-7, -3.725290298461914e-8),
  scale: new Vector3(1.5, 1, 1)
})
door.addComponentOrReplace(transform6)
door.addComponent(
  new OnPointerDown(
    async () => {
      log("About to check tokens")
      let tickets = await getValidTickets()
      log("tickets: ", tickets)

      if (tickets.length > 0) {
        log("opening door...")
        
        const source = new AudioSource(openDoorClip)
        door.addComponentOrReplace(source)
        source.playing = true

        door.playDoorOpen()
      }
    },
    {
      button: ActionButton.PRIMARY,
      hoverText: "Check Access",
      showFeedback: true,
    }
  )
)

const stoneBrickThreshold = new Entity('stoneBrickThreshold')
engine.addEntity(stoneBrickThreshold)
stoneBrickThreshold.setParent(_scene)
const transform7 = new Transform({
  position: new Vector3(13.25, 5.960463411724959e-8, 14.25),
  rotation: new Quaternion(5.776981117192352e-15, -1, 1.1920927533992653e-7, -3.725290298461914e-8),
  scale: new Vector3(1, 1, 1)
})
stoneBrickThreshold.addComponentOrReplace(transform7)
const gltfShape2 = new GLTFShape("models/4e47bac9-96be-4b23-a40b-61306db54f13/Module_Stone_Straight_Door_01/Module_Stone_Straight_Door_01.glb")
gltfShape2.withCollisions = true
gltfShape2.isPointerBlocker = true
gltfShape2.visible = true
stoneBrickThreshold.addComponentOrReplace(gltfShape2)

const curvedStoneBrickWall = new Entity('curvedStoneBrickWall')
engine.addEntity(curvedStoneBrickWall)
curvedStoneBrickWall.setParent(_scene)
const transform8 = new Transform({
  position: new Vector3(21, 0, 14),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
curvedStoneBrickWall.addComponentOrReplace(transform8)
const gltfShape3 = new GLTFShape("models/0c52bf55-7b0f-4eca-9b3c-b1fbb81c7219/Module_Stone_Curve_02/Module_Stone_Curve_02.glb")
gltfShape3.withCollisions = true
gltfShape3.isPointerBlocker = true
gltfShape3.visible = true
curvedStoneBrickWall.addComponentOrReplace(gltfShape3)

const curvedStoneBrickWall2 = new Entity('curvedStoneBrickWall2')
engine.addEntity(curvedStoneBrickWall2)
curvedStoneBrickWall2.setParent(_scene)
curvedStoneBrickWall2.addComponentOrReplace(gltfShape3)
const transform9 = new Transform({
  position: new Vector3(9.5, 0, 14),
  rotation: new Quaternion(1.6997286485741746e-14, 0.7071068286895752, -8.42937097900176e-8, 0.7071068286895752),
  scale: new Vector3(1.0000007152557373, 1, 1.0000007152557373)
})
curvedStoneBrickWall2.addComponentOrReplace(transform9)

const cornerStoneBrickWall = new Entity('cornerStoneBrickWall')
engine.addEntity(cornerStoneBrickWall)
cornerStoneBrickWall.setParent(_scene)
const transform10 = new Transform({
  position: new Vector3(24.5, 0, 17.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
cornerStoneBrickWall.addComponentOrReplace(transform10)
const gltfShape4 = new GLTFShape("models/018773fa-dd9b-4924-a07c-c803fa36f9a5/Module_Stone_Curve_01/Module_Stone_Curve_01.glb")
gltfShape4.withCollisions = true
gltfShape4.isPointerBlocker = true
gltfShape4.visible = true
cornerStoneBrickWall.addComponentOrReplace(gltfShape4)

const cornerStoneBrickWall2 = new Entity('cornerStoneBrickWall2')
engine.addEntity(cornerStoneBrickWall2)
cornerStoneBrickWall2.setParent(_scene)
cornerStoneBrickWall2.addComponentOrReplace(gltfShape4)
const transform11 = new Transform({
  position: new Vector3(24.5, 0, 25.5),
  rotation: new Quaternion(1.539415254273621e-15, 0.7071067690849304, -8.429368847373553e-8, -0.7071068286895752),
  scale: new Vector3(1, 1, 1)
})
cornerStoneBrickWall2.addComponentOrReplace(transform11)

const cornerStoneBrickWall3 = new Entity('cornerStoneBrickWall3')
engine.addEntity(cornerStoneBrickWall3)
cornerStoneBrickWall3.setParent(_scene)
cornerStoneBrickWall3.addComponentOrReplace(gltfShape4)
const transform12 = new Transform({
  position: new Vector3(6, 9.536742595628311e-7, 25.5),
  rotation: new Quaternion(6.25432272296925e-15, 1, -1.1920928244535389e-7, 0),
  scale: new Vector3(1, 1, 1)
})
cornerStoneBrickWall3.addComponentOrReplace(transform12)

const cornerStoneBrickWall4 = new Entity('cornerStoneBrickWall4')
engine.addEntity(cornerStoneBrickWall4)
cornerStoneBrickWall4.setParent(_scene)
cornerStoneBrickWall4.addComponentOrReplace(gltfShape4)
const transform13 = new Transform({
  position: new Vector3(6, 0, 17.5),
  rotation: new Quaternion(-4.422474214095529e-15, -0.7071068286895752, 8.429370268459024e-8, -0.7071067690849304),
  scale: new Vector3(1, 1, 1)
})
cornerStoneBrickWall4.addComponentOrReplace(transform13)

const stoneBrickWindowWithStainedGlass = new Entity('stoneBrickWindowWithStainedGlass')
engine.addEntity(stoneBrickWindowWithStainedGlass)
stoneBrickWindowWithStainedGlass.setParent(_scene)
const transform14 = new Transform({
  position: new Vector3(16.5, 0, 25.5),
  rotation: new Quaternion(4.4694049215711004e-15, 1, -1.1920928244535389e-7, 1.4901161193847656e-8),
  scale: new Vector3(1, 1, 1)
})
stoneBrickWindowWithStainedGlass.addComponentOrReplace(transform14)
const gltfShape5 = new GLTFShape("models/63b1ed7a-fd00-41f0-9eab-71e17873b491/Module_Stone_Straight_Window_02/Module_Stone_Straight_Window_02.glb")
gltfShape5.withCollisions = true
gltfShape5.isPointerBlocker = true
gltfShape5.visible = true
stoneBrickWindowWithStainedGlass.addComponentOrReplace(gltfShape5)

const stoneBrickWindowWithStainedGlass2 = new Entity('stoneBrickWindowWithStainedGlass2')
engine.addEntity(stoneBrickWindowWithStainedGlass2)
stoneBrickWindowWithStainedGlass2.setParent(_scene)
stoneBrickWindowWithStainedGlass2.addComponentOrReplace(gltfShape5)
const transform15 = new Transform({
  position: new Vector3(10, 0, 25.5),
  rotation: new Quaternion(4.4694049215711004e-15, 1, -1.1920928244535389e-7, 1.4901161193847656e-8),
  scale: new Vector3(1, 1, 1)
})
stoneBrickWindowWithStainedGlass2.addComponentOrReplace(transform15)

const stoneBrickWall = new Entity('stoneBrickWall')
engine.addEntity(stoneBrickWall)
stoneBrickWall.setParent(_scene)
const transform16 = new Transform({
  position: new Vector3(17.5, 0, 25),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
stoneBrickWall.addComponentOrReplace(transform16)
const gltfShape6 = new GLTFShape("models/5ed9c4c0-8a9c-4c0d-814c-d40354987f2b/Module_Stone_Straight_01/Module_Stone_Straight_01.glb")
gltfShape6.withCollisions = true
gltfShape6.isPointerBlocker = true
gltfShape6.visible = true
stoneBrickWall.addComponentOrReplace(gltfShape6)

const towerRoof = new Entity('towerRoof')
engine.addEntity(towerRoof)
towerRoof.setParent(_scene)
const transform17 = new Transform({
  position: new Vector3(21.5, 3, 21.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
towerRoof.addComponentOrReplace(transform17)
const gltfShape7 = new GLTFShape("models/a9ab14c9-e73c-4f07-bcb5-51b32dbdd301/Roof_01/Roof_01.glb")
gltfShape7.withCollisions = true
gltfShape7.isPointerBlocker = true
gltfShape7.visible = true
towerRoof.addComponentOrReplace(gltfShape7)

const towerRoof2 = new Entity('towerRoof2')
engine.addEntity(towerRoof2)
towerRoof2.setParent(_scene)
towerRoof2.addComponentOrReplace(gltfShape7)
const transform18 = new Transform({
  position: new Vector3(9, 3, 21.5),
  rotation: new Quaternion(0, 0, 0, 1),
  scale: new Vector3(1, 1, 1)
})
towerRoof2.addComponentOrReplace(transform18)

const roofDarkGreyEdges = new Entity('roofDarkGreyEdges')
engine.addEntity(roofDarkGreyEdges)
roofDarkGreyEdges.setParent(_scene)
const transform19 = new Transform({
  position: new Vector3(10.5, 0, 13.5),
  rotation: new Quaternion(-5.837277581059123e-15, -1, 1.1920928244535389e-7, 0),
  scale: new Vector3(2.25, 1, 0.9999997615814209)
})
roofDarkGreyEdges.addComponentOrReplace(transform19)
const gltfShape8 = new GLTFShape("models/353123f5-0500-48c9-9feb-ba22c813e8ff/DarkGreyRoof_3Edges.glb")
gltfShape8.withCollisions = true
gltfShape8.isPointerBlocker = true
gltfShape8.visible = true
roofDarkGreyEdges.addComponentOrReplace(gltfShape8)

const roofDarkGreyEdges2 = new Entity('roofDarkGreyEdges2')
engine.addEntity(roofDarkGreyEdges2)
roofDarkGreyEdges2.setParent(_scene)
const transform20 = new Transform({
  position: new Vector3(10, 0, 26),
  rotation: new Quaternion(-8.859596698343518e-16, 0.7071068286895752, -8.429368136830817e-8, -0.7071068286895752),
  scale: new Vector3(2.8125016689300537, 1, 2.5000011920928955)
})
roofDarkGreyEdges2.addComponentOrReplace(transform20)
const gltfShape9 = new GLTFShape("models/9bde74ae-a437-4c91-b705-aef45eaf5f42/DarkGreyRoof_4Edges.glb")
gltfShape9.withCollisions = true
gltfShape9.isPointerBlocker = true
gltfShape9.visible = true
roofDarkGreyEdges2.addComponentOrReplace(gltfShape9)

const channelId = Math.random().toString(16).slice(2)
const channelBus = new MessageBus()
const inventory = createInventory(UICanvas, UIContainerStack, UIImage)
const options = { inventory }
