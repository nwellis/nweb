import { tuple } from "utils/Types";

/**
 * TOOD: Interesting thought, but doesn't seem to provide enough value to justify its complexity.
 * getById is still slow.
 */
export default class GroupMap<
  K extends string | number,
  V extends Phaser.GameObjects.GameObject
> extends Phaser.GameObjects.Group {
  private readonly keySet = new Set<K>();

  constructor(scene: Phaser.Scene) {
    super(scene);
  }

  get size() {
    return this.getLength();
  }

  set(key: K, value: V) {
    if (this.keySet.has(key)) {
      return;
    }
    this.keySet.add(key);
    this.add(value);
  }
  getById(key: K): V {
    // TODO: This would be slower since it has to search the entire group list
    // Use a key => index map?
    return this.keySet.has(key)
      ? (super.getChildren().find((child) => child.getData("id") === key) as V)
      : undefined;
  }
  has(key: K) {
    return Boolean(this.getById(key));
  }

  delete(key: K) {
    const child = this.getById(key);
    if (child) {
      this.keySet.delete(key);
      this.remove(child);
      return child;
    }
    return undefined;
  }

  keys() {
    return this.keySet.values();
  }
  entries(): Array<[K, V]> {
    return this.getChildren().map((child) =>
      tuple(child.getData("id") as K, child as V)
    );
  }
  values(): Array<V> {
    return this.getChildren() as Array<V>;
  }
}
