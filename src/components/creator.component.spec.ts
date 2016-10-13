import CreatorComponent from './creator.component';

describe('CreatorComponent', () => {
    let sut: CreatorComponent;
    let createEmitSpy: jasmine.Spy;
    let fakeInputElement: HTMLInputElement;

    beforeEach(() => {
        sut = new CreatorComponent();
        createEmitSpy = spyOn(sut.create, 'emit');
        fakeInputElement = {} as HTMLInputElement;
    });

    it('can be created', () => {
        expect(sut).toBeDefined();
    });

    it('has empty value by default', () => {
        expect(sut.value).toBe('');
    });

    describe('create button clicked', () => {
        let doCreateSpy: jasmine.Spy;

        beforeEach(() => {
            doCreateSpy = spyOn(sut, 'doCreate');
        });

        it('prevents default event handling', () => {
            const fakeEvent = { preventDefault: jasmine.createSpy('preventDefault') } as any;
            sut.createButtonClick(fakeEvent, fakeInputElement);

            expect(fakeEvent.preventDefault).toHaveBeenCalled();
        });

        it('triggers actual doCreate', () => {
            const fakeEvent = { preventDefault: jasmine.createSpy('preventDefault') } as any;
            sut.createButtonClick(fakeEvent, fakeInputElement);

            expect(doCreateSpy).toHaveBeenCalledWith(fakeInputElement);
        });
    });

    interface KeyboardEventMock extends KeyboardEvent {
        keyCode: number;
        target: EventTarget;
    }

    describe('key pressed in input field', () => {
        let doCreateSpy: jasmine.Spy;
        let fakeEvent = { keyCode: 13 } as KeyboardEventMock;

        beforeEach(() => {
            doCreateSpy = spyOn(sut, 'doCreate');
        });

        it('triggers actual doCreate once', () => {
            sut.inputKeyDown(fakeEvent);

            expect(doCreateSpy).toHaveBeenCalledTimes(1);
        });

        it('triggers actual doCreate with current input element', () => {
            fakeEvent.target = fakeInputElement;
            sut.inputKeyDown(fakeEvent);

            expect(doCreateSpy).toHaveBeenCalledWith(fakeInputElement);
        });

        it('does nothing when pressed key is not Enter', () => {
            fakeEvent.keyCode = 42;
            sut.inputKeyDown(fakeEvent);

            expect(doCreateSpy).not.toHaveBeenCalled();
        });
    });

    describe('doCreate', () => {
        it('does not emit create event when input value is undefined/empty', () => {
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy).not.toHaveBeenCalled();
        });

        it('does not emit create event when input value is only whitespaces', () => {
            fakeInputElement.value = '   ';
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy).not.toHaveBeenCalled();
        });

        it('emits create event with the input value', () => {
            fakeInputElement.value = 'any value';
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy).toHaveBeenCalledWith('any value');
        });

        it('clears the input value after create event', () => {
            fakeInputElement.value = 'any value';
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy).toHaveBeenCalledTimes(1);
            expect(fakeInputElement.value).toBe('');
        });
    });
});
