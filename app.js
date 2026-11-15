function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var r, e, o = "function" == typeof Symbol ? Symbol : {}, n = o.iterator || "@@iterator", a = o.toStringTag || "@@toStringTag"; function i(o, n, a, i) { var u = n && n.prototype instanceof Generator ? n : Generator, f = Object.create(u.prototype); return _regeneratorDefine2(f, "_invoke", function (t, o, n) { var a, i, u, f = 0, p = n || [], y = !1, G = { p: 0, n: 0, v: r, a: l, f: l.bind(r, 4), d: function d(t, e) { return a = t, i = 0, u = r, G.n = e, c; } }; function l(t, o) { for (i = t, u = o, e = 0; !y && f && !n && e < p.length; e++) { var n, a = p[e], l = G.p, F = a[2]; t > 3 ? (n = F === o) && (u = a[(i = a[4]) ? 5 : (i = 3, 3)], a[4] = a[5] = r) : a[0] <= l && ((n = t < 2 && l < a[1]) ? (i = 0, G.v = o, G.n = a[1]) : l < F && (n = t < 3 || a[0] > o || o > F) && (a[4] = t, a[5] = o, G.n = F, i = 0)); } if (n || t > 1) return c; throw y = !0, o; } return function (n, p, F) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && l(p, F), i = p, u = F; (e = i < 2 ? r : u) || !y;) { a || (i ? (i > 1 && (G.n = i < 3 ? -1 : u), l(i, u)) : G.v = u); try { if (f = 2, a) { if (i || (n = "next"), e = a[n]) { if (!(e = e.call(a, u))) throw TypeError("iterator result is not an object"); if (!e.done) return e; u = e.value, i < 2 && (i = 0); } else 1 === i && (e = a.return) && e.call(a), i < 2 && (u = TypeError("The iterator does not provide a '" + n + "' method"), i = 1); a = r; } else if ((e = (y = G.n < 0) ? u : t.call(o, G)) !== c) break; } catch (t) { a = r, i = 1, u = t; } finally { f = 1; } } return { value: e, done: y }; }; }(o, a, i), !0), f; } var c = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} e = Object.getPrototypeOf; var u = [][n] ? e(e([][n]())) : (_regeneratorDefine2(e = {}, n, function () { return this; }), e), f = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(u); function p(r) { return Object.setPrototypeOf ? Object.setPrototypeOf(r, GeneratorFunctionPrototype) : (r.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(r, a, "GeneratorFunction")), r.prototype = Object.create(f), r; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(f, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, a, "GeneratorFunction"), _regeneratorDefine2(f), _regeneratorDefine2(f, a, "Generator"), _regeneratorDefine2(f, n, function () { return this; }), _regeneratorDefine2(f, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: p }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
(function () {
  "use strict";

  var API_URL = "https://api.deepseek.com/chat/completions";
  var MAX_FILAS_IA = 500,
    LOTE_IA = 20;
  var SYSTEM = "Eres un asistente integrado en Microsoft Excel. Responde siempre en español, claro y breve.\n" + "Recibirás los datos de la hoja activa del usuario (completos si son pocos, o una muestra de las primeras filas) y a veces su selección.\n" + "- Si solo hace una pregunta o pide un análisis, responde con texto normal. Si te piden un cálculo sobre una muestra, sugiere la fórmula en texto.\n" + "- Si pide crear, agregar o calcular una columna, responde ÚNICAMENTE con líneas, una por cada columna nueva:\n" + "COLUMNA|Encabezado|Fórmula\n" + "La fórmula se escribe para la PRIMERA FILA DE DATOS indicada en el contexto, con referencias relativas, empieza con =, usa nombres de función en INGLÉS y comas como separador. Ejemplo: COLUMNA|Total|=B2*C2\n" + "- Si la columna requiere interpretar texto y no se puede con fórmulas (clasificar, resumir, traducir, sentimiento, extraer datos), usa:\n" + "COLUMNA_IA|Encabezado|Instrucción que se aplicará a cada fila\n" + "- Opcionalmente puedes poner antes una línea: TEXTO|explicación breve\n" + "No uses bloques de código ni markdown en las líneas de acción.";
  var $ = function $(id) {
    return document.getElementById(id);
  };
  var chat = $("chat"),
    input = $("q"),
    sendBtn = $("send");
  var history = [],
    busy = false,
    mem = {};

  // ---------- almacenamiento ----------
  var store = {
    get: function get(k) {
      try {
        return window.localStorage.getItem(k) || "";
      } catch (e) {
        return mem[k] || "";
      }
    },
    set: function set(k, v) {
      try {
        window.localStorage.setItem(k, v);
      } catch (e) {
        mem[k] = v;
      }
    }
  };

  // ---------- utilidades ----------
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;"
      }[c];
    });
  }
  function md(s) {
    var t = esc(s);
    t = t.replace(/```[a-z]*\n?([\s\S]*?)```/g, function (m, c) {
      return "<pre>" + c + "</pre>";
    });
    t = t.replace(/`([^`\n]+)`/g, "<code>$1</code>");
    t = t.replace(/\*\*([^*\n]+)\*\*/g, "<b>$1</b>");
    return t.replace(/\n/g, "<br>").replace(/<pre>([\s\S]*?)<\/pre>/g, function (m) {
      return m.replace(/<br>/g, "\n");
    });
  }
  function colLetter(i) {
    var s = "";
    i++;
    while (i > 0) {
      var m = (i - 1) % 26;
      s = String.fromCharCode(65 + m) + s;
      i = Math.floor((i - 1) / 26);
    }
    return s;
  }
  function needExcel() {
    if (typeof Excel === "undefined" || typeof Excel.run !== "function") throw new Error("Este panel debe abrirse dentro de Excel.");
  }
  function safeCell(v) {
    v = String(v == null ? "" : v).trim();
    return /^[=+\-@]/.test(v) ? "'" + v : v;
  }

  // ---------- interfaz ----------
  function scrollDown() {
    chat.scrollTop = chat.scrollHeight;
  }
  function addMsg(role, text, isErr) {
    var d = document.createElement("div");
    d.className = "msg " + role + (isErr ? " err" : "");
    var t = document.createElement("div");
    t.className = "txt";
    t.innerHTML = md(text);
    d.appendChild(t);
    chat.appendChild(d);
    scrollDown();
    return d;
  }
  function setBubble(d, text, isErr) {
    d.className = "msg bot" + (isErr ? " err" : "");
    d.querySelector(".txt").innerHTML = md(text);
    if (!isErr && text) {
      var tools = document.createElement("div");
      tools.className = "tools";
      var b = document.createElement("button");
      b.textContent = "Insertar en celda seleccionada";
      b.onclick = function () {
        insertarEnCelda(text, b);
      };
      tools.appendChild(b);
      d.appendChild(tools);
    }
    scrollDown();
  }
  function addAct(d, text) {
    var box = d.querySelector(".acts");
    if (!box) {
      box = document.createElement("div");
      box.className = "acts";
      d.appendChild(box);
    }
    var li = document.createElement("div");
    li.className = "run";
    li.textContent = "⏳ " + text;
    box.appendChild(li);
    scrollDown();
    return li;
  }
  function actState(li, cls, text) {
    li.className = cls;
    li.textContent = (cls === "ok" ? "✓ " : cls === "bad" ? "✗ " : "⏳ ") + text;
    scrollDown();
  }
  function insertarEnCelda(_x, _x2) {
    return _insertarEnCelda.apply(this, arguments);
  } // ---------- DeepSeek ----------
  function _insertarEnCelda() {
    _insertarEnCelda = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(text, btn) {
      var _t;
      return _regenerator().w(function (_context2) {
        while (1) switch (_context2.p = _context2.n) {
          case 0:
            _context2.p = 0;
            needExcel();
            _context2.n = 1;
            return Excel.run(/*#__PURE__*/function () {
              var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(ctx) {
                var r;
                return _regenerator().w(function (_context) {
                  while (1) switch (_context.n) {
                    case 0:
                      r = ctx.workbook.getSelectedRange();
                      r.getCell(0, 0).values = [[text.trim()]];
                      _context.n = 1;
                      return ctx.sync();
                    case 1:
                      return _context.a(2);
                  }
                }, _callee);
              }));
              return function (_x11) {
                return _ref.apply(this, arguments);
              };
            }());
          case 1:
            btn.textContent = "Insertado ✓";
            _context2.n = 3;
            break;
          case 2:
            _context2.p = 2;
            _t = _context2.v;
            btn.textContent = "Error: " + _t.message;
          case 3:
            return _context2.a(2);
        }
      }, _callee2, null, [[0, 2]]);
    }));
    return _insertarEnCelda.apply(this, arguments);
  }
  function callDeepSeek(_x3, _x4) {
    return _callDeepSeek.apply(this, arguments);
  } // ---------- contexto de la hoja ----------
  function _callDeepSeek() {
    _callDeepSeek = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee3(messages, modelOverride) {
      var key, model, res, detalle, data, c, _t2, _t3;
      return _regenerator().w(function (_context3) {
        while (1) switch (_context3.p = _context3.n) {
          case 0:
            key = store.get("ds_key");
            if (key) {
              _context3.n = 1;
              break;
            }
            $("settings").classList.add("open");
            throw new Error("Falta la API Key. Pégala en Ajustes y pulsa Guardar.");
          case 1:
            model = modelOverride || store.get("ds_model") || "deepseek-chat";
            _context3.p = 2;
            _context3.n = 3;
            return fetch(API_URL, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + key
              },
              body: JSON.stringify({
                model: model,
                messages: messages,
                temperature: 0.2,
                stream: false
              })
            });
          case 3:
            res = _context3.v;
            _context3.n = 5;
            break;
          case 4:
            _context3.p = 4;
            _t2 = _context3.v;
            throw new Error("No se pudo conectar con DeepSeek (" + _t2.message + "). Revisa tu internet; si persiste puede ser un bloqueo CORS.");
          case 5:
            if (res.ok) {
              _context3.n = 13;
              break;
            }
            detalle = "";
            _context3.p = 6;
            _context3.n = 7;
            return res.text();
          case 7:
            detalle = _context3.v.slice(0, 250);
            _context3.n = 9;
            break;
          case 8:
            _context3.p = 8;
            _t3 = _context3.v;
          case 9:
            if (!(res.status === 401)) {
              _context3.n = 10;
              break;
            }
            throw new Error("API Key inválida (401). Revísala en Ajustes.");
          case 10:
            if (!(res.status === 402)) {
              _context3.n = 11;
              break;
            }
            throw new Error("Saldo insuficiente en tu cuenta de DeepSeek (402).");
          case 11:
            if (!(res.status === 429)) {
              _context3.n = 12;
              break;
            }
            throw new Error("Demasiadas solicitudes (429). Espera un momento.");
          case 12:
            throw new Error("Error HTTP " + res.status + ": " + detalle);
          case 13:
            _context3.n = 14;
            return res.json();
          case 14:
            data = _context3.v;
            c = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content;
            if (c) {
              _context3.n = 15;
              break;
            }
            throw new Error("DeepSeek devolvió una respuesta vacía.");
          case 15:
            return _context3.a(2, c);
        }
      }, _callee3, null, [[6, 8], [2, 4]]);
    }));
    return _callDeepSeek.apply(this, arguments);
  }
  function getContext() {
    return _getContext.apply(this, arguments);
  } // ---------- interpretar respuesta ----------
  function _getContext() {
    _getContext = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee5() {
      return _regenerator().w(function (_context5) {
        while (1) switch (_context5.n) {
          case 0:
            needExcel();
            return _context5.a(2, Excel.run(/*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee4(ctx) {
                var ws, ur, sel, cols, completo, filas, part, selVals, hdr, t, r, s;
                return _regenerator().w(function (_context4) {
                  while (1) switch (_context4.n) {
                    case 0:
                      ws = ctx.workbook.worksheets.getActiveWorksheet();
                      ws.load("name");
                      ur = ws.getUsedRangeOrNullObject(true);
                      ur.load(["rowIndex", "columnIndex", "rowCount", "columnCount", "address"]);
                      sel = ctx.workbook.getSelectedRange();
                      sel.load(["address", "rowCount", "columnCount"]);
                      _context4.n = 1;
                      return ctx.sync();
                    case 1:
                      if (!ur.isNullObject) {
                        _context4.n = 2;
                        break;
                      }
                      return _context4.a(2, "\n\n[HOJA ACTIVA: " + ws.name + "] La hoja está vacía.");
                    case 2:
                      cols = Math.min(ur.columnCount, 40);
                      completo = ur.rowCount <= 200 && ur.rowCount * cols <= 4000;
                      filas = completo ? ur.rowCount : Math.min(6, ur.rowCount);
                      part = ur.getResizedRange(filas - ur.rowCount, cols - ur.columnCount);
                      part.load("values");
                      selVals = null;
                      if (sel.rowCount * sel.columnCount <= 600 && sel.rowCount * sel.columnCount > 1) {
                        sel.load("values");
                        selVals = sel;
                      }
                      _context4.n = 3;
                      return ctx.sync();
                    case 3:
                      hdr = part.values[0].map(function (h, i) {
                        return colLetter(ur.columnIndex + i) + "=" + h;
                      }).join("; ");
                      t = "\n\n[HOJA ACTIVA: " + ws.name + "] Rango de datos: " + ur.address + " (" + ur.rowCount + " filas x " + ur.columnCount + " columnas).\n" + "Fila de encabezados: " + (ur.rowIndex + 1) + ". PRIMERA FILA DE DATOS: " + (ur.rowIndex + 2) + ".\n" + "Columnas: " + hdr + "\n" + (completo ? "Datos completos:" : "Solo una muestra (hay más filas):") + "\n";
                      for (r = 0; r < part.values.length; r++) {
                        t += "Fila " + (ur.rowIndex + 1 + r) + ": " + part.values[r].join(" | ") + "\n";
                      }
                      if (selVals) {
                        t += "\n[SELECCIÓN DEL USUARIO] " + sel.address + ":\n";
                        for (s = 0; s < sel.values.length; s++) t += sel.values[s].join(" | ") + "\n";
                      } else if (sel.rowCount * sel.columnCount === 1) {
                        t += "\n[SELECCIÓN DEL USUARIO] celda " + sel.address + "\n";
                      }
                      return _context4.a(2, t.length > 40000 ? t.slice(0, 40000) : t);
                  }
                }, _callee4);
              }));
              return function (_x12) {
                return _ref2.apply(this, arguments);
              };
            }()));
        }
      }, _callee5);
    }));
    return _getContext.apply(this, arguments);
  }
  function parseResponse(raw) {
    var lines = raw.replace(/\r/g, "").split("\n"),
      text = [],
      actions = [];
    lines.forEach(function (l) {
      var ln = l.trim();
      if (!ln || ln.indexOf("```") === 0) return;
      var up = ln.toUpperCase();
      if (up.indexOf("COLUMNA_IA|") === 0 || up.indexOf("COLUMNA|") === 0) {
        var p = ln.split("|");
        if (p.length >= 3) {
          actions.push({
            type: up.indexOf("COLUMNA_IA|") === 0 ? "ia" : "formula",
            header: p[1].trim(),
            arg: p.slice(2).join("|").trim()
          });
          return;
        }
      }
      if (up.indexOf("TEXTO|") === 0) {
        text.push(ln.slice(6));
        return;
      }
      text.push(l);
    });
    var t = text.join("\n").trim();
    if (!actions.length) t = raw.trim();
    return {
      text: t,
      actions: actions
    };
  }

  // ---------- acciones en Excel ----------
  function estiloEncabezado(_x5, _x6, _x7, _x8, _x9) {
    return _estiloEncabezado.apply(this, arguments);
  }
  function _estiloEncabezado() {
    _estiloEncabezado = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee6(ctx, ws, ur, col, texto) {
      var prev, h, f;
      return _regenerator().w(function (_context6) {
        while (1) switch (_context6.n) {
          case 0:
            prev = ws.getRangeByIndexes(ur.rowIndex, col - 1, 1, 1);
            prev.format.font.load("bold,color");
            prev.format.fill.load("color");
            _context6.n = 1;
            return ctx.sync();
          case 1:
            h = ws.getRangeByIndexes(ur.rowIndex, col, 1, 1);
            h.values = [[texto]];
            h.format.font.bold = prev.format.font.bold === true;
            if (prev.format.font.color) h.format.font.color = prev.format.font.color;
            f = prev.format.fill.color;
            if (f && f.toUpperCase() !== "#FFFFFF") h.format.fill.color = f;
          case 2:
            return _context6.a(2);
        }
      }, _callee6);
    }));
    return _estiloEncabezado.apply(this, arguments);
  }
  function columnaFormula(_x0) {
    return _columnaFormula.apply(this, arguments);
  }
  function _columnaFormula() {
    _columnaFormula = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee8(a) {
      var formula;
      return _regenerator().w(function (_context8) {
        while (1) switch (_context8.n) {
          case 0:
            needExcel();
            formula = a.arg.charAt(0) === "=" ? a.arg : "=" + a.arg;
            return _context8.a(2, Excel.run(/*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee7(ctx) {
                var ws, ur, col, first, r1, arr, i;
                return _regenerator().w(function (_context7) {
                  while (1) switch (_context7.n) {
                    case 0:
                      ws = ctx.workbook.worksheets.getActiveWorksheet();
                      ur = ws.getUsedRange(true);
                      ur.load(["rowIndex", "columnIndex", "rowCount", "columnCount"]);
                      _context7.n = 1;
                      return ctx.sync();
                    case 1:
                      if (!(ur.rowCount < 2)) {
                        _context7.n = 2;
                        break;
                      }
                      throw new Error("No hay filas de datos.");
                    case 2:
                      col = ur.columnIndex + ur.columnCount;
                      first = ws.getRangeByIndexes(ur.rowIndex + 1, col, 1, 1);
                      first.formulas = [[formula]];
                      _context7.n = 3;
                      return ctx.sync();
                    case 3:
                      // si la fórmula es inválida falla aquí sin dejar nada escrito

                      first.load("formulasR1C1");
                      _context7.n = 4;
                      return ctx.sync();
                    case 4:
                      r1 = first.formulasR1C1[0][0];
                      _context7.n = 5;
                      return estiloEncabezado(ctx, ws, ur, col, a.header);
                    case 5:
                      if (ur.rowCount > 2) {
                        arr = [];
                        for (i = 0; i < ur.rowCount - 2; i++) arr.push([r1]);
                        ws.getRangeByIndexes(ur.rowIndex + 2, col, ur.rowCount - 2, 1).formulasR1C1 = arr;
                      }
                      ws.getRangeByIndexes(ur.rowIndex, col, ur.rowCount, 1).format.autofitColumns();
                      _context7.n = 6;
                      return ctx.sync();
                    case 6:
                      return _context7.a(2, "Columna «" + a.header + "» creada en " + colLetter(col) + " (" + formula + ")");
                  }
                }, _callee7);
              }));
              return function (_x13) {
                return _ref3.apply(this, arguments);
              };
            }()));
        }
      }, _callee8);
    }));
    return _columnaFormula.apply(this, arguments);
  }
  function parseJsonArray(raw, n) {
    var s = raw.replace(/```json|```/g, "").trim();
    var i = s.indexOf("["),
      j = s.lastIndexOf("]");
    if (i < 0 || j < 0) throw new Error("DeepSeek no devolvió un arreglo JSON válido.");
    var arr = JSON.parse(s.slice(i, j + 1));
    if (!Array.isArray(arr)) throw new Error("Formato inesperado de DeepSeek.");
    arr = arr.map(function (v) {
      return safeCell(_typeof(v) === "object" ? JSON.stringify(v) : v);
    });
    while (arr.length < n) arr.push("");
    return arr.slice(0, n);
  }
  function columnaIA(_x1, _x10) {
    return _columnaIA.apply(this, arguments);
  } // ---------- flujo principal ----------
  function _columnaIA() {
    _columnaIA = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee0(a, onProgress) {
      return _regenerator().w(function (_context0) {
        while (1) switch (_context0.n) {
          case 0:
            needExcel();
            return _context0.a(2, Excel.run(/*#__PURE__*/function () {
              var _ref4 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee9(ctx) {
                var ws, ur, rows, n, col, headers, s, chunk, payload, content, raw, arr;
                return _regenerator().w(function (_context9) {
                  while (1) switch (_context9.n) {
                    case 0:
                      ws = ctx.workbook.worksheets.getActiveWorksheet();
                      ur = ws.getUsedRange(true);
                      ur.load(["rowIndex", "columnIndex", "rowCount", "columnCount", "values"]);
                      _context9.n = 1;
                      return ctx.sync();
                    case 1:
                      rows = ur.values;
                      n = Math.min(rows.length - 1, MAX_FILAS_IA);
                      if (!(n < 1)) {
                        _context9.n = 2;
                        break;
                      }
                      throw new Error("No hay filas de datos.");
                    case 2:
                      col = ur.columnIndex + ur.columnCount;
                      headers = rows[0].map(function (h, i) {
                        return String(h) || colLetter(ur.columnIndex + i);
                      });
                      _context9.n = 3;
                      return estiloEncabezado(ctx, ws, ur, col, a.header);
                    case 3:
                      _context9.n = 4;
                      return ctx.sync();
                    case 4:
                      s = 0;
                    case 5:
                      if (!(s < n)) {
                        _context9.n = 8;
                        break;
                      }
                      onProgress(s + " de " + n + " filas");
                      chunk = rows.slice(1 + s, 1 + Math.min(s + LOTE_IA, n));
                      payload = chunk.map(function (r) {
                        var o = {};
                        headers.forEach(function (h, i) {
                          o[h] = r[i];
                        });
                        return o;
                      });
                      content = "Instrucción: " + a.arg + "\n\nFilas (JSON):\n" + JSON.stringify(payload) + "\n\nDevuelve SOLO un arreglo JSON con exactamente " + chunk.length + " strings cortos, uno por fila y en el mismo orden. Sin explicaciones ni markdown.";
                      _context9.n = 6;
                      return callDeepSeek([{
                        role: "system",
                        content: "Eres un asistente de procesamiento de datos. Respondes únicamente con JSON válido."
                      }, {
                        role: "user",
                        content: content
                      }], "deepseek-chat");
                    case 6:
                      raw = _context9.v;
                      arr = parseJsonArray(raw, chunk.length);
                      ws.getRangeByIndexes(ur.rowIndex + 1 + s, col, chunk.length, 1).values = arr.map(function (v) {
                        return [v];
                      });
                      _context9.n = 7;
                      return ctx.sync();
                    case 7:
                      s += LOTE_IA;
                      _context9.n = 5;
                      break;
                    case 8:
                      ws.getRangeByIndexes(ur.rowIndex, col, n + 1, 1).format.autofitColumns();
                      _context9.n = 9;
                      return ctx.sync();
                    case 9:
                      return _context9.a(2, "Columna IA «" + a.header + "» creada en " + colLetter(col) + " (" + n + " filas)" + (rows.length - 1 > n ? ". Se procesaron solo las primeras " + MAX_FILAS_IA + "." : ""));
                  }
                }, _callee9);
              }));
              return function (_x14) {
                return _ref4.apply(this, arguments);
              };
            }()));
        }
      }, _callee0);
    }));
    return _columnaIA.apply(this, arguments);
  }
  function enviar() {
    return _enviar.apply(this, arguments);
  } // ---------- eventos ----------
  function _enviar() {
    _enviar = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee1() {
      var q, bub, ctxText, msgs, raw, parsed, i, a, li, msg, _t4, _t5, _t6, _t7;
      return _regenerator().w(function (_context1) {
        while (1) switch (_context1.p = _context1.n) {
          case 0:
            q = input.value.trim();
            if (!(!q || busy)) {
              _context1.n = 1;
              break;
            }
            return _context1.a(2);
          case 1:
            busy = true;
            sendBtn.disabled = true;
            input.value = "";
            addMsg("user", q);
            bub = addMsg("bot", "Pensando…");
            _context1.p = 2;
            ctxText = "";
            if (!$("useData").checked) {
              _context1.n = 6;
              break;
            }
            _context1.p = 3;
            _context1.n = 4;
            return getContext();
          case 4:
            ctxText = _context1.v;
            _context1.n = 6;
            break;
          case 5:
            _context1.p = 5;
            _t4 = _context1.v;
            ctxText = "\n\n[No pude leer la hoja: " + _t4.message + "]";
          case 6:
            msgs = [{
              role: "system",
              content: SYSTEM
            }].concat(history.slice(-8), [{
              role: "user",
              content: q + ctxText
            }]);
            _context1.n = 7;
            return callDeepSeek(msgs);
          case 7:
            raw = _context1.v;
            history.push({
              role: "user",
              content: q
            }, {
              role: "assistant",
              content: raw
            });
            parsed = parseResponse(raw);
            if (parsed.text) setBubble(bub, parsed.text);else bub.querySelector(".txt").textContent = "Listo, voy a aplicar los cambios:";
            i = 0;
          case 8:
            if (!(i < parsed.actions.length)) {
              _context1.n = 16;
              break;
            }
            a = parsed.actions[i];
            li = addAct(bub, "Creando «" + a.header + "»…");
            _context1.p = 9;
            if (!(a.type === "ia")) {
              _context1.n = 11;
              break;
            }
            _context1.n = 10;
            return columnaIA(a, function (p) {
              actState(li, "run", "«" + a.header + "»: " + p);
            });
          case 10:
            _t5 = _context1.v;
            _context1.n = 13;
            break;
          case 11:
            _context1.n = 12;
            return columnaFormula(a);
          case 12:
            _t5 = _context1.v;
          case 13:
            msg = _t5;
            actState(li, "ok", msg);
            _context1.n = 15;
            break;
          case 14:
            _context1.p = 14;
            _t6 = _context1.v;
            actState(li, "bad", "«" + a.header + "»: " + _t6.message);
          case 15:
            i++;
            _context1.n = 8;
            break;
          case 16:
            _context1.n = 18;
            break;
          case 17:
            _context1.p = 17;
            _t7 = _context1.v;
            setBubble(bub, _t7.message, true);
          case 18:
            _context1.p = 18;
            busy = false;
            sendBtn.disabled = false;
            input.focus();
            return _context1.f(18);
          case 19:
            return _context1.a(2);
        }
      }, _callee1, null, [[9, 14], [3, 5], [2, 17, 18, 19]]);
    }));
    return _enviar.apply(this, arguments);
  }
  function init() {
    $("key").value = store.get("ds_key");
    $("model").value = store.get("ds_model") || "deepseek-chat";
    $("useData").checked = store.get("ds_usedata") !== "0";
    if (!store.get("ds_key")) $("settings").classList.add("open");
    $("gear").onclick = function () {
      $("settings").classList.toggle("open");
    };
    $("save").onclick = function () {
      store.set("ds_key", $("key").value.trim());
      store.set("ds_model", $("model").value);
      store.set("ds_usedata", $("useData").checked ? "1" : "0");
      $("settings").classList.remove("open");
      addMsg("bot", "Ajustes guardados. ¡Ya puedes preguntarme!");
    };
    $("clear").onclick = function () {
      chat.innerHTML = "";
      history = [];
      greet();
    };
    sendBtn.onclick = enviar;
    input.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        enviar();
      }
    });
    Array.prototype.forEach.call(document.querySelectorAll(".chip"), function (c) {
      c.onclick = function () {
        input.value = c.getAttribute("data-q");
        input.focus();
      };
    });
    try {
      if (window.Office && Office.context && Office.context.requirements && !Office.context.requirements.isSetSupported("ExcelApi", "1.7")) {
        addMsg("bot", "Aviso: esta versión de Excel es antigua y podría no soportar todas las funciones.", true);
      }
    } catch (e) {}
    greet();
  }
  function greet() {
    addMsg("bot", "Hola 👋 Soy DeepSeek dentro de Excel. Pregúntame sobre tus datos o pídeme, por ejemplo, **«crea una columna con el total»**: la agrego directamente a tu hoja.");
  }
  if (window.Office && Office.onReady) {
    Office.onReady(function () {
      init();
    });
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
