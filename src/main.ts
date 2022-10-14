abstract class AbstractAddress {
    protected _street: string;
    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }
    //TODO: ajouter d'autres champs communs à tous types d'adresse
}

class FrenchAddress extends AbstractAddress {

    private _region: FrenchRegion;

    constructor(street: string, region: FrenchRegion) {
        super();
        this._street = street;
        this._region = region;
    }

    public get region(): FrenchRegion {
        return this._region;
    }

    public set region(value: FrenchRegion) {
        this._region = value;
    }

}

class USAAddress extends AbstractAddress {

    private _state: USAState;

    constructor(street: string, state: USAState) {
        super();
        this._street = street;
        this._state = state;
    }

    public get state(): USAState {
        return this._state;
    }
    public set state(value: USAState) {
        this._state = value;
    }
}

class FrenchRegion {
    //TODO: utiliser un enum pour filter les données communiquées en tant que paramètre "name"
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}

class USAState {
    //TODO: utiliser un enum pour filter les données communiquées en tant que paramètre "name"
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    public get name(): string {
        return this._name;
    }
    public set name(value: string) {
        this._name = value;
    }
}

class FrenchAddressDisplayer {

    _address: FrenchAddress;

    constructor(address: FrenchAddress) {
        this._address = address;
    }

    display(): string {
        return `Rue : ${this._address.street}\nRégion : ${this._address.region.name}\n`;
    }
}

class USAAddressDisplayer {

    _address: USAAddress;

    constructor(address: USAAddress) {
        this._address = address;
    }

    display(): string {
        return `Street : ${this._address.street}\nState : ${this._address.state.name}\n`;
    }
}

class AddressDisplayer {

    protected _address: AbstractAddress;

    constructor(address: AbstractAddress) {
        this._address = address;
    }

    display(): string {
        if (this._address instanceof FrenchAddress) {
            const displayer = new FrenchAddressDisplayer(this._address as FrenchAddress);
            return displayer.display();
        }
        if (this._address instanceof USAAddress) {
            const displayer = new USAAddressDisplayer(this._address as USAAddress);
            return displayer.display();
        }
    }
}

function main(): void {

    const grand_est = new FrenchRegion("Grand Est");
    const a_french_address = new FrenchAddress("1 place Stanislas", grand_est);

    const an_address_displayer = new AddressDisplayer(a_french_address);
    const result1: string = an_address_displayer.display();
    console.log(result1);

    const newyork = new USAState("New York");
    const an_usa_address = new USAAddress("1600, Pennsylvania Avenue NW", newyork);

    const an_other_address_displayer = new AddressDisplayer(an_usa_address);
    const result2: string = an_other_address_displayer.display();
    console.log(result2);

}

main();

export default main;