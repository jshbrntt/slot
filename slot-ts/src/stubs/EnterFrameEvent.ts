export class EnterFrameEvent extends Event {
    static ROOT_CREATED = 'ROOT_CREATED';
    constructor(
        type: string,
        eventInitDict?: EventInit,
        public passedTime: number = 0
    ) {
        super(type, eventInitDict);
    }
}
