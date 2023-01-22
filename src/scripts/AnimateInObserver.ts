// TODO: find a good way to share this client-side
export default class AnimateInObserver {
  constructor(
    readonly AnimateInStartClassName = "opacity-0 blur-sm -translate-x-full",
    readonly AnimateInEndClassName = "opacity-100 blur-none translate-x-0",
    readonly TransitionClassName = "transition-all duration-700"
  ) {}

  init(onElements: Element[]) {
    const AnimateInStartClasses = this.AnimateInStartClassName.split(" ").map(
      (cls) => `motion-safe:${cls}`
    );

    const AnimateInEndClasses = this.AnimateInEndClassName.split(" ").map(
      (cls) => `motion-safe:${cls}`
    );

    const observer = new IntersectionObserver((entries) =>
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add(...AnimateInEndClasses);
          entry.target.classList.remove(...AnimateInStartClasses);
        } else {
          entry.target.classList.add(...AnimateInStartClasses);
          entry.target.classList.remove(...AnimateInEndClasses);
        }
      })
    );

    onElements.forEach((element) => {
      element.classList.add(
        ...AnimateInStartClasses,
        ...this.TransitionClassName.split(" ")
      );
      observer.observe(element);
    });
  }
}
