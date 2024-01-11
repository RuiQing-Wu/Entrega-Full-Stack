export class ApoyoRegistro {
    readonly id?: string;
    readonly idCausa: string;
    readonly nombre: string;
    readonly correo: string;

    constructor({
        id,
        idCausa,
        nombre,
        correo,
    }: {
        id?: string,
        idCausa: string,
        nombre: string,
        correo: string,
    }) {
        this.id = id;
        this.idCausa = idCausa;
        this.nombre = nombre;
        this.correo = correo;
    }
}