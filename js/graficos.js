class Grafico {
  constructor(canvas, titulo, datos) {
    this.canvas = canvas; //mi canvas HTML5
    this.ctx = canvas.getContext("2d");
    this.w = this.canvas.width;
    this.h = this.canvas.height;
    this.datos = datos; // en notacion JSON
    this.colores = [
      "rgba(184,0,12,0.8)",
      "rgba(0,61,194,0.8)",
      "rgba(255,99,51,0.8)",
      "rgba(0,173,40,0.8)",
      "rgba(114,54,62,0.8)",
      "rgba(72,153,234,0.8)",
      "rgba(197,84,217,0.8)",
      "rgba(173,115,82,0.8)",
      "rgba(163,246,255,0.8)",
      "rgba(255,51,122,0.8)",
      "rgba(118,255,3,0.8)",
      "rgba(224,171,11,0.8)",
      "rgba(61,35,113,0.8)",
      "rgba(255,255,61,0.8)",
      "rgba(95,105,15,0.8)"
    ];
    this.coloresAnimacion = [
      "rgba(184,0,12)",
      "rgba(0,61,194)",
      "rgba(255,99,51)",
      "rgba(0,173,40)",
      "rgba(114,54,62)",
      "rgba(72,153,234)",
      "rgba(197,84,217)",
      "rgba(173,115,82)",
      "rgba(163,246,255)",
      "rgba(255,51,122)",
      "rgba(118,255,3)",
      "rgba(224,171,11)",
      "rgba(61,35,113,1)",
      "rgba(255,255,61)",
      "rgba(95,105,15)"
    ];
    this.tipo = "Grafico";
    this.alto;
    this.ancho;
    this.cX;
    this.cY;
    this.colorFondo;
    this.titulo = {
      texto: titulo,
      fuente: "",
      color: ""
    };
    this.estiloEtiqueta = {
      fuente: "",
      color: ""
    };
    this.estiloLeyenda = {
      posFondoX: 0,
      posFondoY: 0,
      colorFondo: "",
      fuente: "",
      color: ""
    };
    this.estiloAnimacion = {
      colorLinea: "",
      gruesoLinea: 0
    };
  }

  grafGuiaX(y, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(0, y);
    this.ctx.lineWidth = 1;
    this.ctx.lineTo(this.w, y);
    this.ctx.strokeStyle = color;
    this.ctx.closePath();
    this.ctx.stroke();
  }

  grafGuiaY(x, color) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, 0);
    this.ctx.lineWidth = 1;
    this.ctx.lineTo(x, this.h);
    this.ctx.strokeStyle = color;
    this.ctx.closePath();
    this.ctx.stroke();
  }

  graficarGuias() {
    for (var i = 0.05 * this.w; i < this.w; i += 0.05 * this.w) {
      this.grafGuiaY(i, "blue");
      console.log("w: " + i);
    }
    for (var i = 0.05 * this.h; i < this.h; i += 0.05 * this.h) {
      this.grafGuiaX(i, "red");
      console.log("h: " + i);
    }
  }

  grafFondo() {
    this.ctx.fillStyle = this.colorFondo;
    this.ctx.fillRect(0, 0, this.w, this.h);
    this.ctx.strokeStyle = "black";
    this.ctx.lineWidth = 1;
    this.ctx.strokeRect(0, 0, this.w, this.h);
  }

  grafTitulo() {
    this.ctx.font = this.titulo.fuente;
    this.ctx.fillStyle = this.titulo.color;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(this.titulo.texto, this.cX, this.h * 0.05, this.w * 0.9);
  }

  limpiarLienzo() {
    this.ctx.clearRect(0, 0, this.w, this.h);
  }

  tooltip(indice, data, pos) {
    if (indice != null) {
      this.canvas.setAttribute("title", data[indice][pos]);
    } else {
      this.canvas.setAttribute("title", "");
    }
  }

  descargar() {
    var URLImg = this.canvas.toDataURL("image/jpg", 1.0);
    var link = document.createElement("a");
    document.body.appendChild(link);
    link.setAttribute("download", this.titulo.texto + "-" + this.tipo + ".jpg");
    link.href = URLImg;
    link.click();
  }
}

class CircularAnillos extends Grafico {
  constructor(canvas, titulo, datos) {
    super(canvas, titulo, datos);
    this.anguloI = this.anguloInicial();
    this.infoPor = this.infoPorciones();
    this.posCuadLey = this.posCuadroLeyenda();
    this.alto = this.w * 0.7;
    this.ancho = this.w * 0.7;
    this.radio = this.ancho / 2;
    this.cX = this.w * 0.5;
    this.cY = this.h * 0.43;
    this.radioInterno;
    this.colorFondo = "rgba(255, 255, 255)";
    this.titulo = {
      texto: titulo,
      fuente: this.h * 0.045 + "px Arial Black",
      color: "#212121"
    };
    this.estiloEtiqueta = {
      fuente: this.w * 0.025 + "px sans-serif",
      color: "#212121"
    };
    this.estiloLeyenda = {
      posFondoX: this.w * 0.05,
      posFondoY: this.h * 0.78,
      colorFondo: "rgba(240, 240, 240)",
      fuente: this.h * 0.02 + "px verdana",
      color: "black"
    };
    this.estiloAnimacion = {
      colorLinea: "rgba(255,255,255,1)",
      gruesoLinea: 3
    };
  }

  anguloInicial() {
    return this.gradARad(Math.floor(Math.random() * (350 - 10) + 10));
  }

  infoPorciones() {
    var anguloI = this.anguloI;
    var arrayAux = [];
    for (const indiceAsoc in this.datos) {
      var angulo = this.porcAGrad(this.datos[indiceAsoc]);
      var anguloF = this.gradARad(angulo);
      anguloF = anguloI + anguloF;
      arrayAux.push([anguloI, anguloF, this.datos[indiceAsoc], indiceAsoc]);
      anguloI = anguloF;
    }
    return arrayAux;
  }

  posCuadroLeyenda() {
    var i = 0;
    var arrayAux = [];
    for (const indiceAsoc in this.datos) {
      if ((i + 3) % 3 == 0) {
        var _x = this.w * 0.07;
        var m = i * this.h * 0.01;
      } else if ((i + 2) % 3 == 0) {
        var _x = this.w * 0.37;
        var m = (i - 1) * this.h * 0.01;
      } else if ((i + 1) % 3 == 0) {
        var _x = this.w * 0.67;
        var m = (i - 2) * this.h * 0.01;
      }
      var _y = this.h * 0.8 + m;
      arrayAux.push([_x, _y]);
      i++;
    }
    return arrayAux;
  }

  radAGrad(angulo) {
    return (angulo * 180) / Math.PI;
  }

  gradARad(angulo) {
    return (angulo * Math.PI) / 180;
  }

  porcAGrad(porcentaje) {
    return porcentaje * 3.6;
  }

  etiqueta(anguloI, anguloF, etiqueta, fuente, color) {
    this.etiqueta;
    var _x =
      (this.radio / this.factor) * Math.cos(anguloI + (anguloF - anguloI) / 2);
    var _y =
      (this.radio / this.factor) * Math.sin(anguloI + (anguloF - anguloI) / 2);
    this.ctx.font = fuente || this.estiloEtiqueta.fuente;
    this.ctx.fillStyle = color || this.estiloEtiqueta.color;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(parseFloat(etiqueta) + "%", this.cX + _x, this.cY + _y);
  }

  leyenda(_x, _y, color, leyenda, fuente, colorFuente) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(_x, _y, this.w * 0.02, this.h * 0.02);
    this.ctx.font = fuente || this.estiloLeyenda.fuente;
    this.ctx.fillStyle = colorFuente || this.estiloLeyenda.color;
    this.ctx.textAlign = "start";
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(
      leyenda,
      _x + this.w * 0.03,
      _y + this.h * 0.02,
      this.w * 0.23
    );
  }

  grafPorcion() {
    for (var i = 0; i < this.infoPor.length; i++) {
      this.porcion(
        this.infoPor[i][0],
        this.infoPor[i][1],
        this.colores[i],
        "rgba(250,250,250,1)",
        2
      );
    }
  }

  grafEtiqueta() {
    for (var i = 0; i < this.infoPor.length; i++) {
      this.etiqueta(
        this.infoPor[i][0],
        this.infoPor[i][1],
        this.infoPor[i][2].toFixed(2),
        null,
        null
      );
    }
  }

  grafFondoLeyenda() {
    this.ctx.fillStyle = this.estiloLeyenda.colorFondo;
    this.ctx.fillRect(
      this.estiloLeyenda.posFondoX,
      this.estiloLeyenda.posFondoY,
      this.w * 0.9,
      this.h * 0.18
    );
  }

  grafLeyenda() {
    for (var i = 0; i < this.posCuadLey.length; i++) {
      if (i == 0) this.grafFondoLeyenda();
      this.leyenda(
        this.posCuadLey[i][0],
        this.posCuadLey[i][1],
        this.colores[i],
        this.infoPor[i][3],
        null,
        null
      );
    }
  }

  graficar() {
    this.limpiarLienzo();
    this.grafFondo();
    this.grafTitulo();
    this.grafPorcion();
    this.grafEtiqueta();
    this.grafFondoLeyenda();
    this.posCuadroLeyenda();
    this.grafLeyenda();
  }

  // // // // //Animacion
  corregirAngulo(angulo) {
    if (angulo > 2 * Math.PI) {
      angulo = angulo - 2 * Math.PI;
    }
    return angulo;
  }

  corregirAngulosPorciones() {
    var arrayAux = [];
    for (var i = 0; i < this.infoPor.length; i++) {
      arrayAux.push([
        this.corregirAngulo(this.infoPor[i][0]),
        this.corregirAngulo(this.infoPor[i][1])
      ]);
    }
    return arrayAux;
  }

  anguloRadioCliente(evento) {
    var _x = evento.offsetX - this.cX;
    var _y = evento.offsetY - this.cY;
    var radio = Math.sqrt(Math.pow(_x, 2) + Math.pow(_y, 2));
    if (_x > 0 && _y >= 0) var angulo = Math.atan(_y / _x);
    if (_x == 0 && _y > 0) var angulo = Math.PI / 2;
    if (_x < 0) var angulo = Math.atan(_y / _x) + Math.PI;
    if (_x == 0 && _y < 0) var angulo = (3 * Math.PI) / 2;
    if (_x > 0 && _y < 0) var angulo = Math.atan(_y / _x) + 2 * Math.PI;
    return [angulo, radio];
  }

  posAngulosPorcionAnimacion(angulo) {
    var arrayAux = this.corregirAngulosPorciones();
    for (var i = 0; i < this.infoPor.length; i++) {
      if (
        (arrayAux[i][1] >= arrayAux[i][0] &&
          angulo >= arrayAux[i][0] &&
          angulo <= arrayAux[i][1]) ||
        (arrayAux[i][1] < arrayAux[i][0] &&
          ((angulo >= arrayAux[i][0] && angulo <= 2 * Math.PI) ||
            (angulo >= 0 && angulo <= arrayAux[i][1])))
      ) {
        return i;
      }
    }
  }

  animacionCuadroLeyenda(indice) {
    this.ctx.fillStyle = this.colorFondo;
    this.ctx.fillRect(
      this.posCuadLey[indice][0],
      this.posCuadLey[indice][1],
      this.w * 0.25,
      this.h * 0.028
    );
    this.ctx.fillStyle = this.estiloLeyenda.colorFondo;
    this.ctx.fillRect(
      this.posCuadLey[indice][0],
      this.posCuadLey[indice][1],
      this.w * 0.25,
      this.h * 0.028
    );
    this.ctx.fillStyle = this.coloresAnimacion[indice];
    this.ctx.fillRect(
      this.posCuadLey[indice][0] - this.w * 0.004,
      this.posCuadLey[indice][1] - this.h * 0.004,
      this.w * 0.028,
      this.h * 0.028
    );
    this.lineWidth = 1;
  }

  animacion(evento) {
    var anguloRadio = this.anguloRadioCliente(evento),
      angulo = anguloRadio[0],
      radio = anguloRadio[1],
      indice = this.posAngulosPorcionAnimacion(angulo);
    this.graficar();
    this.tooltip(null, null, null);
    if (radio <= this.radio && radio >= this.radioInterno) {
      if (this.infoPor[indice][0] != undefined)
        this.porcion(
          this.infoPor[indice][0],
          this.infoPor[indice][1],
          this.coloresAnimacion[indice],
          "rgba(250,250,250,1)",
          3
        );
      this.etiqueta(
        this.infoPor[indice][0],
        this.infoPor[indice][1],
        this.infoPor[indice][2].toFixed(2),
        this.w * 0.035 + "px sans-serif",
        "#2b2b2b"
      );
      this.tooltip(indice, this.infoPor, 3);
      this.animacionCuadroLeyenda(indice);
      this.leyenda(
        this.posCuadLey[indice][0],
        this.posCuadLey[indice][1],
        this.coloresAnimacion[indice],
        this.infoPor[indice][3],
        this.w * 0.03 + "px sans-serif",
        "#2b2b2b"
      );
    }
  }
}

class Circular extends CircularAnillos {
  constructor(canvas, titulo, datos) {
    super(canvas, titulo, datos);
    this.tipo = "Circular";
    this.radioInterno = 0;
    this.factor = 1.5;
  }

  porcion(anguloI, anguloF, color, colorLinea, anchoLinea) {
    var _x = this.radio * Math.cos(anguloI);
    var _y = this.radio * Math.sin(anguloI);
    this.ctx.beginPath();
    this.ctx.strokeStyle = colorLinea;
    this.ctx.lineWidth = anchoLinea;
    this.ctx.moveTo(this.cX, this.cY);
    this.ctx.lineTo(this.cX + _x, this.cY + _y);
    this.ctx.arc(this.cX, this.cY, this.radio, anguloI, anguloF, false);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}

class Anillo extends CircularAnillos {
  constructor(canvas, titulo, datos) {
    super(canvas, titulo, datos);
    this.tipo = "Anillo";
    this.radioInterno = this.ancho / 4;
    this.factor = 1.3;
  }

  porcion(anguloI, anguloF, color, colorLinea, anchoLinea) {
    var _x1 = this.radioInterno * Math.cos(anguloI);
    var _y1 = this.radioInterno * Math.sin(anguloI);
    var _x2 = this.radio * Math.cos(anguloI);
    var _y2 = this.radio * Math.sin(anguloI);
    var _x4 = this.radioInterno * Math.cos(anguloF);
    var _y4 = this.radioInterno * Math.sin(anguloF);
    this.ctx.beginPath();
    this.ctx.strokeStyle = colorLinea;
    this.ctx.lineWidth = anchoLinea;
    this.ctx.moveTo(this.cX + _x1, this.cY + _y1);
    this.ctx.lineTo(this.cX + _x2, this.cY + _y2);
    this.ctx.arc(this.cX, this.cY, this.radio, anguloI, anguloF, false);
    this.ctx.lineTo(this.cX + _x4, this.cY + _y4);
    this.ctx.arc(this.cX, this.cY, this.radioInterno, anguloF, anguloI, true);
    this.ctx.closePath();
    this.ctx.stroke();
    this.ctx.fillStyle = color;
    this.ctx.fill();
  }
}

class Barras extends Grafico {
  constructor(canvas, titulo, datos) {
    super(canvas, titulo, datos);
    this.info = this.infoBarras();
    this.dMayor = this.datoMayor();
    this.dMenor = this.datoMenor();
    this.proporcion = 100 / 80;
    this.lSuperior = this.limiteSuperior();
    this.uPrincipal = this.unidadPrincipal();
    this.nDivisionesX = this.numeroDivisionesX() - 1;
    this.nDivisionesY = this.info.length;
    this.posEjesX = this.posicionEjesX();
    this.posEjesY = this.posicionEjesY();
    this.uPixel = -Math.round(0.8 * this.h) / this.lSuperior;
    this.posAnimacion = this.posicionesAnimacion();
    this.alto = this.w * 0.7;
    this.ancho = this.w * 0.7;
    this.cX = this.w * 0.5;
    this.cY = this.h * 0.43;
    this.colorFondo = "rgba(255,255,255)";
    this.tipo = "Barras";
    this.titulo = {
      texto: titulo,
      fuente: this.h * 0.045 + "px Arial Black",
      color: " #212121"
    };
    this.estiloEtiqueta = {
      fuente: this.h * 0.03 + "px sans-serif",
      color: "#212121"
    };
    this.estiloLeyenda = {
      fuente: this.h * 0.03 + "px verdana",
      color: "black"
    };
    this.estiloAnimacion = {
      colorLinea: "rgba(255,255,255,1)",
      gruesoLinea: 3
    };
  }

  infoBarras() {
    var arrayAux = [];
    var i = 0;
    for (const indiceAsoc in this.datos) {
      arrayAux.push([i, indiceAsoc, this.datos[indiceAsoc]]);
    }
    return arrayAux;
  }

  datoMayor() {
    var m = this.info[0][2];
    for (var i = 1; i < this.info.length; i++) {
      if (this.info[i][2] > m) {
        m = this.info[i][2];
      }
    }
    return m;
  }

  datoMenor() {
    var m = this.info[0][2];
    for (var i = 1; i < this.info.length; i++) {
      if (this.info[i][2] < m) {
        m = this.info[i][2];
      }
    }
    return m;
  }

  limiteSuperior() {
    var ls = this.dMayor * this.proporcion;
    var aux = ls;
    var exp = 0;
    while (aux > 9) {
      aux = aux / 10;
      exp++;
    }
    var auxls =
      (Math.ceil(aux) * Math.pow(10, exp) +
        Math.floor(aux) * Math.pow(10, exp)) /
      2;
    if (auxls <= this.dMayor) {
      auxls += 0.2 * auxls;
    }
    if (auxls - this.dMayor >= 0.4 * auxls) {
      auxls -= 0.2 * auxls;
    }
    if (auxls < 10 && this.dMenor >= 1 && this.dMayor >= 1) {
      if (this.dMayor >= 5) {
        auxls = 10;
      } else {
        auxls = 5;
      }
    }
    auxls = auxls % Math.round(auxls) != 0 ? Math.ceil(auxls) : auxls;
    return auxls;
  }

  unidadPrincipal() {
    var up = this.lSuperior;
    if (this.dMayor >= 1) {
      for (var i = 5; i <= 10; i++) {
        if (up % i == 0) {
          var c = up / i;
          break;
        } else {
          var c = 1;
        }
      }
    } else {
      return [up / 10, 2];
    }
    return [c, 0];
  }

  numeroDivisionesX() {
    var n = 0;
    var acumulador = 0;
    while (acumulador <= this.lSuperior) {
      acumulador += this.uPrincipal[0];
      n++;
    }
    return n;
  }

  posicionEjesX() {
    var arrayAux = [];
    for (
      var y = Math.round(0.1 * this.h) + 0.5;
      y <= Math.round(0.95 * this.h);
      y += Math.round(0.8 * this.h) / this.nDivisionesX
    ) {
      arrayAux.push(Math.round(y) + 0.5);
    }
    return arrayAux;
  }

  posicionEjesY() {
    var arrayAux = [];
    for (
      var x = Math.round(0.07 * this.w) + 0.5, i = 0;
      i <= this.nDivisionesY;
      x += Math.round((0.92 * this.w) / this.nDivisionesY), i++
    ) {
      arrayAux.push(x);
    }
    return arrayAux;
  }

  ejeX(x1, x2, y, color, gruesoLinea) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y);
    this.ctx.lineWidth = gruesoLinea;
    this.ctx.lineTo(x2, y);
    this.ctx.strokeStyle = color;
    this.ctx.closePath();
    this.ctx.stroke();
  }

  ejeY(x, y1, y2, color, gruesoLinea) {
    this.ctx.beginPath();
    this.ctx.moveTo(x, y1);
    this.ctx.lineWidth = gruesoLinea;
    this.ctx.lineTo(x, y2);
    this.ctx.strokeStyle = color;
    this.ctx.closePath();
    this.ctx.stroke();
  }

  grafEjeCoordenado() {
    this.ejeX(
      0.06 * this.w,
      this.w,
      this.posEjesX[this.posEjesX.length - 1] + 1,
      "black)",
      2
    );
    this.ejeY(
      0.07 * this.w,
      this.posEjesX[0],
      this.posEjesX[this.posEjesX.length - 1] + 0.01 * this.w,
      "black)",
      2
    );
  }

  grafEjesX() {
    for (var i = 0; i < this.posEjesX.length; i++) {
      this.ejeX(
        0.06 * this.w,
        this.w,
        this.posEjesX[i],
        "rgba(71,71,71,0.4)",
        1
      );
    }
  }

  grafEjesY() {
    for (var i = 0; i < this.posEjesY.length; i++) {
      this.ejeY(
        this.posEjesY[i],
        this.posEjesX[0],
        this.posEjesX[this.posEjesX.length - 1] - 0.5,
        "rgba(71,71,71,0.4)",
        1
      );
    }
  }

  barra(x, y, ancho, alto, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, ancho, alto);
  }

  grafBarras() {
    for (var i = 0; i < this.info.length; i++) {
      var x = this.posEjesY[i] + 0.1 * (this.posEjesY[1] - this.posEjesY[0]);
      var y = this.posEjesX[this.posEjesX.length - 1];
      var alto = this.info[i][2] * this.uPixel;
      var ancho = (this.posEjesY[1] - this.posEjesY[0]) * 0.8;
      this.barra(x, y, ancho, alto, this.colores[i]);
    }
  }

  etiqueta(x, y, etiqueta, fuente, color) {
    this.ctx.font = fuente || this.estiloEtiqueta.fuente;
    this.ctx.fillStyle = color || this.estiloEtiqueta.color;
    this.ctx.textAlign = "end";
    this.ctx.textBaseline = "middle";
    this.ctx.fillText(etiqueta, x, y, 0.05 * this.w);
  }

  grafEtiqueta() {
    for (
      var textoEtiq = 0.0, i = this.posEjesX.length - 1;
      i >= 0;
      textoEtiq += this.uPrincipal[0], i--
    ) {
      this.etiqueta(
        0.055 * this.w,
        this.posEjesX[i],
        textoEtiq.toFixed(this.uPrincipal[1]),
        null,
        null
      );
    }
  }

  leyenda(leyenda, x, y, tamMaximo, fuente, colorFuente) {
    this.ctx.font = fuente || this.estiloLeyenda.fuente;
    this.ctx.fillStyle = colorFuente || this.estiloLeyenda.color;
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "bottom";
    if (parseFloat(leyenda) || parseInt(leyenda + 1)) {
      this.ctx.fillText(leyenda, x, y, tamMaximo);
    } else {
      this.ctx.translate(x, y);
      this.ctx.rotate((-45 * Math.PI) / 180);
      this.ctx.fillText(leyenda, 0, 0, tamMaximo);
      this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    }
  }

  grafLeyenda() {
    var _x = (this.posEjesY[1] - this.posEjesY[0]) / 2;
    for (var i = 0; i < this.info.length; i++) {
      this.leyenda(
        this.info[i][1],
        this.posEjesY[i] + _x,
        0.95 * this.h,
        2 * _x
      );
    }
  }

  etiquetaDato(texto, x, y, tamMaximo, fuente, colorFuente, alineacion) {
    this.ctx.font = fuente || this.estiloLeyenda.fuente;
    this.ctx.fillStyle = colorFuente || this.estiloLeyenda.color;
    this.ctx.textAlign = alineacion || "center";
    this.ctx.textBaseline = "bottom";
    this.ctx.fillText(texto, x, y, tamMaximo);
  }

  grafEtiquetaDato() {
    var _x = (this.posEjesY[1] - this.posEjesY[0]) / 2;
    for (var i = 0; i < this.info.length; i++) {
      var alto = this.info[i][2] * this.uPixel;
      var y = 0.9 * this.h + alto;
      this.etiquetaDato(
        this.info[i][2],
        this.posEjesY[i] + _x,
        y,
        2 * _x,
        null,
        this.colores[i]
      );
    }
  }

  posicionesAnimacion() {
    var fac = 0.1 * (this.posEjesY[1] - this.posEjesY[0]);
    var arrayAux = [];
    for (var i = 0; i < this.posEjesY.length - 1; i++) {
      var alto = this.info[i][2] * this.uPixel;
      arrayAux.push([
        this.posEjesY[i] + fac,
        this.posEjesY[i + 1] - fac,
        0.9 * this.h + alto + 0.5,
        Math.round(0.9 * this.h) + 1
      ]);
    }
    return arrayAux;
  }

  posicionAnimado(x, y) {
    for (var i = 0; i < this.posAnimacion.length; i++) {
      if (
        x >= this.posAnimacion[i][0] &&
        x <= this.posAnimacion[i][1] &&
        y >= this.posAnimacion[i][2] &&
        y <= this.posAnimacion[i][3]
      ) {
        return i;
      }
    }
    return -1;
  }

  animacion(evento) {
    var x = evento.offsetX;
    var y = evento.offsetY;
    var i = this.posicionAnimado(x, y);
    this.tooltip(null, null, null);
    this.graficar();
    if (i != -1) {
      this.barra(
        this.posAnimacion[i][0],
        this.posAnimacion[i][2],
        this.posAnimacion[i][1] - this.posAnimacion[i][0],
        this.posAnimacion[i][3] - this.posAnimacion[i][2],
        this.coloresAnimacion[i]
      );
      this.etiquetaDato(
        this.info[i][2],
        (this.posAnimacion[i][1] + this.posAnimacion[i][0]) / 2,
        this.posAnimacion[i][2],
        this.posAnimacion[i][1] - this.posAnimacion[i][0],
        this.h * 0.03 + "px verdana",
        this.coloresAnimacion[i]
      );
      this.tooltip(i, this.info, 1);
    }
  }

  graficar() {
    this.limpiarLienzo();
    this.grafFondo();
    this.grafTitulo();
    this.grafEjesX();
    this.grafEjesY();
    this.grafBarras();
    this.grafEjeCoordenado();
    this.grafLeyenda();
    this.grafEtiqueta();
    this.grafEtiquetaDato();
    this.posicionesAnimacion();
    this.posicionAnimado();
  }
}

class Bastones extends Barras {
  constructor(canvas, titulo, datos) {
    super(canvas, titulo, datos);
    this.info = this.infoBarras();
    this.dMayor = this.datoMayor();
    this.dMenor = this.datoMenor();
    this.proporcion = 100 / 80;
    this.lSuperior = this.limiteSuperior();
    this.uPrincipal = this.unidadPrincipal();
    this.nDivisionesX = this.numeroDivisionesX() - 1;
    this.nDivisionesY = this.info.length;
    this.posEjesX = this.posicionEjesX();
    this.posEjesY = this.posicionEjesY();
    this.uPixel = -Math.round(0.8 * this.h) / this.lSuperior;
    this.posAnimacion = this.posicionesAnimacion();
    this.alto = this.w * 0.7;
    this.ancho = this.w * 0.7;
    this.cX = this.w * 0.5;
    this.cY = this.h * 0.43;
    this.tipo = "Bastones";
    this.colorFondo = "rgba(73,54,54,0)";
    this.titulo = {
      texto: titulo,
      fuente: this.h * 0.045 + "px Arial Black",
      color: "#212121"
    };
    this.estiloEtiqueta = {
      fuente: this.h * 0.03 + "px sans-serif",
      color: "#212121"
    };
    this.estiloLeyenda = {
      fuente: this.h * 0.03 + "px verdana",
      color: "black"
    };
    this.estiloAnimacion = {
      colorLinea: "rgba(255,255,255,1)",
      gruesoLinea: 3
    };
  }

  grafLeyenda() {
    var _x = (this.posEjesY[1] - this.posEjesY[0]) / 2;
    for (var i = 0; i < this.info.length; i++) {
      this.leyenda(this.info[i][1], this.posEjesY[i], 0.95 * this.h, 2 * _x);
    }
  }

  baston(x, y1, y2, color, anchoLinea) {
    this.ctx.beginPath();
    this.ctx.strokeStyle = color;
    this.ctx.lineWidth = anchoLinea;
    this.ctx.moveTo(x, y1);
    this.ctx.lineTo(x, y2);
    this.ctx.closePath();
    this.ctx.stroke();
  }

  grafBastones() {
    for (var i = 0; i < this.info.length; i++) {
      var x = this.posEjesY[i];
      var y1 = this.posEjesX[this.posEjesX.length - 1];
      var y2 = y1 + this.info[i][2] * this.uPixel;
      this.baston(x, y1, y2, this.colores[i], 5);
    }
  }

  grafEtiquetaDato() {
    var _x = (this.posEjesY[1] - this.posEjesY[0]) / 2;
    for (var i = 0; i < this.info.length; i++) {
      var alto = this.info[i][2] * this.uPixel;
      var y = 0.9 * this.h + alto;
      this.etiquetaDato(
        this.info[i][2],
        this.posEjesY[i],
        y,
        2 * _x,
        null,
        this.colores[i],
        "start"
      );
    }
  }

  posicionesAnimacion() {
    var arrayAux = [];
    for (var i = 0; i < this.posEjesY.length - 1; i++) {
      var alto = this.info[i][2] * this.uPixel;
      arrayAux.push([
        this.posEjesY[i] - 3,
        this.posEjesY[i] + 3,
        0.9 * this.h + alto + 0.5,
        Math.round(0.9 * this.h) + 1
      ]);
    }
    return arrayAux;
  }

  animacion(evento) {
    var x = evento.offsetX;
    var y = evento.offsetY;
    var i = this.posicionAnimado(x, y);
    this.tooltip(null, null, null);
    this.graficar();
    if (i != -1) {
      this.baston(
        this.posEjesY[i],
        this.posAnimacion[i][3],
        this.posAnimacion[i][2],
        this.coloresAnimacion[i],
        6
      );
      this.etiquetaDato(
        this.info[i][2],
        (this.posAnimacion[i][1] + this.posAnimacion[i][0]) / 2,
        this.posAnimacion[i][2],
        (this.posEjesY[1] - this.posEjesY[0]) / 2,
        this.h * 0.03 + "px verdana",
        this.coloresAnimacion[i],
        "start"
      );
      this.tooltip(i, this.info, 1);
    }
  }

  graficar() {
    this.limpiarLienzo();
    this.grafFondo();
    this.grafTitulo();
    this.grafEjesX();
    this.grafEjesY();
    this.grafEjeCoordenado();
    this.grafBastones();
    this.grafLeyenda();
    this.grafEtiqueta();
    this.grafEtiquetaDato();
  }
}
