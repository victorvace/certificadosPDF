class alumno {

let id;
let nombre;
let curso;

  function alumno(id, nombre, curso) {
    this.id = id;
    this.nombre = nombre;
    this.curso = curso;
  }

  function getId(){
    return this.id;
  }
  function setId(id){
    this.id = id;
  }
  function getNombre(){
    return this.nombre;
  }
  function getNombre(nombre){
    this.nombre = nombre;
  }
  function getCurso(){
    return this.curso;
  }
  function setCurso(curso){
    this.curso = curso;
  }
}
