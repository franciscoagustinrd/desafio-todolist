const formulario = document.querySelector('#formulario');
const inputTarea = document.querySelector('#tarea');
const listaTareas = document.querySelector('#lista-tareas');
const tareasTotales = document.querySelector('#tareas-totales');
const tareasRealizadas = document.querySelector('#tareas-realizadas');

let tareas = [
    { id: 1, texto: "Hacer mercado", completa: false },
    { id: 2, texto: "Estudiar para la prueba", completa: true },
    { id: 3, texto: "Sacar a pasear a Tobby", completa: false }
];

const renderTareas = () => {
    let html = "";
    let realizadas = 0;

    tareas.forEach((tarea, index) => {
        if (tarea.completa) {
            realizadas++;
        }

        html += `
            <tr data-id="${tarea.id}">
                <td class="id-numero">${index + 1}</td>
                <td class="texto-tarea">
                    <span class="${tarea.completa ? 'completa' : ''}">${tarea.texto}</span>
                </td>
                <td class="acciones">
                    <input type="checkbox" class="completar" ${tarea.completa ? 'checked' : ''}>
                    <i class="fa fa-times eliminar"></i>
                </td>
            </tr>
        `;
    });

    listaTareas.innerHTML = html;
    tareasTotales.textContent = tareas.length;
    tareasRealizadas.textContent = realizadas;

    completarTareas();
    eliminarTareas();
};

const completarTareas = () => {
    const checkboxes = document.querySelectorAll("#lista-tareas .completar");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener('change', () => {
            const idTarea = parseInt(checkbox.parentNode.parentNode.dataset.id);
            const index = tareas.findIndex((elemento) => elemento.id === idTarea);

            if (index !== -1) {
                tareas[index].completa = checkbox.checked;
                renderTareas();
            }
        });
    });
};

const eliminarTareas = () => {
    const botones = document.querySelectorAll("#lista-tareas .eliminar");

    botones.forEach((btn) => {
        btn.addEventListener("click", () => {
            const idTarea = parseInt(btn.parentNode.parentNode.dataset.id);

            tareas = tareas.filter((elemento) => elemento.id !== idTarea);
            renderTareas();
        });
    });
};

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevaTarea = {
        id: Date.now(),
        texto: inputTarea.value,
        completa: false
    };
    tareas.push(nuevaTarea);

    inputTarea.value = "";

    renderTareas();
});

renderTareas();
