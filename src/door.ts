export class Door extends Entity {
  constructor(model: GLTFShape) {
    super()
    engine.addEntity(this)
    this.addComponent(model)
    this.addComponent(new Transform())

    this.addComponent(new Animator())
    this.getComponent(Animator).addClip(new AnimationState("main", { looping: false }))
    this.getComponent(Animator).addClip(new AnimationState("Open", { looping: false }))
    this.getComponent(Animator).getClip("main").play()
  }

  playDoorOpen() {
    this.getComponent(Animator).getClip("main").stop()
    this.getComponent(Animator).getClip("Open").stop()
    this.getComponent(Animator).getClip("Open").play()
    this.removeComponent(OnPointerDown)
  }
}
