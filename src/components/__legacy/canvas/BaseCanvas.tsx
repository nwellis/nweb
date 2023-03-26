import Phaser from "phaser";
import * as React from "react";
import clsx from "clsx";

export type BaseCanvasProps = {
  id: string;
  hide?: boolean;
  isDebug?: boolean;
  config: Phaser.Types.Core.GameConfig;
  onCleanup?: () => void;
} & React.HTMLAttributes<HTMLDivElement>;

/**
 * Wraps a Phaser canvas element and it's scene. It's important to note that we never want
 * this component to re-render its WebGL canvas, SO THIS COMPONENT WILL NEVER UPDATE. The
 * initial props will be persisted indefinitely. The once exception to this rule is the
 * hide property.
 */
class BaseCanvas<P, S> extends React.Component<P & BaseCanvasProps, S> {
  private game?: Phaser.Game;
  private parent: React.RefObject<HTMLDivElement>;

  private withLogMeta = (msg: string) => `${this.props.id}-game: ${msg}`;

  constructor(props: P & BaseCanvasProps) {
    super(props);
    this.parent = React.createRef();
  }

  render() {
    const {
      config,
      hide = false,
      onCleanup,
      onResize,
      isDebug,
      // The rest are what we want to put on this div
      id,
      className,
      ...divProps
    } = this.props;

    return (
      <div
        id={this.props.id}
        ref={this.parent}
        className={clsx(className, hide ? "invisible" : "visible")}
        {...divProps}
      />
    );
  }

  shouldComponentUpdate(nextProps: P & BaseCanvasProps, nextState: S) {
    return nextProps.hide !== this.props.hide;
  }

  componentDidUpdate() {
    if (this.props.isDebug) {
      console.warn(this.withLogMeta("Game component was updated!"));
    }
  }

  componentDidMount() {
    if (this.props.isDebug) {
      console.debug(
        this.withLogMeta("Creating new game instance"),
        this.parent
      );
    }

    const config = this.props.config;
    this.game = new Phaser.Game({
      ...config,
      antialias: true,
      antialiasGL: true, // OFF for iOS?
      parent: this.parent.current,
      banner: import.meta.env.DEV,
    });
  }

  componentWillUnmount() {
    this.props.onCleanup?.();
    this.game.destroy(true);
    this.game = undefined;
  }

  componentDidCatch(error: Error) {
    console.error(this.withLogMeta("Encountered an error!"), error);
  }
}

export default BaseCanvas;
