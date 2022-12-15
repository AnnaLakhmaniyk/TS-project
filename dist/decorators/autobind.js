export function autobind(target, metodName, descriptor) {
    const originalMetod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFn = originalMetod.bind(this);
            return boundFn;
        },
    };
    return adjDescriptor;
}
//# sourceMappingURL=autobind.js.map