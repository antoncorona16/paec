const juego = document.getElementById("juego");
const puntajeDisplay = document.getElementById("puntaje");
const tiempoDisplay = document.getElementById("tiempo");
const olla = document.getElementById("olla");
const sonidoExito = document.getElementById("sonidoExito");
const resultadoFinal = document.getElementById("resultadoFinal");
const reiniciarBtn = document.getElementById("reiniciarBtn");
const progreso = document.getElementById("progreso");

    let puntaje = 0;
    let tiempo = 60;
    let intervalo;
    const totalLatas = 10;

    for (let i = 0; i < totalLatas; i++) {
      const lata = document.createElement("div");
      lata.classList.add("lata");
      lata.draggable = true;
      lata.style.left = `${Math.random() * 660 + 40}px`;
      lata.style.top = `${Math.random() * 250 + 40}px`;
      lata.id = "lata" + i;

      lata.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", lata.id);
      });

      juego.appendChild(lata);
    }

    olla.addEventListener("dragover", e => e.preventDefault());

    olla.addEventListener("drop", e => {
      e.preventDefault();
      const lataId = e.dataTransfer.getData("text/plain");
      const lata = document.getElementById(lataId);

      if (!lata.classList.contains("contraida")) {
        lata.classList.add("contraida");
        puntaje++;
        puntajeDisplay.textContent = `Latas contraídas: ${puntaje}`;

        if (puntaje === totalLatas) {
          terminarJuego("🎉 ¡Perfecto! Contraíste todas las latas a tiempo.", true);
        }
      }
    });

    function iniciarTemporizador() {
      intervalo = setInterval(() => {
        tiempo--;
        tiempoDisplay.textContent = `Tiempo restante: ${tiempo}s`;
        progreso.style.width = `${(tiempo / 60) * 100}%`;

        if (tiempo <= 0) {
          clearInterval(intervalo);
          terminarJuego(`🎉 Juego terminado. Latas contraídas: ${puntaje}`, false);
        }
      }, 1000);
    }

    function terminarJuego(mensaje, exitoFinal) {
      clearInterval(intervalo);
      tiempoDisplay.textContent = "¡Juego finalizado!";
      resultadoFinal.textContent = mensaje;
      resultadoFinal.style.display = "block";
      reiniciarBtn.style.display = "inline-block";
      progreso.style.width = "0%";
      if (exitoFinal) sonidoExito.play();
    }

iniciarTemporizador();