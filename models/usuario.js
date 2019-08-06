class Ingreso {
    constructor(email, password) {
        this.email = email;
        this.password = password;
    }
}

class Registro{
    constructor(nombre, email, password, edad, genero, programa) {
        this.nombre = nombre;
        this.email = email;
        this.password = password;
        this.edad = edad;
        this.genero = genero;
        this.programa = programa;
    }
}

class Informacion{
    constructor(nombre, email, edad, genero, programa) {
        this.nombre = nombre;
        this.email = email;
        this.edad = edad;
        this.genero = genero;
        this.programa = programa;
    }
}

module.exports = {
    Ingreso,
    Registro,
    Informacion
};