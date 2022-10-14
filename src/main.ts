//TODO: répartir les interfaces et classes dans des fichiers distincts

//Définition d'un modèle générique (Polymorphisme + Substitution de Liskov)
abstract class AbstractAddress {

    protected _street: string;
    //TODO: ajouter d'autres champs communs à tous types d'adresse

    get street(): string {
        return this._street;
    }

    set street(value: string) {
        this._street = value;
    }
}

//Modèle de données (Single Responsibility)
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

//Modèle de données (Single Responsibility)
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

class GenericAddress extends AbstractAddress {
    constructor(street: string) {
        super();
        this._street = street;
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

//Classe comportementale (Single Responsibility)
class FrenchAddressDisplayer {

    _address: FrenchAddress;

    constructor(address: FrenchAddress) {
        this._address = address;
    }

    display(): string {
        return `Rue : ${this._address.street}\nRégion : ${this._address.region.name}\n`;
    }
}

//Classe comportementale (Single Responsibility)
class USAAddressDisplayer {

    _address: USAAddress;

    constructor(address: USAAddress) {
        this._address = address;
    }

    display(): string {
        return `Street : ${this._address.street}\nState : ${this._address.state.name}\n`;
    }
}

//+/- implémentation du Design Pattern Strategy
//délégation de l'action display à des classes spécifiques (FrenchAddressDisplayer + USAAddressDisplayer)
class AddressDisplayer {

    private _address: AbstractAddress;

    constructor(address: AbstractAddress) {
        this._address = address;
    }

    display(): string {

        //on se base sur le type concret de l'adresse communiquée
        //pour employer la classe adaptée à son affichage spécifique
        let displayer: FrenchAddressDisplayer | USAAddressDisplayer;//il pourrait être plus pertinent d'indiquer le type any

        if (this._address instanceof FrenchAddress) {
            displayer = new FrenchAddressDisplayer(this._address as FrenchAddress);
            //return displayer.display();
        }

        if (this._address instanceof USAAddress) {
            displayer = new USAAddressDisplayer(this._address as USAAddress);
            //return displayer.display();
        }

        if (displayer)
            return displayer.display();

        //si le type concret n'est pas connu
        else
            return `Street : ${this._address.street}`;//A minima on retourne le ou les champs définis par la classe AbstractAddress
    }

    get address(): AbstractAddress {
        return this._address;
    }
    set address(value: AbstractAddress) {
        this._address = value;
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

    const an_indian_address = new GenericAddress("India street");
    const a_third_address_displayer = new AddressDisplayer(an_indian_address);

    const result3: string = a_third_address_displayer.display();
    console.log(result3);

}

main();

export default main;