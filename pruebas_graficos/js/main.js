//////////////////////////////////////////////////////////////
/////////////////////////////CANVAS///////////////////////////
//////////////////////////////////////////////////////////////
var canvas_circular1 = document.getElementById("circular1");
var boton1 = document.getElementById("boton1");
var canvas_anillo1 = document.getElementById("anillo1");
var boton2 = document.getElementById("boton2");
var canvas_barras2 = document.getElementById("barras2");
var boton3 = document.getElementById("boton3");
var canvas_bastones1 = document.getElementById("bastones1");
var boton4 = document.getElementById("boton4");
var canvas_circular2 = document.getElementById("circular2");
var boton5 = document.getElementById("boton5");
var canvas_anillo2 = document.getElementById("anillo2");
var boton6 = document.getElementById("boton6");
var canvas_barras1 = document.getElementById("barras1");
var boton7 = document.getElementById("boton7");
var canvas_bastones2 = document.getElementById("bastones2");
var boton8 = document.getElementById("boton8");
/////////////////////////////////////////////////////////////////
//////////////////////////CIRCULAR1//////////////////////////////
/////////////////////////////////////////////////////////////////
var circular1 = new Circular(canvas_circular1, "Materiales de construccion", {
  roca: 8.13,
  arena: 3.75,
  tejas: 10.0,
  cemento: 3.13,
  grava: 7.5,
  piedra: 25.62,
  cal: 7.5,
  agua: 2.5,
  madera: 3.13,
  acero: 2.5,
  ceramica: 4.37,
  cemento_cola: 6.88,
  clavos: 1.25,
  lozetas: 8.13,
  ladrillos: 5.63
});
circular1.graficar();
canvas_circular1.addEventListener("mousemove", function () {
  circular1.animacion(event);
});
boton1.addEventListener("click", function () {
  circular1.descargar();
});
console.log(circular1);
/////////////////////////////////////////////////////////////////
////////////////////////ANILLO1//////////////////////////////////
/////////////////////////////////////////////////////////////////
var anillo1 = new Anillo(canvas_anillo1, "Materiales de construccion", {
  roca: 8.13,
  arena: 3.75,
  tejas: 10.0,
  cemento: 3.13,
  grava: 7.5,
  piedra: 25.62,
  cal: 7.5,
  agua: 2.5,
  madera: 3.13,
  acero: 2.5,
  ceramica: 4.37,
  cemento_cola: 6.88,
  clavos: 1.25,
  lozetas: 8.13,
  ladrillos: 5.63
});
anillo1.graficar();
canvas_anillo1.addEventListener("mousemove", function () {
  anillo1.animacion(event);
});
boton2.addEventListener("click", function () {
  anillo1.descargar();
});
console.log(anillo1);
////////////////////////////////////////////////////////////////
////////////////////////////BARRAS1//////////////////////////////
////////////////////////////////////////////////////////////////
var barras1 = new Barras(canvas_barras1, "Materiales de construccion", {
  roca: 13,
  arena: 6,
  tejas: 16,
  cemento: 5,
  grava: 12,
  piedra: 41,
  cal: 12,
  agua: 4,
  madera: 5,
  acero: 4,
  ceramica: 7,
  cemento_cola: 11,
  clavos: 2,
  lozetas: 13,
  ladrillos: 9
});
barras1.graficar();
canvas_barras1.addEventListener("mousemove", function () {
  barras1.animacion(event);
});
boton3.addEventListener("click", function () {
  barras1.descargar();
});
console.log(barras1);
////////////////////////////////////////////////////////////////
////////////////////////////BASTONES1///////////////////////////
////////////////////////////////////////////////////////////////
var bastones1 = new Bastones(canvas_bastones1, "Materiales de construccion", {
  roca: 13,
  arena: 6,
  tejas: 16,
  cemento: 5,
  grava: 12,
  piedra: 41,
  cal: 12,
  agua: 4,
  madera: 5,
  acero: 4,
  ceramica: 7,
  cemento_cola: 11,
  clavos: 2,
  lozetas: 13,
  ladrillos: 9
});
bastones1.graficar();
canvas_bastones1.addEventListener("mousemove", function () {
  bastones1.animacion(event);
});
boton4.addEventListener("click", function () {
  bastones1.descargar();
});
console.log(bastones1);
/////////////////////////////////////////////////////////////////
//////////////////////////CIRCULAR2//////////////////////////////
/////////////////////////////////////////////////////////////////
var circular2 = new Circular(canvas_circular2, "Número de hijos por familia", {
  0: 4.76,
  1: 28.57,
  2: 23.81,
  3: 14.29,
  4: 14.29,
  5: 9.52,
  6: 4.76
});
circular2.graficar();
canvas_circular2.addEventListener("mousemove", function () {
  circular2.animacion(event);
});
boton5.addEventListener("click", function () {
  circular2.descargar();
});
console.log(circular2);
/////////////////////////////////////////////////////////////////
////////////////////////ANILLO2//////////////////////////////////
/////////////////////////////////////////////////////////////////
var anillo2 = new Anillo(canvas_anillo2, "Número de hijos por familia", {
  0: 4.76,
  1: 28.57,
  2: 23.81,
  3: 14.29,
  4: 14.29,
  5: 9.52,
  6: 4.76
});
anillo2.graficar();
canvas_anillo2.addEventListener("mousemove", function () {
  anillo2.animacion(event);
});
boton6.addEventListener("click", function () {
  anillo2.descargar();
});
console.log(anillo2);
////////////////////////////////////////////////////////////////
////////////////////////////BARRAS2//////////////////////////////
////////////////////////////////////////////////////////////////
var barras2 = new Barras(canvas_barras2, "Número de hijos por familia", {
  0: 1,
  1: 1,
  2: 9,
  3: 2,
  4: 1,
  5: 0,
  6: 7
});
barras2.graficar();
canvas_barras2.addEventListener("mousemove", function () {
  barras2.animacion(event);
});
boton7.addEventListener("click", function () {
  barras2.descargar();
});
console.log(barras2);
////////////////////////////////////////////////////////////////
////////////////////////////BASTONES2///////////////////////////
////////////////////////////////////////////////////////////////
var bastones2 = new Bastones(canvas_bastones2, "Número de hijos por familia", {
  0: 1,
  1: 1,
  2: 9,
  3: 2,
  4: 1,
  5: 0,
  6: 7
});
bastones2.graficar();
canvas_bastones2.addEventListener("mousemove", function () {
  bastones2.animacion(event);
});
boton8.addEventListener("click", function () {
  bastones2.descargar();
});
console.log(bastones2);
