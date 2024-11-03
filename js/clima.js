document.getElementById("Show").addEventListener("click", () => {
    const name = document.getElementById("name").value.trim().toLowerCase();
    let resultContainer = document.getElementById("result-container");

    fetch("./Json/data.json")
        .then((respuesta) => {
            if (!respuesta.ok) {
                throw new Error("La respuesta de la red no fue correcta");
            }
            return respuesta.json();
        })
        .then((data) => {
            const provincia = data.find(item => item.nombre_prov.toLowerCase() === name);

            resultContainer.innerHTML = "";

            if (provincia) {
                let clon = document.querySelector("template").content.cloneNode(true);
                clon.querySelector(".city-name").innerText = provincia.nombre_prov;
                clon.querySelector(".weather-type").innerText = provincia.clima;
                clon.querySelector(".temperature").innerText = `${provincia.temperatura}`;
                clon.querySelector(".weather-icon").src = provincia.img;

                resultContainer.appendChild(clon);
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "No tenemos esa informacion",
                });
            }
        })
        .catch((error) => console.error("Error al cargar los datos:", error));
});

