function aceptar1() {
  var $input = $("#nomb-var"),
    $div_sec = $("#sec-nomb-var"),
    $div_sec_sig = $("#sec-cant-val-obs");
  destruir_popover($input);
  if ($input.val() == "") {
    mostrar_popover(
      $input,
      "<div class='mensaje alerta'>¡Llene este campo primero!</div>"
    );
    $input.focus();
  } else {
    cambiar_estado_aceptar($div_sec, $div_sec_sig);
  }
}

function ayuda(btn) {
  $(btn).popover();
}

function cancelar1() {
  var $input = $("#nomb-var"),
    $div_sec = $("#sec-nomb-var"),
    $div_sec_sig = $("#sec-cant-val-obs");
  // $input.val( "" );
  cambiar_estado_cancelar($div_sec, $div_sec_sig);
}

function aceptar2() {
  var cantidad = 0,
    $input = $("#cantidad"),
    $div_sec = $("#sec-cant-val-obs"),
    $div_sec_sig = $("#sec-val-dif-obs"),
    input_val = $input.val();
  destruir_popover($input);
  if (input_val == "") {
    mostrar_popover(
      $input,
      "<div class='mensaje alerta'>¡Llene este campo primero!</div>"
    );
    $input.focus();
  } else {
    if (
      isNaN(input_val) ||
      parseInt(input_val) <= 0 ||
      input_val != parseInt(input_val)
    ) {
      mostrar_popover(
        $input,
        "<div class='mensaje aviso'>¡El valor debe ser un número entero positivo!</div>"
      );
    } else {
      cantidad = parseInt(input_val);
      $("#cancelar1").attr("disabled", true);
      cambiar_estado_aceptar($div_sec, $div_sec_sig);
      setTimeout(function () {
        posicionamiento($div_sec_sig);
      }, 200);
    }
  }
  return cantidad;
}

function destruir_popovers_val_dif_obs() {
  destruir_popover($("#valor-obs-num"));
  destruir_popover($("#valor-obs-lit"));
  destruir_popover($("#aceptar3"));
}

function cancelar2() {
  var $input = $("#cantidad"),
    $div_sec = $("#sec-cant-val-obs"),
    $div_sec_sig = $("#sec-val-dif-obs");
  // $input.val( "" );
  $div_sec_sig.find(".seleccionado").removeClass("seleccionado");
  destruir_popovers_val_dif_obs();
  $("#cancelar1").attr("disabled", false);
  cambiar_estado_cancelar($div_sec, $div_sec_sig);
}

function cambiar_estado_aceptar($div_padre, $div_padre_sig) {
  $div_padre.find("input, .btn").each(function (index, elem) {
    let $elem = $(elem);
    $elem.attr("disabled", true);
    if ($elem.val() == "Cancelar" && $elem[0].type == "button")
      $elem.attr("disabled", false);
  });
  $div_padre_sig
    .removeClass("desactivado")
    .find("input, .btn")
    .each(function (index, elem) {
      let $elem = $(elem);
      if ($elem.val() != "Cancelar") $elem.attr("disabled", false);
      if ($elem[0].type == "text") $elem.focus();
    });
}

function cambiar_estado_cancelar($div_padre, $div_padre_sig) {
  $div_padre.find("input, .btn").each(function (index, elem) {
    let $elem = $(elem);
    $elem.attr("disabled", false);
    if ($elem.val() == "Cancelar" && $elem[0].type == "button")
      $elem.attr("disabled", true);
  });
  $div_padre_sig
    .addClass("desactivado")
    .find("input, .btn")
    .each(function (index, elem) {
      let $elem = $(elem);
      $elem.attr("disabled", true);
      if ($elem[0].type == "text") $elem.val("");
    });
}

function posicionamiento($div) {
  $(window).scrollTop($div[0].offsetTop);
}

function aceptar3(btn, cant_val) {
  var $btn = $(btn),
    $input = $("#valor-obs-num"),
    $div_sec = $("#sec-val-dif-obs"),
    cant_val_selec = $div_sec.find(".seleccionado").length,
    $div_sec_sig = $("#conteo");
  destruir_popover($input);
  destruir_popover($btn);
  $input.val("");
  if (cant_val_selec != cant_val) {
    mostrar_popover(
      $btn,
      "<div class='mensaje alerta'>¡Debe seleccionar: " +
        (cant_val - cant_val_selec) +
        " valor (es) todavia!</div>"
    );
  } else {
    setTimeout(function () {
      posicionamiento($div_sec_sig);
    }, 200);
    cambiar_estado_aceptar($div_sec, $div_sec_sig);
    $("#cancelar2").attr("disabled", true);
    var es_numerico = $("#colapsado-uno").hasClass("show");
    conteo(es_numerico);
    $(".mas").click(function () {
      mas(this);
      total_conteo();
    });
    $(".menos").click(function () {
      menos(this);
      total_conteo();
    });
    $(".valor-conteo").on("change blur", function () {
      total_conteo();
    });
  }
}

function cancelar3() {
  var $div_sec = $("#sec-val-dif-obs"),
    $div_sec_sig = $("#conteo");
  $("#cancelar2").attr("disabled", false);
  $("#div-conteo").empty();
  cambiar_estado_cancelar($div_sec, $div_sec_sig);
  setTimeout(function () {
    posicionamiento($div_sec);
  }, 200);
}

function mostrar_popover($elem, mensaje) {
  $elem
    .popover({
      html: true,
      content: mensaje,
      trigger: "manual",
      placement: "top"
    })
    .popover("show");
}

function destruir_popover($elem) {
  $elem.popover("dispose");
}

function marcar_seleccionado(btn, cant_val_diferentes, id_div_btns) {
  var $btn = $(btn),
    $div_btns = $("#" + id_div_btns),
    cont_val_selec = $div_btns.find(".seleccionado").length;
  if (!$btn.hasClass("seleccionado")) {
    if (cont_val_selec < cant_val_diferentes) {
      $btn.addClass("seleccionado");
    }
  } else {
    $btn.removeClass("seleccionado");
  }
}

function existe_valor_numerico(valor) {
  var valores_btns = [],
    $btns = $("#valores-observados-numericos").find(".btn-valor-num");
  $btns.each(function (id, elem) {
    $elem = $(elem);
    valores_btns.push(parseInt($elem.val()));
  });
  for (var i = 0; i < valores_btns.length; i++) {
    if (valores_btns[i] == valor) {
      return true;
    }
  }
  return false;
}

function existe_valor_literal(valor) {
  var valores_btns = [],
    $btns = $("#valores-observados-literales").find(".btn-valor-lit");
  $btns.each(function (id, elem) {
    $elem = $(elem);
    valores_btns.push($elem.val().toUpperCase());
  });
  for (var i = 0; i < valores_btns.length; i++) {
    if (valores_btns[i] == valor.toUpperCase()) {
      return true;
    }
  }
  return false;
}

function agregar_val_num(cant_val_diferentes) {
  var $input = $("#valor-obs-num"),
    valor = $input.val(),
    $div_val_observados = $("#valores-observados-numericos"),
    $div_valores = $div_val_observados.find("#valores-numericos");
  destruir_popover($input);
  if (valor == "") {
    mostrar_popover(
      $input,
      "<div class='mensaje alerta'>¡Llene este campo primero!</div>"
    );
  } else {
    if (isNaN(valor)) {
      mostrar_popover(
        $input,
        "<div class='mensaje aviso'>¡El valor debe ser un número!</div>"
      );
    } else {
      if (existe_valor_numerico(valor)) {
        mostrar_popover(
          $input,
          "<div class='mensaje importante'>¡El valor ya existe!</div>"
        );
      } else {
        $input.val("");
        $input.focus();
        boton =
          `<div class='col-4 col-xsm-3 col-sm-2'>
                  <input type='button' class='btn-valor-num btn btn-outline-primary' onclick='marcar_seleccionado(this, ` +
          cant_val_diferentes +
          `, \`valores-observados-numericos\`);' value='` +
          valor +
          `'>
                </div>`;
        $div_valores.append(boton);
      }
    }
  }
}

function mayuscula_primera_letra(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function agregar_val_lit(cant_val_diferentes) {
  var $input = $("#valor-obs-lit"),
    valor = $input.val(),
    $div_val_observados = $("#valores-observados-literales"),
    $div_valores = $div_val_observados.find("#valores-literales");
  destruir_popover($input);
  if (valor == "") {
    mostrar_popover(
      $input,
      "<div class='mensaje alerta'>¡Llene este campo primero!</div>"
    );
  } else {
    if (existe_valor_literal(valor)) {
      mostrar_popover(
        $input,
        "<div class='mensaje importante'>¡El valor ya existe!</div>"
      );
    } else {
      $input.val("");
      $input.focus();
      boton =
        `<div class='div-literal col-6 col-md-4 col-xxl-3'>
                  <input type='button' class='btn-valor-lit btn btn-outline-primary' onclick='marcar_seleccionado(this, ` +
        cant_val_diferentes +
        `, \`valores-observados-literales\`);' value='` +
        mayuscula_primera_letra(valor) +
        `'>
                </div>`;
      $div_valores.append(boton);
    }
  }
}

function array_val_seleccionados() {
  var $btn_val_selec = $(".seleccionado"),
    val_selec = [];
  $btn_val_selec.each(function (id, elem) {
    let $elem = $(elem);
    val_selec.push($elem.val());
  });
  return val_selec;
}

function conteo(es_numerico) {
  var val_seleccionados = array_val_seleccionados(),
    $div = $("#div-conteo"),
    n = val_seleccionados.length,
    total_conteo =
      `<div class='col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 offset-md-0 contenedor-contador'>
                        <input type='button' id='total_conteo' class='btn valor-contado' value='Total'>
                        <input type='text' id='total' readonly='true' value='` +
      0 +
      `'>
                      </div>`;
  $div.empty();
  if (es_numerico) {
    for (let i = 0; i < n; i++) {
      let contador =
        `<div class='col-10 offset-1 col-xsm-6 offset-xsm-0 col-sm-4 offset-sm-0 col-md-3 offset-md-0 col-xl-4 offset-xl-0 col-xxl-3 offset-xxl-0 contenedor-contador'>
                        <input type='button' class='btn valor-contado' value='` +
        val_seleccionados[i] +
        `'>
                        <input type='number' min='0' class='valor-conteo' value='0'>
                        <div class='masmenos'>
                          <input type='button' class='btn contador mas' value='+'>
                          <input type='button' class='btn contador menos' value='-'>
                        </div>
                      </div>`;
      $div.append(contador);
    }
  } else {
    for (let i = 0; i < n; i++) {
      let contador =
        `<div class='col-10 offset-1 col-sm-6 offset-sm-0 col-md-4 offset-md-0 contenedor-contador'>
                        <input type='button' class='btn valor-contado lit' value='` +
        val_seleccionados[i] +
        `'>
                        <input type='number' min='0' class='valor-conteo' value='0'>
                        <div class='masmenos'>
                          <input type='button' class='btn contador mas' value='+'>
                          <input type='button' class='btn contador menos' value='-'>
                        </div>
                      </div>`;
      $div.append(contador);
    }
  }
  $div.append(total_conteo);
}

function mas(boton) {
  var $btn = $(boton),
    $input = $btn.parent().parent().find(".valor-conteo");
  if ($input.val() == "") $input.val("0");
  var valor = parseInt($input.val());
  destruir_popover($input);
  $input.val(valor + 1);
}

function menos(boton) {
  var $btn = $(boton),
    $input = $btn.parent().parent().find(".valor-conteo");
  if ($input.val() == "") $input.val("0");
  var valor = parseInt($input.val());
  if (valor > 0) $input.val(valor - 1);
}

function total_conteo() {
  var $total = $("#total"),
    $inputs = $(".valor-conteo"),
    total = 0;
  $inputs.each(function (index, elem) {
    let $elem = $(elem);
    total += parseInt($elem.val());
  });
  $total.val(total);
}

function aceptar4(val_seleccionados, val_contados) {
  var $div_sec = $("#conteo"),
    $div_sec_sig = $("#tabla-frec");
  // $inp_val_conteo = $( ".valor-conteo" ),
  // bandera = true;
  // $inp_val_conteo.each(function(index, elem) {
  //   let $elem = $( elem );
  //   destruir_popover( $elem );
  //   if( parseInt( $elem.val() ) == 0 ) {
  //     mostrar_popover( $elem,  "<div class='mensaje importante'>¡El valor de conteo debe ser por lo menos 1!</div>" );
  //     bandera = false;
  //     return false;
  //   }
  // });
  // if( bandera ) {
  $div_sec.prev().find("#cancelar3").attr("disabled", true);
  cambiar_estado_aceptar($div_sec, $div_sec_sig);
  dibujar_tabla(val_seleccionados, val_contados);
  setTimeout(function () {
    posicionamiento($div_sec_sig);
  }, 200);
  // }
}

function cancelar4(btn) {
  var $btn = $(btn),
    $div_seccion = $btn.parents(".seccion"),
    $div_seccion_sig = $("#tabla-frec");
  $div_seccion.prev().find("#cancelar3").attr("disabled", false);
  $div_seccion_sig.find("#div-tabla").empty();
  cambiar_estado_cancelar($div_seccion, $div_seccion_sig);
}

function aceptar5(btn) {
  var $btn = $(btn),
    $div_seccion = $btn.parents(".seccion"),
    $div_seccion_sig = $("#graficos"),
    $div_seccion_sig_ = $("#medidas-tendencia-central");
  $div_seccion.prev().find("#cancelar4").attr("disabled", true);
  cambiar_estado_aceptar($div_seccion, $div_seccion_sig);
  cambiar_estado_aceptar($div_seccion, $div_seccion_sig_);
  setTimeout(function () {
    posicionamiento($div_seccion_sig);
  }, 200);
}

function cancelar5(btn) {
  var $btn = $(btn),
    $div_seccion = $btn.parents(".seccion"),
    $div_seccion_sig = $("#graficos"),
    $div_seccion_sig_ = $("#medidas-tendencia-central"),
    $media = $("#media"),
    $mediana = $("#mediana"),
    $moda = $("#moda");
  $div_seccion.prev().find("#cancelar4").attr("disabled", false);
  $div_seccion_sig.find("#div-grafico1").empty();
  $div_seccion_sig.find("#div-grafico2").empty();
  $media.text("");
  $mediana.text("");
  $moda.text("");
  cambiar_estado_cancelar($div_seccion, $div_seccion_sig);
  cambiar_estado_cancelar($div_seccion, $div_seccion_sig_);
}

function array_conteo_val_seleccionados() {
  var $inputs_val_conteo = $(".valor-conteo"),
    val_contados = [];
  $inputs_val_conteo.each(function (id, elem) {
    let $elem = $(elem);
    val_contados.push(parseInt($elem.val()));
  });
  return val_contados;
}

function total(array_valores) {
  var total = 0;
  for (let i = 0; i < array_valores.length; i++) {
    total += array_valores[i];
  }
  return total;
}

function relativa(array_val_absolutos) {
  var array_val_relativos = [],
    total_absolutos = total(array_val_absolutos);
  for (let i = 0; i < array_val_absolutos.length; i++) {
    array_val_relativos.push(array_val_absolutos[i] / total_absolutos);
  }
  return array_val_relativos;
}

function acumulada(array_valores) {
  var array_val_acumulados = [],
    acumulador = 0;
  for (let i = 0; i < array_valores.length; i++) {
    acumulador += array_valores[i];
    array_val_acumulados.push(acumulador);
  }
  return array_val_acumulados;
}

function desacumulada(array_valores, total) {
  var array_val_desacumulados = [],
    desacumulador = total;
  for (let i = 0; i < array_valores.length; i++) {
    array_val_desacumulados.push(desacumulador);
    desacumulador -= array_valores[i];
  }
  return array_val_desacumulados;
}

function dibujar_tabla(val_seleccionados, val_contados) {
  var $div_sec_sig = $("#tabla-frec"),
    $div_tabla = $div_sec_sig.find("#div-tabla"),
    nombre_variable = $("#nomb-var").val(),
    val_relativos = relativa(val_contados),
    val_acum_absolutos = acumulada(val_contados),
    val_acum_relativos = acumulada(val_relativos),
    total_absolutos = total(val_contados),
    total_relativos = total(val_relativos),
    val_desacum_absolutos = desacumulada(val_contados, total_absolutos),
    val_desacum_relativos = desacumulada(val_relativos, total_relativos);
  $div_tabla.empty();
  tabla =
    `<table class='table table-bordered table-striped table-responsive'>
            <thead>
              <tr>
                <th scope='col' rowspan='2'>` +
    nombre_variable +
    `</th>
                <th scope='col' colspan='3'>Frecuencias</th>
                <th scope='col' colspan='3'>Frecuencias acumuladas</th>
                <th scope='col' colspan='3'>Frecuencias desacumuladas</th>
              </tr>
              <tr>
                <th scope='col'>Absoluta <span>n</span></th>
                <th scope='col'>Relativa <span>h</span></th>
                <th scope='col'>Porcentual <span>p</span></th>
                <th scope='col'>Absoluta <span>N</span></th>
                <th scope='col'>Relativa <span>H</span></th>
                <th scope='col'>Porcentual <span>P</span></th>
                <th scope='col'>Absoluta <span>N*</span></th>
                <th scope='col'>Relativa <span>H*</span></th>
                <th scope='col'>Porcentual <span>P*</span></th>
              </tr>
            </thead>
            <tbody id='sortable'>`;
  var n = val_seleccionados.length,
    dig_frac_acumulada = 4,
    dig_frac_desacumulada = 2;
  for (let i = 0; i < n; i++) {
    if (i > 0) dig_frac_desacumulada = 4;
    if (i == n - 1) dig_frac_acumulada = 2;
    tabla +=
      `<tr>
                <td id='` +
      i +
      `' class='val_selecc_tabla'>` +
      val_seleccionados[i] +
      `</td>
                <td>` +
      val_contados[i] +
      `</td>
                <td>` +
      val_relativos[i].toFixed(4) +
      `</td>
                <td>` +
      (val_relativos[i] * 100).toFixed(2) +
      `</td>
                <td>` +
      val_acum_absolutos[i] +
      `</td>
                <td>` +
      val_acum_relativos[i].toFixed(dig_frac_acumulada) +
      `</td>
                <td>` +
      (val_acum_relativos[i] * 100).toFixed(2) +
      `</td>
                <td>` +
      val_desacum_absolutos[i] +
      `</td>
                <td>` +
      val_desacum_relativos[i].toFixed(dig_frac_desacumulada) +
      `</td>
                <td>` +
      (val_desacum_relativos[i] * 100).toFixed(2) +
      `</td>
              </tr>`;
  }
  tabla +=
    `<tr>
              <th scope='row'>Totales</th>
              <th>` +
    total_absolutos +
    `</th>
              <th>` +
    total_relativos.toFixed(2) +
    `</th>
              <th>` +
    (total_relativos * 100).toFixed(2) +
    `</th>
            </tr>
          </tbody>
        </table>`;
  $div_tabla.append(tabla);
  $("#sortable").sortable({
    axis: "y",
    revert: true,
    items: "> tr:not(:last-child)",
    beforeStop: function (event, ui) {
      array_datos = actualizar_arrays_datos_tabla(
        val_seleccionados,
        val_contados
      );
      val_seleccionados = array_datos[0];
      val_contados = array_datos[1];
      console.log(array_datos);
      setTimeout(function () {
        dibujar_tabla(val_seleccionados, val_contados);
      }, 50);
      var $div = $div_sec_sig.prev();
      $(window).scrollTop($div.get(0).offsetTop + 400);
    }
  });
}

function actualizar_arrays_datos_tabla(val_seleccionados, val_contados) {
  var $celda_val_selecc = $(".val_selecc_tabla"),
    indices = [],
    array_aux1 = [],
    array_aux2 = [];
  $celda_val_selecc.each(function (id, elem) {
    indices.push(parseInt(elem.id));
  });
  for (var i = 0; i < indices.length; i++) {
    array_aux1[i] = val_seleccionados[indices[i]];
    array_aux2[i] = val_contados[indices[i]];
  }
  return [array_aux1, array_aux2];
}

function colapsado(id_colapsado, id_btn_1, id_btn_2) {
  if ($("#" + id_colapsado).hasClass("show")) {
    $("#" + id_btn_1)
      .addClass("activo")
      .click();
    $("#" + id_btn_2).removeClass("activo");
  } else {
    $("#" + id_btn_2).addClass("activo");
    $("#" + id_btn_1).removeClass("activo");
  }
}

function objeto(array1, array2) {
  var cadena = "{",
    n = array2.length;
  for (let i = 0; i < n; i++) {
    cadena += '"' + array1[i] + '"' + ": " + array2[i];
    if (i < n - 1) cadena += ", ";
  }
  cadena += "}";
  return JSON.parse(cadena);
}

function crear_canvas(id_div_padre, id_canvas, w, h, num) {
  var $div_padre = $("#" + id_div_padre),
    canvas =
      `<div class='col-12 canvas'>
                  <canvas id='` +
      id_canvas +
      `' class='img-fluid' width='` +
      w +
      `px' height='` +
      h +
      `px'></canvas>
                  <div>
                    <input type='button' id='btn-guardar` +
      num +
      `' class='boton btn btn-outline-primary' value='Guardar'>
                  </div>
                </div>`;
  $div_padre.append(canvas);
}

function graficos(val_seleccionados, val_contados) {
  var $canvas1 = $("#canvas1"),
    $canvas2 = $("#canvas2"),
    canvas1 = $canvas1.get(0),
    canvas2 = $canvas2.get(0),
    nombre_variable = $("#nomb-var").val(),
    val_relativos = relativa(val_contados).map(function (val) {
      return val * 100;
    }),
    objeto1 = objeto(val_seleccionados, val_contados),
    objeto2 = objeto(val_seleccionados, val_relativos);
  (barras = new Barras(
    canvas1,
    mayuscula_primera_letra(nombre_variable),
    objeto1
  )),
    (anillo = new Anillo(
      canvas2,
      mayuscula_primera_letra(nombre_variable),
      objeto2
    ));
  barras.graficar();
  canvas1.addEventListener("mousemove", function () {
    barras.animacion(event);
  });
  $("#btn-guardar1").click(function () {
    barras.descargar();
  });
  anillo.graficar();
  canvas2.addEventListener("mousemove", function () {
    anillo.animacion(event);
  });
  $("#btn-guardar2").click(function () {
    anillo.descargar();
  });
}

function medidasTendenciaCentral(val_seleccionados, val_contados) {
  var $media = $("#media"),
    $mediana = $("#mediana"),
    $moda = $("#moda");
  console.log(val_seleccionados[0]);
  if (
    parseInt(val_seleccionados[0]) ||
    parseFloat(val_seleccionados[0]) ||
    parseInt(val_seleccionados[0]) == 0
  ) {
    $media.text(media(val_seleccionados, val_contados));
    $mediana.text(mediana(val_seleccionados, val_contados));
  } else {
    $media.text("No aplica");
    $mediana.text("No aplica");
  }
  $moda.text(moda(val_seleccionados, val_contados));
}

function media(val_seleccionados, val_contados) {
  var n = val_seleccionados.length,
    suma = 0,
    total = 0;
  for (let i = 0; i < n; i++) {
    suma += val_seleccionados[i] * val_contados[i];
    total += val_contados[i];
  }
  return suma / total;
}

function casosMediana(nMedios, val_seleccionados, frec_abs_acumulada) {
  var n = frec_abs_acumulada.length;
  for (let i = 0; i < n - 1; i++) {
    if (
      (i == 0 && frec_abs_acumulada[i] > nMedios) ||
      (frec_abs_acumulada[i - 1] < nMedios &&
        frec_abs_acumulada[i] > nMedios &&
        i > 0)
    ) {
      return parseFloat(val_seleccionados[i]);
    } else if (frec_abs_acumulada[i] == nMedios) {
      console.log(val_seleccionados[i + 1]);
      return (
        (parseFloat(val_seleccionados[i]) +
          parseFloat(val_seleccionados[i + 1])) /
        2
      );
    }
  }
}

function mediana(val_seleccionados, val_contados) {
  var n = val_seleccionados.length,
    frecuencia_absoluta_acumulada = acumulada(val_contados),
    total = 0;
  for (let i = 0; i < n; i++) {
    total += val_contados[i];
  }
  return casosMediana(
    total / 2,
    val_seleccionados,
    frecuencia_absoluta_acumulada
  );
}

function sonAdyacentes(arrayAux) {
  var n = arrayAux.length;
  console.log(arrayAux);
  for (let i = n - 1; i >= 1; i--) {
    if (arrayAux[i][1] - 1 == arrayAux[i - 1][1]) {
      return [
        true,
        (parseFloat(arrayAux[i][0]) + parseFloat(arrayAux[i - 1][0])) / 2
      ];
    }
  }
  return [false, undefined];
}

function casosModa(mayorFrec, val_seleccionados, val_contados) {
  var n = val_seleccionados.length,
    arrayAux = [];
  for (let i = 0; i < n; i++) {
    if (val_contados[i] == mayorFrec) {
      arrayAux.push([val_seleccionados[i], i]);
    }
  }
  if (arrayAux.length == 1) {
    return arrayAux[0][0];
  } else if (arrayAux.length >= 2) {
    if (n != arrayAux.length) {
      adyacente = sonAdyacentes(arrayAux);
      if (adyacente[0]) {
        console.log(adyacente[1]);
        if (adyacente[1]) return adyacente[1];
        else return "No aplica";
      } else {
        var moda = "Multimodal con: ";
        for (let i = 0; i < arrayAux.length; i++) {
          moda += arrayAux[i][0];
          if (i < arrayAux.length - 1) moda += ", ";
        }
        return moda;
      }
    } else {
      return "No tiene moda";
    }
  }
}

function moda(val_seleccionados, val_contados) {
  var n = val_seleccionados.length,
    mayorFrec = 0;
  for (let i = 0; i < n; i++) {
    if (val_contados[i] > mayorFrec) {
      mayorFrec = val_contados[i];
    }
  }
  return casosModa(mayorFrec, val_seleccionados, val_contados);
}

var array_datos = [undefined, undefined];
$(document).ready(function () {
  var cant_val_diferentes = 0,
    val_seleccionados = [],
    val_contados = [];
  $("#aceptar1").click(function () {
    aceptar1();
  });
  $("#cancelar1").click(function () {
    cancelar1();
  });
  $("#aceptar2").click(function () {
    cant_val_diferentes = aceptar2();
  });
  $("#cancelar2").click(function () {
    cancelar2();
  });
  $(".btn-colapsado").click(function () {
    destruir_popovers_val_dif_obs();
  });
  $("#aceptar3").click(function () {
    aceptar3(this, cant_val_diferentes);
  });
  $("#cancelar3").click(function () {
    cancelar3();
  });
  $(".btn-valor-num").click(function () {
    marcar_seleccionado(
      this,
      cant_val_diferentes,
      "valores-observados-numericos"
    );
  });
  $("#agregar-val-num").click(function () {
    agregar_val_num(cant_val_diferentes);
  });
  $(".btn-valor-lit").click(function () {
    marcar_seleccionado(
      this,
      cant_val_diferentes,
      "valores-observados-literales"
    );
  });
  $("#agregar-val-lit").click(function () {
    agregar_val_lit(cant_val_diferentes);
  });
  $("#aceptar4").click(function () {
    (val_seleccionados = array_val_seleccionados()),
      (val_contados = array_conteo_val_seleccionados()),
      aceptar4(val_seleccionados, val_contados);
  });
  $("#cancelar4").click(function () {
    cancelar4(this);
  });
  $("#aceptar5").click(function () {
    aceptar5(this);
    $("#sortable").sortable("disable");
    crear_canvas("div-grafico1", "canvas1", 700, 600, 1);
    crear_canvas("div-grafico2", "canvas2", 500, 600, 2);
    var val_seleccionados_, val_contados_;
    if (array_datos[0] && array_datos[1]) {
      val_seleccionados_ = array_datos[0];
      val_contados_ = array_datos[1];
    } else {
      val_seleccionados_ = array_val_seleccionados();
      val_contados_ = array_conteo_val_seleccionados();
    }
    console.log("-------------------------------------------------");
    console.log("array_datos");
    console.log(array_datos[0]);
    console.log(array_datos[1]);
    console.log("val_seleccionados y conteo_val_seleccionados");
    console.log(array_val_seleccionados());
    console.log(array_conteo_val_seleccionados());
    console.log("val_seleccionados_* y conteo_val_seleccionados_*");
    console.log(val_seleccionados_);
    console.log(val_contados_);
    graficos(val_seleccionados_, val_contados_);
    medidasTendenciaCentral(val_seleccionados_, val_contados_);
  });
  $("#cancelar5").click(function () {
    cancelar5(this);
    $("#sortable").sortable("enable");
  });
  $("#btn-colapsado-uno").click(function () {
    colapsado("colapsado-uno", "btn-colapsado-dos", "btn-colapsado-uno");
    $("#colapsado-dos").find(".seleccionado").removeClass("seleccionado");
    destruir_popover($("#aceptar3"));
  });
  $("#btn-colapsado-dos").click(function () {
    colapsado("colapsado-dos", "btn-colapsado-uno", "btn-colapsado-dos");
    $("#colapsado-uno").find(".seleccionado").removeClass("seleccionado");
    destruir_popover($("#aceptar3"));
  });
});
