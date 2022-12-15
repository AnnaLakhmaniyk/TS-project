//autobind decorator

export function autobind(
  target: any,
  metodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMetod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMetod.bind(this);
      return boundFn;
    },
  };

  return adjDescriptor;
}
