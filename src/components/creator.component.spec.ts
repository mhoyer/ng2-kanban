import CreatorComponent from './creator.component';

describe('CreatorComponent', () => {
    let sut: CreatorComponent;
    let createEmitSpy: Sinon.SinonSpy;
    let fakeInputElement: HTMLInputElement;

    beforeEach(() => {
        sut = new CreatorComponent();
        createEmitSpy = sinon.spy(sut.create, 'emit');
        fakeInputElement = {} as HTMLInputElement;
    });

    it('can be created', () => {
        expect(sut).toBeDefined();
    });

    it('has empty value by default', () => {
        expect(sut.value).toBe('');
    });

    describe('create button clicked', () => {
        let doCreateSpy: Sinon.SinonSpy;

        beforeEach(() => {
            doCreateSpy = sinon.spy(sut, 'doCreate');
        });

        it('prevents default event handling', () => {
            const fakeEvent = { preventDefault: sinon.spy() } as any;
            sut.createButtonClick(fakeEvent, fakeInputElement);

            expect(fakeEvent.preventDefault.called).toBeTruthy();
        });

        it('triggers actual doCreate', () => {
            const fakeEvent = { preventDefault: sinon.spy() } as any;
            sut.createButtonClick(fakeEvent, fakeInputElement);

            expect(doCreateSpy.calledWith(fakeInputElement)).toBeTruthy();
        });
    });

    describe('key pressed in input field', () => {
        let doCreateSpy: Sinon.SinonSpy;
        let fakeEvent = { keyCode: 13 } as KeyboardEvent;

        beforeEach(() => {
            doCreateSpy = sinon.stub(sut, 'doCreate');
        });

        it('triggers actual doCreate once', () => {
            sut.inputKeyDown(fakeEvent);

            expect(doCreateSpy.calledOnce).toBeTruthy();
        });

        it('triggers actual doCreate with current input element', () => {
            fakeEvent.target = fakeInputElement;
            sut.inputKeyDown(fakeEvent);

            expect(doCreateSpy.calledWith(fakeInputElement)).toBeTruthy();
        });

        it('does nothing when pressed key is not Enter', () => {
            fakeEvent.keyCode = 42;
            sut.inputKeyDown(fakeEvent);

            expect(doCreateSpy.called).toBeFalsy();
        });
    });

    describe('doCreate', () => {
        it('does not emit create event when input value is undefined/empty', () => {
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy.called).toBeFalsy();
        });

        it('does not emit create event when input value is only whitespaces', () => {
            fakeInputElement.value = '   ';
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy.called).toBeFalsy();
        });

        it('emits create event with the input value', () => {
            fakeInputElement.value = 'any value';
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy.calledWith('any value')).toBeTruthy();
        });

        it('clears the input value after create event', () => {
            fakeInputElement.value = 'any value';
            sut.doCreate(fakeInputElement);

            expect(createEmitSpy.called).toBeTruthy();
            expect(fakeInputElement.value).toBe('');
        });
    });
});
